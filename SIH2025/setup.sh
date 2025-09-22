#!/bin/bash

echo "🚀 Setting up AI-Powered Internship Recommendation System..."
echo "============================================================="

# Check if Python is installed
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found"
else
    echo "❌ Python 3 not found. Please install Python 3.8+ first."
    exit 1
fi

# Check if pip is installed
if command -v pip3 &> /dev/null; then
    echo "✅ pip3 found"
else
    echo "❌ pip3 not found. Please install pip first."
    exit 1
fi

echo ""
echo "📦 Installing Python dependencies..."

# Navigate to backend directory and install dependencies
cd backend/
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

echo "✅ Backend dependencies installed"

echo ""
echo "🌐 Frontend ready (no build required)"

echo ""
echo "📱 Mobile setup (optional)..."
cd ../mobile/

if command -v npm &> /dev/null; then
    echo "✅ npm found - installing mobile dependencies..."
    npm install
    echo "✅ Mobile dependencies installed"
else
    echo "⚠️  npm not found - skipping mobile setup"
fi

cd ..
echo ""
echo "🎉 Setup complete!"
echo ""
echo "🚀 To run the application:"
echo "   1. Start backend API:"
echo "      cd backend/"
echo "      source venv/bin/activate"
echo "      python flask_api.py"
echo ""
echo "   2. Open frontend:"
echo "      cd frontend/"
echo "      python -m http.server 8000"
echo ""
echo "📚 For more details, see README.md"
