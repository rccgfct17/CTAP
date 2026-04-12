/* ========================================
   MASTER SCRIPT - RCCG Christ the Anchor Parish
   All interactive functionality combined
   ======================================== */

// ========================================
// 1. DOM ELEMENTS
// ========================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('nav a');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const slideshowContainer = document.getElementById('slideshowContainer');
const eventsCarousel = document.getElementById('eventsCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// ========================================
// 2. VARIABLES
// ========================================

let currentSlide = 0;
let currentEventSlide = 0;
const slides = document.querySelectorAll('.slide');
const eventSlides = document.querySelectorAll('.event-slide');

// ========================================
// 3. MOBILE MENU TOGGLE
// ========================================

mobileMenuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('show');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        navMenu.classList.remove('show');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
        navMenu.classList.remove('show');
    }
});

// ========================================
// 4. SLIDESHOW FUNCTIONALITY
// ========================================

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('fade'));
    
    if (n >= slides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = slides.length - 1;
    }
    
    slides[currentSlide].classList.add('fade');
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

// Auto-advance slideshow every 5 seconds
setInterval(nextSlide, 5000);

// Initialize slideshow
showSlide(currentSlide);

// ========================================
// 5. EVENT CAROUSEL FUNCTIONALITY
// ========================================

function showEventSlide(n) {
    const totalSlides = eventSlides.length;
    const offset = -n * 100;
    eventsCarousel.style.transform = `translateX(${offset}%)`;
}

function nextEventSlide() {
    currentEventSlide++;
    if (currentEventSlide >= eventSlides.length) {
        currentEventSlide = 0;
    }
    showEventSlide(currentEventSlide);
}

function prevEventSlide() {
    currentEventSlide--;
    if (currentEventSlide < 0) {
        currentEventSlide = eventSlides.length - 1;
    }
    showEventSlide(currentEventSlide);
}

// Event listeners for carousel buttons
if (nextBtn) {
    nextBtn.addEventListener('click', nextEventSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevEventSlide);
}

// Auto advance event carousel every 8 seconds
setInterval(nextEventSlide, 8000);

// ========================================
// 6. SMOOTH SCROLLING
// ========================================

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for anchor links
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// 7. ACTIVE NAV LINK ON SCROLL
// ========================================

window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ========================================
// 8. BACK TO TOP BUTTON
// ========================================

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// 9. FORM VALIDATION & SUBMISSION
// ========================================

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset previous states
    const formGroups = contactForm.querySelectorAll('.form-group');
    const formStatus = document.getElementById('formStatus');
    
    formGroups.forEach(group => group.classList.remove('error'));
    formStatus.textContent = '';
    
    // Get form values
    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const subject = contactForm.querySelector('#subject').value;
    const message = contactForm.querySelector('#message').value.trim();
    
    let isValid = true;
    
    // Validate name
    if (!name) {
        showError('name', 'Please enter your full name');
        isValid = false;
    }
    
    // Validate email
    if (!email) {
        showError('email', 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!subject) {
        showError('subject', 'Please select a subject');
        isValid = false;
    }
    
    // Validate message
    if (!message) {
        showError('message', 'Please enter your message');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        // Show success message
        formStatus.classList.add('success');
        formStatus.classList.remove('error');
        formStatus.textContent = '✓ Thank you! Your message has been sent successfully. We will get back to you soon.';
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send the data to a server here
        console.log({
            name: name,
            email: email,
            subject: subject,
            message: message
        });
        
        // Clear success message after 5 seconds
        setTimeout(function() {
            formStatus.textContent = '';
            formStatus.classList.remove('success');
        }, 5000);
    } else {
        // Show error message
        formStatus.classList.add('error');
        formStatus.classList.remove('success');
        formStatus.textContent = '✗ Please fix the errors above and try again.';
    }
});

function showError(fieldId, message) {
    const field = contactForm.querySelector('#' + fieldId);
    const formGroup = field.closest('.form-group');
    const errorMsg = formGroup.querySelector('.error-msg');
    
    formGroup.classList.add('error');
    errorMsg.textContent = message;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========================================
// 10. CLEAR FORM ERRORS ON INPUT
// ========================================

contactForm.addEventListener('input', function(e) {
    const field = e.target;
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    const errorMsg = formGroup.querySelector('.error-msg');
    if (errorMsg) {
        errorMsg.textContent = '';
    }
});

// ========================================
// 11. UPDATE FOOTER YEAR DYNAMICALLY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('footer p');
    
    if (footerYear) {
        footerYear.textContent = footerYear.textContent.replace('2026', currentYear);
    }
});

// ========================================
// 12. ACCESSIBILITY - KEYBOARD NAVIGATION
// ========================================

document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('show');
    }
    
    // Tab key for back to top
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// ========================================
// 13. PREVENT FORM SUBMISSION ENTER KEY
// ========================================

const formInputs = contactForm.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');

formInputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const nextInput = findNextInput(this);
            if (nextInput) {
                nextInput.focus();
            }
        }
    });
});

function findNextInput(currentInput) {
    const inputs = Array.from(formInputs);
    const currentIndex = inputs.indexOf(currentInput);
    return inputs[currentIndex + 1] || null;
}

// ========================================
// 14. INTERSECTION OBSERVER FOR ANIMATIONS
// ======================================== 

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe cards and sections for animation
document.querySelectorAll('.card, .service-card, .ministry-card, .gallery-item').forEach(el => {
    observer.observe(el);
});

// ========================================
// 15. UTILITY FUNCTIONS
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// 16. PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images if supported
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========================================
// 17. ERROR HANDLING
// ========================================

window.addEventListener('error', function(e) {
    console.error('Error:', e.message);
    // Could log to analytics or error tracking service
});

// Handle promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ========================================
// 18. INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips if any
    initializeTooltips();
    
    // Set initial active nav link
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    let current = sections[0].getAttribute('id');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
        });
    });
}

// ========================================
// 19. CONSOLE MESSAGE
// ========================================

console.log('%c Welcome to RCCG Christ the Anchor Parish', 'font-size: 16px; color: #006400; font-weight: bold;');
console.log('%c Anchored in Christ | Growing in Grace | Making Heaven Together', 'font-size: 12px; color: #FFD700; font-style: italic;');
console.log('%c Scripture: "But as for me and my household, we will serve the Lord." - Joshua 24:15', 'font-size: 11px; color: #1a365d;');
