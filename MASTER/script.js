/* ========================================
   RCCG CHRIST THE ANCHOR - MASTER SCRIPT v3.0
   Production-Ready | ES6+ | Modern Best Practices
   ======================================== */

'use strict';

// ========================================
// 1. CONFIGURATION & CONSTANTS
// ========================================

const CONFIG = {
    MOBILE_BREAKPOINT: 880,
    SCROLL_THRESHOLD: 300,
    CAROUSEL_INTERVAL: 5000,
    EVENT_CAROUSEL_INTERVAL: 8000,
    DEBOUNCE_DELAY: 80,
    ANIMATION_DELAY: 500,
    FORM_SUCCESS_TIMEOUT: 5000,
    MIN_MESSAGE_LENGTH: 10,
};

const SELECTORS = {
    mobileMenuBtn: '#mobileMenuBtn',
    navMenu: '#navMenu',
    navLinks: 'nav a',
    backToTopBtn: '#backToTop',
    contactForm: '#contactForm',
    formStatus: '#formStatus',
    eventsCarousel: '#eventsCarousel',
    prevBtn: '#prevBtn',
    nextBtn: '#nextBtn',
    slides: '.slide',
    eventSlides: '.event-slide',
    formInputs: '#contactForm input[type="text"], #contactForm input[type="email"], #contactForm input[type="tel"], #contactForm textarea, #contactForm select',
};

// ========================================
// 2. DOM CACHE & STATE
// ========================================

const DOM = {};
const state = {
    currentSlide: 0,
    currentEventSlide: 0,
    isMenuOpen: false,
    isFetching: false,
};

// ========================================
// 3. INITIALIZATION
// ========================================

const initializeDOMCache = () => {
    DOM.mobileMenuBtn = document.querySelector(SELECTORS.mobileMenuBtn);
    DOM.navMenu = document.querySelector(SELECTORS.navMenu);
    DOM.navLinks = Array.from(document.querySelectorAll(SELECTORS.navLinks));
    DOM.backToTopBtn = document.querySelector(SELECTORS.backToTopBtn);
    DOM.contactForm = document.querySelector(SELECTORS.contactForm);
    DOM.formStatus = document.querySelector(SELECTORS.formStatus);
    DOM.eventsCarousel = document.querySelector(SELECTORS.eventsCarousel);
    DOM.prevBtn = document.querySelector(SELECTORS.prevBtn);
    DOM.nextBtn = document.querySelector(SELECTORS.nextBtn);
    DOM.slides = Array.from(document.querySelectorAll(SELECTORS.slides));
    DOM.eventSlides = Array.from(document.querySelectorAll(SELECTORS.eventSlides));
    DOM.formInputs = DOM.contactForm 
        ? Array.from(document.querySelectorAll(SELECTORS.formInputs))
        : [];
};

// ========================================
// 4. UTILITY FUNCTIONS
// ========================================

const debounce = (func, wait = CONFIG.DEBOUNCE_DELAY) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), wait);
    };
};

const throttle = (func, wait = CONFIG.DEBOUNCE_DELAY) => {
    let lastCall = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastCall >= wait) {
            lastCall = now;
            func(...args);
        }
    };
};

const clampIndex = (value, length) => ((value % length) + length) % length;

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhone = (phone) => {
    if (!phone) return true;
    const phonePattern = /^\+?[0-9\s\-().]{7,20}$/;
    return phonePattern.test(phone);
};

// ========================================
// 5. MOBILE MENU MANAGEMENT
// ========================================

const closeMobileMenu = () => {
    if (!DOM.navMenu || !DOM.mobileMenuBtn) return;
    DOM.navMenu.classList.remove('show');
    DOM.mobileMenuBtn.setAttribute('aria-expanded', 'false');
    state.isMenuOpen = false;
};

const toggleMobileMenu = () => {
    if (!DOM.navMenu || !DOM.mobileMenuBtn) return;
    state.isMenuOpen = DOM.navMenu.classList.toggle('show');
    DOM.mobileMenuBtn.setAttribute('aria-expanded', String(state.isMenuOpen));
};

const initializeMobileMenu = () => {
    if (!DOM.mobileMenuBtn) return;

    DOM.mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    document.addEventListener('click', (event) => {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
            closeMobileMenu();
        }
    });

    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > CONFIG.MOBILE_BREAKPOINT) {
            closeMobileMenu();
        }
    }, 150));
};

// ========================================
// 6. NAVIGATION MANAGEMENT
// ========================================

