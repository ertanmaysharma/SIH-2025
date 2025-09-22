document.addEventListener('DOMContentLoaded', function() {
    const studentBtn = document.getElementById('studentBtn');
    const companyBtn = document.getElementById('companyBtn');
    
    if (studentBtn) {
        studentBtn.onclick = () => location.href = 'job_application.html';
    }
    
    if (companyBtn) {
        companyBtn.onclick = () => location.href = 'company_registration.html';
    }
});