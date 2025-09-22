from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime
import random
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MultiLabelBinarizer

class InternshipRecommendationSystem:
    def __init__(self):
        self.internships_data = [
            {
                "id": 1,
                "company": "TechCorp Solutions",
                "role": "Machine Learning Intern",
                "location": "Bangalore",
                "stipend": "₹25,000/month",
                "duration": "3 months",
                "skills": ["Python", "Machine Learning", "TensorFlow", "Deep Learning"],
                "sector": "Technology",
                "description": "Work on AI models for recommendation systems and contribute to cutting-edge machine learning projects.",
                "requirements": "B.Tech/M.Tech in CS/IT, Knowledge of Python and ML algorithms",
                "logo": "https://via.placeholder.com/100x100/007bff/ffffff?text=TC"
            },
            {
                "id": 2,
                "company": "WebDev Studios",
                "role": "Frontend Developer Intern", 
                "location": "Mumbai",
                "stipend": "₹20,000/month",
                "duration": "4 months",
                "skills": ["React.js", "JavaScript", "HTML", "CSS", "Node.js"],
                "sector": "Technology",
                "description": "Build responsive web applications using modern technologies and collaborate with design teams.",
                "requirements": "Knowledge of React.js, JavaScript, and web development fundamentals",
                "logo": "https://via.placeholder.com/100x100/28a745/ffffff?text=WD"
            },
            {
                "id": 3,
                "company": "DataFlow Analytics",
                "role": "Data Science Intern",
                "location": "Hyderabad", 
                "stipend": "₹22,000/month",
                "duration": "6 months",
                "skills": ["Python", "Data Analysis", "SQL", "Pandas", "Numpy"],
                "sector": "Analytics",
                "description": "Analyze large datasets and create predictive models for business intelligence solutions.",
                "requirements": "Statistics background, Python programming, SQL knowledge",
                "logo": "https://via.placeholder.com/100x100/17a2b8/ffffff?text=DF"
            },
            {
                "id": 4,
                "company": "CloudTech Innovations",
                "role": "DevOps Intern",
                "location": "Pune",
                "stipend": "₹18,000/month",
                "duration": "3 months",
                "skills": ["AWS", "Docker", "Linux", "CI/CD", "Kubernetes"],
                "sector": "Cloud Computing",
                "description": "Learn cloud infrastructure and deployment automation with industry-standard tools.",
                "requirements": "Basic Linux knowledge, Interest in cloud technologies",
                "logo": "https://via.placeholder.com/100x100/6c757d/ffffff?text=CT"
            },
            {
                "id": 5,
                "company": "FinTech Solutions", 
                "role": "Backend Developer Intern",
                "location": "Chennai",
                "stipend": "₹24,000/month",
                "duration": "4 months",
                "skills": ["Node.js", "MongoDB", "API Development", "Express.js"],
                "sector": "Finance",
                "description": "Develop secure APIs for financial applications and payment processing systems.",
                "requirements": "Backend development experience, Database knowledge",
                "logo": "https://via.placeholder.com/100x100/dc3545/ffffff?text=FS"
            }
        ]

        self.applications = []
        self.user_profile = {
            "name": "Priya Sharma",
            "education": "B.Tech Computer Science (3rd Year)", 
            "skills": ["Python", "React.js", "Machine Learning", "JavaScript", "HTML/CSS"],
            "interests": ["Artificial Intelligence", "Web Development", "Data Science"],
            "location": "Delhi"
        }

        # Initialize ML components
        self.setup_recommendation_engine()

    def setup_recommendation_engine(self):
        """Setup the AI recommendation engine"""
        try:
            self.vectorizer = TfidfVectorizer(stop_words='english', max_features=1000)
            texts = []
            for internship in self.internships_data:
                text = f"{internship['role']} {internship['description']} {internship['requirements']}"
                texts.append(text)

            self.tfidf_matrix = self.vectorizer.fit_transform(texts)

            # Setup skills encoder
            skills_list = [internship['skills'] for internship in self.internships_data]
            self.mlb_skills = MultiLabelBinarizer()
            self.skills_matrix = self.mlb_skills.fit_transform(skills_list)

        except Exception as e:
            print(f"Warning: ML components not available: {e}")
            self.vectorizer = None

    def calculate_match_score(self, student_profile, internship):
        """Calculate AI-based match percentage"""
        score = 0.0

        # Skills matching (50% weightage)
        student_skills = set([skill.lower() for skill in student_profile.get('skills', [])])
        internship_skills = set([skill.lower() for skill in internship['skills']])

        if len(internship_skills) > 0:
            skills_overlap = len(student_skills.intersection(internship_skills))
            skills_score = (skills_overlap / len(internship_skills)) * 50
            score += skills_score

        # Location preference (15% weightage)
        if student_profile.get('location', '').lower() == internship['location'].lower():
            score += 15
        elif student_profile.get('location', '').lower() in ['any', 'remote', '']:
            score += 10

        # Sector interest matching (25% weightage)  
        student_interests = [interest.lower() for interest in student_profile.get('interests', [])]
        if any(interest in internship['sector'].lower() or 
               internship['sector'].lower() in interest for interest in student_interests):
            score += 25

        # Education level compatibility (10% weightage)
        education = student_profile.get('education', '').lower()
        if 'b.tech' in education or 'engineering' in education:
            score += 10
        elif 'master' in education or 'm.tech' in education:
            score += 8
        else:
            score += 5

        return min(score, 100)  # Cap at 100%

    def get_recommendations(self, student_profile=None, num_recommendations=5):
        """Get personalized internship recommendations"""
        if not student_profile:
            student_profile = self.user_profile

        recommendations = []

        for internship in self.internships_data:
            match_score = self.calculate_match_score(student_profile, internship)

            recommendation = {
                **internship,
                "matchPercentage": round(match_score, 1),
                "match_reasons": self.get_match_reasons(student_profile, internship)
            }
            recommendations.append(recommendation)

        # Sort by match percentage and return top recommendations
        recommendations.sort(key=lambda x: x['matchPercentage'], reverse=True)
        return recommendations[:num_recommendations]

    def get_match_reasons(self, student_profile, internship):
        """Generate reasons for the match"""
        reasons = []

        student_skills = set([skill.lower() for skill in student_profile.get('skills', [])])
        internship_skills = set([skill.lower() for skill in internship['skills']])
        matching_skills = student_skills.intersection(internship_skills)

        if matching_skills:
            reasons.append(f"Skills match: {', '.join(list(matching_skills)[:3])}")

        student_interests = [interest.lower() for interest in student_profile.get('interests', [])]
        if any(interest in internship['sector'].lower() for interest in student_interests):
            reasons.append(f"Aligns with {internship['sector']} interest")

        if student_profile.get('location', '').lower() == internship['location'].lower():
            reasons.append(f"Located in {internship['location']}")

        return reasons

