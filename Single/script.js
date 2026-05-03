/* ========================================
   RCCG CHRIST THE ANCHOR - SINGLE SCRIPT
   Safe initialization, unified naming, ES6+
   ======================================== */

'use strict';

const appSelectors = {
    mobileMenuBtn: '#mobileMenuBtn',
    navMenu: '#navMenu',
    navLinks: 'nav a',
    backToTopBtn: '#backToTop',
    contactForm: '#contactForm',
    formStatus: '#formStatus',
    heroSlides: '.slide',
    eventsCarousel: '#eventsCarousel',
    prevBtn: '#prevBtn',
    nextBtn: '#nextBtn',
};

const state = {
    currentSlide: 0,
    currentEventSlide: 0,
    isSubmitting: false,
};

const dom = {};

const debounce = (fn, delay = 80) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};

const clamp = (value, length) => ((value % length) + length) % length;

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const initializeDom = () => {
    dom.mobileMenuBtn = document.querySelector(appSelectors.mobileMenuBtn);
    dom.navMenu = document.querySelector(appSelectors.navMenu);
    dom.navLinks = Array.from(document.querySelectorAll(appSelectors.navLinks));
    dom.backToTopBtn = document.querySelector(appSelectors.backToTopBtn);
    dom.contactForm = document.querySelector(appSelectors.contactForm);
    dom.formStatus = document.querySelector(appSelectors.formStatus);
    dom.heroSlides = Array.from(document.querySelectorAll(appSelectors.heroSlides));
    dom.eventsCarousel = document.querySelector(appSelectors.eventsCarousel);
    dom.prevBtn = document.querySelector(appSelectors.prevBtn);
    dom.nextBtn = document.querySelector(appSelectors.nextBtn);
};

const toggleMenu = () => {
    if (!dom.navMenu || !dom.mobileMenuBtn) return;
    const isOpen = dom.navMenu.classList.toggle('show');
    dom.mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
};

const closeMenu = () => {
    if (!dom.navMenu || !dom.mobileMenuBtn) return;
    dom.navMenu.classList.remove('show');
    dom.mobileMenuBtn.setAttribute('aria-expanded', 'false');
};

const initializeMenu = () => {
    if (!dom.mobileMenuBtn) return;

    dom.mobileMenuBtn.addEventListener('click', toggleMenu);

    dom.navLinks.forEach((link) => {
        link.addEventListener('click', () => closeMenu());
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
            closeMenu();
        }
    });
};

const showSlide = (index) => {
    if (dom.heroSlides.length === 0) return;
    state.currentSlide = clamp(index, dom.heroSlides.length);
    dom.heroSlides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === state.currentSlide);
    });
};

const startHeroSlideshow = () => {
    if (dom.heroSlides.length === 0) return;
    showSlide(0);
    setInterval(() => showSlide(state.currentSlide + 1), 5000);
};

const updateActiveNav = () => {
    if (!dom.navLinks.length) return;
    const sections = Array.from(document.querySelectorAll('section[id], footer[id]'));
    const position = window.scrollY + 220;
    let current = sections.length ? sections[0].id : '';

    sections.forEach((section) => {
        if (position >= section.offsetTop) current = section.id;
    });

    dom.navLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        link.classList.toggle('active', href === `#${current}`);
    });
};

const smoothScroll = () => {
    dom.navLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        if (!href.startsWith('#')) return;
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const target = document.getElementById(href.slice(1));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
};

const toggleBackToTop = () => {
    if (!dom.backToTopBtn) return;
    dom.backToTopBtn.classList.toggle('show', window.scrollY > 300);
};

