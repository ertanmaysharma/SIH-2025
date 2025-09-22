// Application State
let currentUser = {
    name: "Priya Sharma",
    email: "priya.sharma@student.ac.in",
    education: "B.Tech Computer Science (3rd Year)",
    skills: ["Python", "React.js", "Machine Learning", "JavaScript", "HTML/CSS"],
    interests: ["Artificial Intelligence", "Web Development", "Data Science"],
    location: "Delhi"
};

let currentInternships = [];
let currentInternshipIndex = 0;
let applications = [];
let statistics = {
    totalCompanies: 156,
    appliedInternships: 8,
    selectedInternships: 2,
    pendingEvaluations: 4
};

// Sample internship data
const internshipData = [
    {
        id: 1,
        company: "TechCorp Solutions",
        role: "Machine Learning Intern",
        location: "Bangalore",
        stipend: "₹25,000/month",
        duration: "3 months",
        skills: ["Python", "Machine Learning", "TensorFlow"],
        description: "Work on AI models for recommendation systems.",
        matchPercentage: 95,
        logo: "https://via.placeholder.com/60x60/007bff/ffffff?text=TC"
    },
    {
        id: 2,
        company: "WebDev Studios",
        role: "Frontend Developer Intern",
        location: "Mumbai",
        stipend: "₹20,000/month",
        duration: "4 months",
        skills: ["React.js", "JavaScript", "HTML/CSS"],
        description: "Build responsive web applications.",
        matchPercentage: 88,
        logo: "https://via.placeholder.com/60x60/28a745/ffffff?text=WD"
    },
    {
        id: 3,
        company: "DataFlow Analytics",
        role: "Data Science Intern",
        location: "Hyderabad",
        stipend: "₹22,000/month",
        duration: "6 months",
        skills: ["Python", "Data Analysis", "SQL"],
        description: "Analyze large datasets and create predictive models.",
        matchPercentage: 92,
        logo: "https://via.placeholder.com/60x60/17a2b8/ffffff?text=DF"
    }
];

let recentActivity = [
    {
        type: "application",
        message: "Applied to Software Engineer Intern at Google India",
        timestamp: "2025-09-21T10:30:00Z",
        icon: "fas fa-paper-plane",
        color: "#007bff"
    },
    {
        type: "match",
        message: "New internship match: ML Engineer at TechCorp (95% match)",
        timestamp: "2025-09-21T09:15:00Z",
        icon: "fas fa-heart",
        color: "#28a745"
    },
    {
        type: "selection",
        message: "Selected for interview at Microsoft!",
        timestamp: "2025-09-19T16:45:00Z",
        icon: "fas fa-check-circle",
        color: "#ffc107"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadDashboard();
});

function initializeApp() {
    currentInternships = [...internshipData];

    const studentNameElement = document.getElementById('studentName');
    if (studentNameElement) {
        studentNameElement.textContent = currentUser.name.split(' ')[0];
    }

    applications = [
        {
            id: 1,
            company: "Google India",
            role: "Software Engineer Intern",
            status: "selected",
            appliedDate: "2025-09-10"
        },
        {
            id: 2,
            company: "Microsoft",
            role: "AI Research Intern",
            status: "review",
            appliedDate: "2025-09-12"
        }
    ];
}

function setupEventListeners() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            navigateToSection(section);
        });
    });

    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            if (section) {
                navigateToSection(section);
            }
        });
    });

    const passBtn = document.getElementById('passBtn');
    const applyBtn = document.getElementById('applyBtn');

    if (passBtn) passBtn.addEventListener('click', () => handleSwipe('left'));
    if (applyBtn) applyBtn.addEventListener('click', () => handleSwipe('right'));
}

function navigateToSection(sectionName) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionName).classList.add('active');

    switch(sectionName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'discover':
            loadDiscoverSection();
            break;
        case 'applications':
            loadApplications();
            break;
        case 'profile':
            loadProfile();
            break;
    }
}

function loadDashboard() {
    document.getElementById('totalCompanies').textContent = statistics.totalCompanies;
    document.getElementById('appliedInternships').textContent = statistics.appliedInternships;
    document.getElementById('selectedInternships').textContent = statistics.selectedInternships;
    document.getElementById('pendingEvaluations').textContent = statistics.pendingEvaluations;

    const activityList = document.getElementById('activityList');
    if (activityList) {
        activityList.innerHTML = recentActivity.map(activity => `
            <div class="activity-item">
                <div class="activity-icon" style="background: ${activity.color}">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.message}</p>
                    <small>${formatTimestamp(activity.timestamp)}</small>
                </div>
            </div>
        `).join('');
    }
}

function loadDiscoverSection() {
    currentInternshipIndex = 0;
    renderInternshipCard();
}

function renderInternshipCard() {
    const cardStack = document.getElementById('cardStack');
    const internship = currentInternships[currentInternshipIndex];

    if (!internship) {
        showEmptyState();
        return;
    }

    const cardHTML = `
        <div class="internship-card" id="currentCard">
            <div class="card-header">
                <img src="${internship.logo}" alt="${internship.company}" class="company-logo">
                <div class="match-badge">${internship.matchPercentage}% Match</div>
            </div>
            <div class="card-content">
                <h3>${internship.company}</h3>
                <h4>${internship.role}</h4>
                <div class="card-details">
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${internship.location}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-rupee-sign"></i>
                        <span>${internship.stipend}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span>${internship.duration}</span>
                    </div>
                </div>
                <div class="card-description">
                    ${internship.description}
                </div>
                <div class="skills-list">
                    ${internship.skills.map(skill => `<span class="skill-chip">${skill}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    cardStack.innerHTML = cardHTML;
}

function handleSwipe(direction) {
    const internship = currentInternships[currentInternshipIndex];

    if (direction === 'right') {
        applyForInternship(internship);
        showNotification(`Applied to ${internship.company}!`, 'success');
    } else {
        showNotification('Internship passed', 'info');
    }

    currentInternshipIndex++;
    if (currentInternshipIndex < currentInternships.length) {
        renderInternshipCard();
    } else {
        showEmptyState();
    }
}

function applyForInternship(internship) {
    const application = {
        id: applications.length + 1,
        company: internship.company,
        role: internship.role,
        status: 'applied',
        appliedDate: new Date().toISOString().split('T')[0]
    };

    applications.push(application);
    statistics.appliedInternships = applications.length;
}

function showEmptyState() {
    document.getElementById('cardStack').style.display = 'none';
    document.getElementById('emptyState').style.display = 'block';
}

function loadApplications() {
    const applicationsList = document.getElementById('applicationsList');
    if (!applicationsList) return;

    applicationsList.innerHTML = applications.map(app => `
        <div class="application-card">
            <div class="application-header">
                <h3>${app.company} - ${app.role}</h3>
                <span class="status-badge ${app.status}">${getStatusText(app.status)}</span>
            </div>
            <div class="application-info">
                Applied on ${formatDate(app.appliedDate)}
            </div>
        </div>
    `).join('');
}

function loadProfile() {
    document.getElementById('fullName').value = currentUser.name;
    document.getElementById('email').value = currentUser.email;
    document.getElementById('location').value = currentUser.location;
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

function getStatusText(status) {
    const statusMap = {
        'applied': 'Applied',
        'review': 'Under Review',
        'selected': 'Selected'
    };
    return statusMap[status] || status;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}