const scrollToTarget = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.focus();
};

const updateActiveNavLink = () => {
    const sections = Array.from(document.querySelectorAll('section[id], footer[id]'));
    if (sections.length === 0) return;

    const scrollPosition = window.scrollY + 200;
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    let activeSectionId = null;

    sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
            activeSectionId = section.id;
        }
    });

    DOM.navLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';

        if (href.startsWith('#')) {
            link.classList.toggle('active', href === `#${activeSectionId}`);
        } else {
            const sanitizedHref = href.split('/').pop();
            const isIndexAlias = (!sanitizedHref || sanitizedHref === 'index.html') && 
                               (currentPath === '' || currentPath === 'index.html');
            link.classList.toggle('active', sanitizedHref === currentPath || isIndexAlias);
        }
    });
};

const initializeNavigation = () => {
    if (DOM.navLinks.length === 0) return;

    DOM.navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            closeMobileMenu();
            if (link.getAttribute('href')?.startsWith('#')) {
                event.preventDefault();
                scrollToTarget(link.getAttribute('href').slice(1));
            }
        });
    });
};

// ========================================
// 7. SLIDESHOW FUNCTIONALITY
// ========================================

const showSlide = (index) => {
    if (DOM.slides.length === 0) return;
    state.currentSlide = clampIndex(index, DOM.slides.length);
    DOM.slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === state.currentSlide);
    });
};

const nextSlide = () => showSlide(state.currentSlide + 1);

const initializeSlideshow = () => {
    if (DOM.slides.length === 0) return;
    showSlide(0);
    setInterval(nextSlide, CONFIG.CAROUSEL_INTERVAL);
};

// ========================================
// 8. EVENT CAROUSEL
// ========================================

const showEventSlide = (index) => {
    if (!DOM.eventsCarousel || DOM.eventSlides.length === 0) return;
    state.currentEventSlide = clampIndex(index, DOM.eventSlides.length);
    DOM.eventsCarousel.style.transform = `translateX(-${state.currentEventSlide * 100}%)`;
};

const nextEventSlide = () => showEventSlide(state.currentEventSlide + 1);
const prevEventSlide = () => showEventSlide(state.currentEventSlide - 1);

const initializeEventCarousel = () => {
    if (!DOM.eventSlides.length) return;
    showEventSlide(0);
    if (DOM.nextBtn) DOM.nextBtn.addEventListener('click', nextEventSlide);
    if (DOM.prevBtn) DOM.prevBtn.addEventListener('click', prevEventSlide);
    setInterval(nextEventSlide, CONFIG.EVENT_CAROUSEL_INTERVAL);
};

// ========================================
// 9. FORM MANAGEMENT
// ========================================

const showFormError = (fieldId, message) => {
    const field = DOM.contactForm?.querySelector(`#${fieldId}`);
    if (!field) return;

    const formGroup = field.closest('.form-group');
    const errorMsg = formGroup?.querySelector('.error-msg');

    formGroup?.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    field.setCustomValidity(message);
    if (errorMsg) errorMsg.textContent = message;
};

const clearFormError = (field) => {
    const formGroup = field.closest('.form-group');
    const errorMsg = formGroup?.querySelector('.error-msg');

    formGroup?.classList.remove('error');
    field.removeAttribute('aria-invalid');
    field.setCustomValidity('');
    if (errorMsg) errorMsg.textContent = '';
};