const initializeBackToTop = () => {
    if (!dom.backToTopBtn) return;
    dom.backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

const showFormError = (fieldId, message) => {
    if (!dom.contactForm) return;
    const field = dom.contactForm.querySelector(`#${fieldId}`);
    if (!field) return;
    const group = field.closest('.form-group');
    const error = group?.querySelector('.error-msg');
    group?.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    if (error) error.textContent = message;
};

const clearFieldError = (field) => {
    if (!field) return;
    const group = field.closest('.form-group');
    const error = group?.querySelector('.error-msg');
    group?.classList.remove('error');
    field.removeAttribute('aria-invalid');
    if (error) error.textContent = '';
};

const validateForm = () => {
    if (!dom.contactForm) return false;

    const name = dom.contactForm.querySelector('#name')?.value.trim() || '';
    const email = dom.contactForm.querySelector('#email')?.value.trim() || '';
    const subject = dom.contactForm.querySelector('#subject')?.value || '';
    const message = dom.contactForm.querySelector('#message')?.value.trim() || '';
    const phone = dom.contactForm.querySelector('#phone')?.value.trim() || '';

    let valid = true;
    dom.contactForm.querySelectorAll('.form-group').forEach((group) => group.classList.remove('error'));

    if (!name) {
        showFormError('name', 'Please enter your full name');
        valid = false;
    }

    if (!email) {
        showFormError('email', 'Please enter your email address');
        valid = false;
    } else if (!isValidEmail(email)) {
        showFormError('email', 'Please enter a valid email address');
        valid = false;
    }

    if (phone && !/^\+?[0-9\s\-().]{7,20}$/.test(phone)) {
        showFormError('phone', 'Please enter a valid phone number');
        valid = false;
    }

    if (!subject) {
        showFormError('subject', 'Please select a subject');
        valid = false;
    }

    if (!message || message.length < 10) {
        showFormError('message', 'Message must be at least 10 characters long');
        valid = false;
    }

    return valid;
};

const setupContactForm = () => {
    if (!dom.contactForm) return;

    const status = dom.formStatus;
    status?.setAttribute('aria-live', 'polite');
    status?.setAttribute('aria-atomic', 'true');

    dom.contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (state.isSubmitting) return;

        if (validateForm()) {
            state.isSubmitting = true;
            status?.classList.remove('error');
            status?.classList.add('success');
            if (status) status.textContent = '✓ Thank you! Your message has been sent.';

            dom.contactForm.reset();
            window.setTimeout(() => {
                if (status) status.textContent = '';
                status?.classList.remove('success');
                state.isSubmitting = false;
            }, 5000);
        } else {
            status?.classList.remove('success');
            status?.classList.add('error');
            if (status) status.textContent = '✗ Please fix the errors and try again.';
        }
    });

    dom.contactForm.addEventListener('input', (event) => {
        const target = event.target;
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) {
            clearFieldError(target);
        }
    });
};

const initializeEventCarousel = () => {
    if (!dom.eventsCarousel) return;
    const slides = Array.from(dom.eventsCarousel.querySelectorAll('.event-slide'));
    if (!slides.length) return;

    const showEventSlide = (index) => {
        state.currentEventSlide = clamp(index, slides.length);
        dom.eventsCarousel.style.transform = `translateX(-${state.currentEventSlide * 100}%)`;
    };

    dom.nextBtn?.addEventListener('click', () => showEventSlide(state.currentEventSlide + 1));
    dom.prevBtn?.addEventListener('click', () => showEventSlide(state.currentEventSlide - 1));
    setInterval(() => showEventSlide(state.currentEventSlide + 1), 8000);
};

const initializeKeyboardShortcuts = () => {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
        if (event.key === 'ArrowUp' && event.ctrlKey) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
};

const initializePage = () => {
    initializeDom();
    initializeMenu();
    smoothScroll();
    startHeroSlideshow();
    initializeBackToTop();
    setupContactForm();
    initializeEventCarousel();
    initializeKeyboardShortcuts();
    updateActiveNav();
    window.addEventListener('scroll', debounce(() => {
        updateActiveNav();
        toggleBackToTop();
    }, 80));

    document.addEventListener('click', (event) => {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
            closeMenu();
        }
    });

    window.addEventListener('error', (event) => console.error('Error:', event.message));
    window.addEventListener('unhandledrejection', (event) => console.error('Unhandled promise rejection:', event.reason));
};

document.addEventListener('DOMContentLoaded', initializePage);
