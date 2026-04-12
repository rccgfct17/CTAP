// Mobile Menu Toggle
document.getElementById('navToggle')?.addEventListener('click', () => {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});

// Form Submission
document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const message = document.getElementById('message')?.value;
    
    if (name && email && message) {
        document.getElementById('formMsg').textContent = 'Thank you — we will get back to you soon.';
        e.target.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});