const validateContactForm = () => {
    const name = DOM.contactForm.querySelector('#name')?.value.trim() || '';
    const email = DOM.contactForm.querySelector('#email')?.value.trim() || '';
    const phone = DOM.contactForm.querySelector('#phone')?.value.trim() || '';
    const subject = DOM.contactForm.querySelector('#subject')?.value || '';
    const message = DOM.contactForm.querySelector('#message')?.value.trim() || '';

    let isValid = true;

    // Reset errors
    DOM.formInputs.forEach((input) => clearFormError(input));

    // Validation logic
    if (!name) {
        showFormError('name', 'Please enter your full name');
        isValid = false;
    }

    if (!email) {
        showFormError('email', 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFormError('email', 'Please enter a valid email address');
        isValid = false;
    }

    if (phone && !validatePhone(phone)) {
        showFormError('phone', 'Please enter a valid phone number');
        isValid = false;
    }

    if (!subject) {
        showFormError('subject', 'Please select a subject');
        isValid = false;
    }

    if (!message || message.length < CONFIG.MIN_MESSAGE_LENGTH) {
        showFormError('message', `Please enter a message with at least ${CONFIG.MIN_MESSAGE_LENGTH} characters`);
        isValid = false;
    }

    return isValid;
};

const setupContactForm = () => {
    if (!DOM.contactForm) return;

    DOM.formStatus?.setAttribute('aria-live', 'polite');
    DOM.formStatus?.setAttribute('role', 'status');
    DOM.formStatus?.setAttribute('aria-atomic', 'true');

    DOM.contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (state.isFetching) return;

        if (validateContactForm()) {
            state.isFetching = true;
            DOM.formStatus.classList.add('success');
            DOM.formStatus.classList.remove('error');
            DOM.formStatus.innerHTML = '✓ Thank you! Your message has been sent successfully. We will get back to you soon.';
            DOM.contactForm.reset();

            setTimeout(() => {
                DOM.formStatus.textContent = '';
                DOM.formStatus.classList.remove('success');
                state.isFetching = false;
            }, CONFIG.FORM_SUCCESS_TIMEOUT);
        } else {
            DOM.formStatus.classList.add('error');
            DOM.formStatus.classList.remove('success');
            DOM.formStatus.innerHTML = '✗ Please fix the errors above and try again.';
        }
    });

    DOM.contactForm.addEventListener('input', (event) => {
        const target = event.target;
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) {
            clearFormError(target);
        }
    });

    DOM.formInputs.forEach((input, index) => {
        input.addEventListener('keypress', (event) => {
            if (event.key !== 'Enter') return;
            event.preventDefault();
            const nextInput = DOM.formInputs[index + 1];
            if (nextInput) nextInput.focus();
        });
    });
};

// ========================================
// 10. INTERSECTION OBSERVER
// ========================================

const initializeObserver = () => {
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        document.querySelectorAll('.animate-on-scroll, .will-animate').forEach(el => {
            el.classList.add('in-view');
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.12, 
        rootMargin: '0px 0px -80px 0px' 
    });

    document.querySelectorAll('.animate-on-scroll, .will-animate, .card, .card--premium, .card--visual, .service-card, .ministry-card, .gallery-item, .event-item, .testimonial-block').forEach((el) => {
        observer.observe(el);
    });
};

// ========================================
// 11. BACK TO TOP
// ========================================

const toggleBackToTop = () => {
    if (!DOM.backToTopBtn) return;
    DOM.backToTopBtn.classList.toggle('show', window.scrollY > CONFIG.SCROLL_THRESHOLD);
};

const initializeBackToTop = () => {
    if (!DOM.backToTopBtn) return;
    DOM.backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// ========================================
// 12. ACCESSIBILITY
// ========================================

const initializeAccessibility = () => {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }

        if (event.key === 'ArrowUp' && event.ctrlKey) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
};

// ========================================
// 13. FOOTER UPDATES
// ========================================

const updateFooterYear = () => {
    const currentYear = new Date().getFullYear();
    const yearNodes = Array.from(document.querySelectorAll('[data-current-year], .js-current-year'));
    yearNodes.forEach((el) => {
        el.textContent = String(currentYear);
    });
};

// ========================================
// 14. ERROR HANDLING
// ========================================

const setupErrorHandling = () => {
    window.addEventListener('error', (event) => {
        console.error('Script error:', event.message, 'at', `${event.filename}:${event.lineno}`);
    });

    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
    });
};

// ========================================
// 15. INITIALIZATION
// ========================================

const initialize = () => {
    // Cache DOM elements
    initializeDOMCache();

    // Initialize features
    initializeMobileMenu();
    initializeNavigation();
    initializeSlideshow();
    initializeEventCarousel();
    setupContactForm();
    initializeObserver();
    updateFooterYear();
    updateActiveNavLink();
    initializeAccessibility();
    initializeBackToTop();
    setupErrorHandling();

    // Event listeners
    window.addEventListener('scroll', debounce(() => {
        updateActiveNavLink();
        toggleBackToTop();
    }, CONFIG.DEBOUNCE_DELAY));

    // Log initialization
    console.log('%c Welcome to RCCG Christ the Anchor Parish', 'font-size: 16px; color: #009444; font-weight: bold;');
    console.log('%c Anchored in Christ | Growing in Grace | Making Heaven Together', 'font-size: 12px; color: #fad03b; font-style: italic;');
};

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

// Expose functions globally for inline handlers (minimal)
window.scrollToSection = (id) => scrollToTarget(id);
