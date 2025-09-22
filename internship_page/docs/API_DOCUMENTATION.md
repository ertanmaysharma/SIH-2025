# API Documentation

## Base URL
`http://localhost:5000/api`

## Endpoints

### GET /recommendations
Get personalized internship recommendations.

**Response:**
```json
{
  "success": true,
  "recommendations": [
    {
      "id": 1,
      "company": "TechCorp Solutions",
      "role": "Machine Learning Intern",
      "location": "Bangalore",
      "stipend": "₹25,000/month",
      "duration": "3 months",
      "skills": ["Python", "Machine Learning", "TensorFlow"],
      "description": "Work on AI models for recommendation systems",
      "matchPercentage": 95
    }
  ]
}
```

### POST /apply
Apply for an internship.

**Request:**
```json
{
  "internship_id": 1,
  "action": "like"
}
```

### GET /profile
Get student profile.

### PUT /profile
Update student profile.

### GET /applications
Get user applications.

### GET /statistics
Get dashboard statistics.

### GET /health
Health check endpoint.
