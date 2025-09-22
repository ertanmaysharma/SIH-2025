# 🚀 AI-Powered Internship Recommendation System

## 📋 Overview

This is a comprehensive internship recommendation system built for the **Smart India Hackathon 2025** (Problem Statement: AI-Based Internship Recommendation Engine for PM Internship Scheme). 

The system provides students with personalized internship matches using AI-powered algorithms and features a **Tinder-style swipe interface** for discovering internships and a comprehensive dashboard for tracking applications.

## ✨ Key Features

- 🔍 **AI-Powered Recommendations**: Machine learning algorithms match students with relevant internships
- 📱 **Tinder-Style Swipe Interface**: Intuitive swipe right to apply, swipe left to pass
- 📊 **Comprehensive Dashboard**: Track applications, selections, and pending evaluations
- 🎨 **Clean Mobile-First UI**: Optimized for users with limited digital literacy
- ⚡ **Lightweight & Fast**: Works well on low bandwidth connections
- 🌍 **Multi-language Ready**: Designed for diverse Indian user base

## 🏗️ Project Structure

```
AI-Internship-Recommendation-System/
├── frontend/                 # Web Application (React-style vanilla JS)
│   ├── index.html           # Main HTML file
│   ├── style.css            # Responsive styling
│   └── app.js               # Frontend JavaScript logic
├── backend/                 # Python Flask API
│   ├── flask_api.py         # REST API server
│   └── requirements.txt     # Python dependencies
├── mobile/                  # React Native Component
│   ├── InternshipSwiper.js  # Mobile swipe component
│   └── package.json         # Mobile dependencies
├── docs/                    # Documentation
│   └── API_DOCUMENTATION.md # API docs
├── setup.sh                 # Quick setup script
└── .gitignore              # Git ignore file
```

## 🛠️ Installation & Setup

### Prerequisites

Make sure you have the following installed:
- **Python 3.8+** (for backend API)
- **Node.js 16+** (for mobile development - optional)
- **Git** (for version control)

### Quick Start

**Option 1: Using setup script (Linux/macOS)**
```bash
chmod +x setup.sh
./setup.sh
```

**Option 2: Manual setup (All platforms)**

### 1. Frontend (Web Application)

The web application uses vanilla HTML/CSS/JavaScript and doesn't require any build process.

```bash
# Navigate to frontend directory
cd frontend/

# Option A: Open directly in browser
open index.html

# Option B: Use a simple HTTP server
python -m http.server 8000
# Then visit: http://localhost:8000
```

**No installation required for frontend!** ✅

### 2. Backend (Flask API)

```bash
# Navigate to backend directory
cd backend/

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Run the Flask API server
python flask_api.py
```

The API will be available at: `http://localhost:5000`

### 3. Mobile App (React Native) - Optional

```bash
# Navigate to mobile directory
cd mobile/

# Install Node.js dependencies
npm install

# For React Native development, also install:
npm install -g @react-native-community/cli
# Copy InternshipSwiper.js to your React Native project
```

## 📦 Dependencies

### Backend Dependencies (requirements.txt)
- Flask==2.3.2
- Flask-CORS==4.0.0
- scikit-learn==1.3.0
- pandas==2.0.3
- numpy==1.24.3
- python-dateutil==2.8.2

### Frontend Dependencies
**None required!** Pure HTML/CSS/JavaScript for maximum compatibility.

## 🚀 Running the Application

### Development Mode

1. **Start Backend API**:
   ```bash
   cd backend/
   python flask_api.py
   ```

2. **Open Frontend**:
   ```bash
   cd frontend/
   python -m http.server 8000
   ```

3. **Access the application**:
   - Frontend: `http://localhost:8000`
   - API: `http://localhost:5000`

## 🎯 Usage Instructions

### For Students:

1. **Open the web application** in your browser
2. **Complete your profile** with education, skills, interests, and location
3. **Navigate to "Discover"** to see personalized internship recommendations
4. **Swipe right** on internships you want to apply for
5. **Swipe left** to pass on internships
6. **Check your dashboard** to track application status

### For Developers:

1. **API Endpoints** are documented in `docs/API_DOCUMENTATION.md`
2. **Customize recommendations** by modifying weights in `flask_api.py`
3. **Add new internships** by updating the internships data
4. **Integrate with existing systems** using the REST API

## 🔧 Configuration

### Recommendation Algorithm Settings

Edit `backend/flask_api.py` to customize matching weights:

```python
# Skills matching (50% weightage)
# Location preference (15% weightage)
# Sector interest matching (25% weightage)
# Education level compatibility (10% weightage)
```

## 🧪 Testing

### API Testing with curl
```bash
# Test recommendations endpoint
curl http://localhost:5000/api/recommendations

# Test apply endpoint
curl -X POST http://localhost:5000/api/apply \
  -H "Content-Type: application/json" \
  -d '{"internship_id": 1, "action": "like"}'
```

## 🔒 Security Notes

- **Production Setup**: Change Flask debug mode to False
- **Environment Variables**: Use environment variables for sensitive data
- **HTTPS**: Always use HTTPS in production
- **Input Validation**: API validates all user inputs

## 🐛 Troubleshooting

### Common Issues:

**1. Flask API won't start**
```bash
# Check Python version
python --version

# Try different port
export FLASK_RUN_PORT=5001
python flask_api.py
```

**2. CORS errors**
```bash
# Ensure Flask-CORS is installed
pip install flask-cors
```

## 📊 Performance Features

- ✅ Lightweight ML algorithms (TF-IDF + Cosine similarity)
- ✅ Mobile-first responsive design
- ✅ Fast loading with vanilla JavaScript
- ✅ Optimized for low bandwidth

## 🏆 Smart India Hackathon 2025

**Problem Statement**: SIH25034 - AI-Based Internship Recommendation Engine for PM Internship Scheme

**Team**: Built for empowering Indian students to find their perfect internship matches.

---

*For questions or support, please refer to the troubleshooting section or check the API documentation.*
