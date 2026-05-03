/* ========================================
   MASTER SCRIPT - RCCG Christ the Anchor Parish
   Modern, ES6-ready interactive behavior
   ======================================== */

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = Array.from(document.querySelectorAll('nav a'));
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const eventsCarousel = document.getElementById('eventsCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slides = Array.from(document.querySelectorAll('.slide'));
const eventSlides = Array.from(document.querySelectorAll('.event-slide'));
const formInputs = contactForm ? Array.from(contactForm.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea, select')) : [];

let currentSlide = 0;
let currentEventSlide = 0;

const debounce = (fn, wait = 120) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => fn(...args), wait);
    };
};

const clampIndex = (value, length) => ((value % length) + length) % length;

const closeMobileNav = () => {
    if (!navMenu || !mobileMenuBtn) return;
    navMenu.classList.remove('show');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
};

const toggleMobileNav = () => {
    if (!navMenu || !mobileMenuBtn) return;
    const isOpen = navMenu.classList.toggle('show');
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
};

const updateActiveNavLink = () => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const scrollPosition = window.scrollY + 200;
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    let activeSectionId = null;

    if (sections.length) {
        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop) {
                activeSectionId = section.id;
            }
        });
    }

    navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';

        if (href.startsWith('#')) {
            link.classList.toggle('active', href === `#${activeSectionId}`);
        } else {
            const sanitizedHref = href.split('/').pop();
            const isIndexAlias = (!sanitizedHref || sanitizedHref === 'index.html') && (currentPath === '' || currentPath === 'index.html');
            link.classList.toggle('active', sanitizedHref === currentPath || isIndexAlias);
        }
    });
};

const scrollToTarget = id => {
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

const showSlide = index => {
    if (!slides.length) return;
    currentSlide = clampIndex(index, slides.length);
    slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('active', slideIndex === currentSlide);
    });
};

const nextSlide = () => showSlide(currentSlide + 1);

const showEventSlide = index => {
    if (!eventsCarousel || !eventSlides.length) return;
    currentEventSlide = clampIndex(index, eventSlides.length);
    eventsCarousel.style.transform = `translateX(-${currentEventSlide * 100}%)`;
};

const nextEventSlide = () => showEventSlide(currentEventSlide + 1);
const prevEventSlide = () => showEventSlide(currentEventSlide - 1);

const showError = (fieldId, message) => {
    const field = contactForm?.querySelector(`#${fieldId}`);
    if (!field) return;
    const formGroup = field.closest('.form-group');
    const errorMsg = formGroup?.querySelector('.error-msg');

    formGroup?.classList.add('error');
    if (errorMsg) errorMsg.textContent = message;
};

const clearError = field => {
    const formGroup = field.closest('.form-group');
    const errorMsg = formGroup?.querySelector('.error-msg');

    formGroup?.classList.remove('error');
    if (errorMsg) errorMsg.textContent = '';
};

const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const enhanceImages = () => {
    document.querySelectorAll('img').forEach(img => {
        img.decoding = 'async';
        if (!img.closest('.hero')) {
            img.loading = 'lazy';
        }
    });
};

const initializeObserver = () => {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

    document.querySelectorAll('.card, .service-card, .ministry-card, .gallery-item, .event-item, .testimonial-block').forEach(el => {
        el.classList.add('will-animate');
        observer.observe(el);
    });
};

const setupContactForm = () => {
    if (!contactForm) return;

    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const formStatus = document.getElementById('formStatus');
        let isValid = true;

        formInputs.forEach(input => clearError(input));
        if (formStatus) {
            formStatus.className = 'form-status';
            formStatus.textContent = '';
        }

        const name = contactForm.querySelector('#name')?.value.trim() || '';
        const email = contactForm.querySelector('#email')?.value.trim() || '';
        const subject = contactForm.querySelector('#subject')?.value || '';
        const message = contactForm.querySelector('#message')?.value.trim() || '';

        if (!name) {
            showError('name', 'Please enter your full name');
            isValid = false;
        }

        if (!email) {
            showError('email', 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!subject) {
            showError('subject', 'Please select a subject');
            isValid = false;
        }

        if (!message || message.length < 10) {
            showError('message', 'Please enter a message with at least 10 characters');
            isValid = false;
        }

        if (!formStatus) return;

        if (isValid) {
            formStatus.classList.add('success');
            formStatus.textContent = '✓ Thank you! Your message has been sent successfully. We will get back to you soon.';
            contactForm.reset();
            window.setTimeout(() => {
                formStatus.textContent = '';
                formStatus.classList.remove('success');
            }, 5000);
        } else {
            formStatus.classList.add('error');
            formStatus.textContent = '✗ Please fix the errors above and try again.';
        }
    });

    contactForm.addEventListener('input', event => {
        const target = event.target;
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) {
            clearError(target);
        }
    });

    formInputs.forEach((input, index) => {
        input.addEventListener('keypress', event => {
            if (event.key !== 'Enter') return;
            event.preventDefault();
            const nextInput = formInputs[index + 1];
            if (nextInput) nextInput.focus();
        });
    });
};

const initializeNavigation = () => {
    mobileMenuBtn?.addEventListener('click', toggleMobileNav);

    document.addEventListener('click', event => {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
            closeMobileNav();
        }
    });

    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768) closeMobileNav();
    }, 150));

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            closeMobileNav();
            if (link.getAttribute('href')?.startsWith('#')) {
                event.preventDefault();
                scrollToTarget(link.getAttribute('href').slice(1));
            }
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });
};

const initializeSlideshow = () => {
    if (!slides.length) return;
    showSlide(0);
    window.setInterval(nextSlide, 5000);
};

const initializeEventCarousel = () => {
    if (!eventSlides.length) return;
    showEventSlide(0);
    nextBtn?.addEventListener('click', nextEventSlide);
    prevBtn?.addEventListener('click', prevEventSlide);
    window.setInterval(nextEventSlide, 8000);
};

const updateFooterYear = () => {
    const currentYear = new Date().getFullYear();
    const yearNodes = Array.from(document.querySelectorAll('[data-current-year], .js-current-year'));
    yearNodes.forEach(el => {
        el.textContent = String(currentYear);
    });

    const footerText = document.querySelector('footer p');
    if (footerText) {
        footerText.textContent = footerText.textContent.replace(/\d{4}/, String(currentYear));
    }
};

const toggleBackToTop = () => {
    if (!backToTopBtn) return;
    backToTopBtn.classList.toggle('show', window.scrollY > 300);
};

const initializeAccessibility = () => {
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeMobileNav();
        }

        if (event.key === 'ArrowUp' && event.ctrlKey) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
};

const initialize = () => {
    initializeNavigation();
    initializeSlideshow();
    initializeEventCarousel();
    setupContactForm();
    initializeObserver();
    enhanceImages();
    updateFooterYear();
    updateActiveNavLink();
    initializeAccessibility();

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    window.addEventListener('scroll', debounce(() => {
        updateActiveNavLink();
        toggleBackToTop();
    }, 80));

    window.addEventListener('error', event => {
        console.error('Script error:', event.message, 'at', `${event.filename}:${event.lineno}`);
    });

    window.addEventListener('unhandledrejection', event => {
        console.error('Unhandled promise rejection:', event.reason);
    });
};

document.addEventListener('DOMContentLoaded', initialize);
