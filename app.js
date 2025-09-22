document.addEventListener('DOMContentLoaded', function() {
 
    initializeApp();
});

function initializeApp() {
    
    setupButtonHandlers();

    setupSmoothScrolling();

    setupButtonLoadingStates();

    console.log('PM Internship Scheme application initialized');
}

function setupButtonHandlers() {
    const studentBtn = document.getElementById('studentBtn');
    const companyBtn = document.getElementById('companyBtn');

    if (studentBtn) {
        studentBtn.onclick = () => location.href = 'job_application.html';
    }

    if (companyBtn) {
        companyBtn.onclick = () => location.href = 'company_registration.html';
    }
}



function setupSmoothScrolling() {
    // Add smooth scrolling for any anchor links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupButtonLoadingStates() {
    // This function can be used to add loading states to buttons
    // Currently implemented inline in the click handlers
    console.log('Button loading states ready');
}

function showButtonLoading(button, loadingText) {
    if (!button) return;

    button.disabled = true;
    button.classList.add('cta__button--loading');

    const originalContent = button.innerHTML;
    button.setAttribute('data-original-content', originalContent);

    // Update button text
    const textElement = button.querySelector('.cta__button-text h4');
    if (textElement) {
        textElement.textContent = loadingText;
    }
}

function resetButtonLoading(button, originalText) {
    if (!button) return;

    button.disabled = false;
    button.classList.remove('cta__button--loading');

    const originalContent = button.getAttribute('data-original-content');
    if (originalContent) {
        button.innerHTML = originalContent;
    } else {
        // Fallback
        const textElement = button.querySelector('.cta__button-text h4');
        if (textElement) {
            textElement.textContent = originalText;
        }
    }
}

// Utility function for handling responsive navigation
function handleResponsiveNavigation() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

// Initialize responsive navigation on load
document.addEventListener('DOMContentLoaded', function() {
    handleResponsiveNavigation();
});

// Add error handling for the entire application
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Add performance monitoring
window.addEventListener('load', function() {
    // Log load time for performance monitoring
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});