# Initialize Flask app and recommendation system
app = Flask(__name__)
CORS(app)
rec_system = InternshipRecommendationSystem()

@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    """Get personalized internship recommendations"""
    try:
        recommendations = rec_system.get_recommendations()

        # Add some randomization for demo purposes
        for rec in recommendations:
            rec['matchPercentage'] = max(60, rec['matchPercentage'] + random.randint(-5, 5))

        return jsonify({
            'success': True,
            'recommendations': recommendations,
            'total': len(recommendations)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/profile', methods=['GET'])
def get_profile():
    """Get student profile"""
    return jsonify({
        'success': True,
        'profile': rec_system.user_profile
    })

@app.route('/api/profile', methods=['PUT'])
def update_profile():
    """Update student profile"""
    try:
        data = request.get_json()
        rec_system.user_profile.update(data)
        return jsonify({
            'success': True,
            'profile': rec_system.user_profile
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/apply', methods=['POST'])
def apply_internship():
    """Apply for an internship"""
    try:
        data = request.get_json()
        internship_id = data.get('internship_id')
        action = data.get('action')

        if action == 'like':
            application = {
                'id': len(rec_system.applications) + 1,
                'internship_id': internship_id,
                'status': 'Applied',
                'applied_date': datetime.now().isoformat(),
                'timestamp': datetime.now().isoformat()
            }
            rec_system.applications.append(application)

            return jsonify({
                'success': True,
                'message': 'Application submitted successfully!',
                'application_id': application['id']
            })
        else:
            return jsonify({
                'success': True,
                'message': 'Internship passed'
            })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/applications', methods=['GET'])
def get_applications():
    """Get user applications"""
    return jsonify({
        'success': True,
        'applications': rec_system.applications
    })

@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    """Get dashboard statistics"""
    stats = {
        'totalCompanies': 156,
        'appliedInternships': len(rec_system.applications),
        'selectedInternships': len([app for app in rec_system.applications if app['status'] == 'Selected']),
        'pendingEvaluations': len([app for app in rec_system.applications if app['status'] == 'Under Review']),
        'profileViews': random.randint(20, 50),
        'recommendationsToday': random.randint(10, 20)
    }

    return jsonify({
        'success': True,
        'statistics': stats
    })

@app.route('/api/internship/<int:internship_id>', methods=['GET'])
def get_internship_details(internship_id):
    """Get detailed internship information"""
    internship = next((i for i in rec_system.internships_data if i['id'] == internship_id), None)

    if internship:
        return jsonify({
            'success': True,
            'internship': internship
        })
    else:
        return jsonify({
            'success': False,
            'error': 'Internship not found'
        }), 404

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

if __name__ == '__main__':
    print("🚀 Starting AI-Powered Internship Recommendation API...")
    print("📊 Dashboard: http://localhost:5000")
    print("🔍 API Endpoints:")
    print("   GET /api/recommendations - Get personalized recommendations")
    print("   GET /api/profile - Get student profile")
    print("   PUT /api/profile - Update student profile")
    print("   POST /api/apply - Apply for internship")
    print("   GET /api/applications - Get user applications")
    print("   GET /api/statistics - Get dashboard statistics")
    print("   GET /health - Health check")
    print("\n✨ Features:")
    print("   • AI-powered recommendation matching")
    print("   • Real-time application tracking")
    print("   • Profile-based personalization")
    print("   • RESTful API design")

    app.run(debug=True, host='0.0.0.0', port=5000)
