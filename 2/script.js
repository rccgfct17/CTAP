// Mobile Menu Toggle
const burger = document.getElementById('burger');
const nav = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Simple Navbar Scroll Effect
window.onscroll = function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#002266'; // Darker blue on scroll
    } else {
        navbar.style.background = '#003399';
    }
};