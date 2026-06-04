/* ============================================
   D'LYR — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const burgerBtn = document.getElementById('burger-btn');
    const navOverlay = document.getElementById('nav-overlay');
    const navClose = document.getElementById('nav-close');
    const navBackdrop = document.getElementById('nav-backdrop');
    const navLinks = document.querySelectorAll('.nav-overlay__link');

    // --- Navigation Toggle ---
    function openNav() {
        navOverlay.classList.add('is-open');
        navOverlay.setAttribute('aria-hidden', 'false');
        burgerBtn.classList.add('is-active');
        burgerBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        navOverlay.classList.remove('is-open');
        navOverlay.setAttribute('aria-hidden', 'true');
        burgerBtn.classList.remove('is-active');
        burgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    burgerBtn.addEventListener('click', () => {
        const isOpen = navOverlay.classList.contains('is-open');
        if (isOpen) {
            closeNav();
        } else {
            openNav();
        }
    });

    navClose.addEventListener('click', closeNav);
    navBackdrop.addEventListener('click', closeNav);

    // Close nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeNav();
        });
    });

    // Close nav with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navOverlay.classList.contains('is-open')) {
            closeNav();
        }
    });

    // --- Header scroll effect ---
    const header = document.getElementById('header');
    let lastScrollY = 0;

    function handleScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 80) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // --- Subtle parallax on hero title ---
    const heroTitle = document.getElementById('hero-title');
    
    if (heroTitle) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = window.innerHeight;
            
            if (scrollY < heroHeight) {
                const progress = scrollY / heroHeight;
                heroTitle.style.transform = `translateY(${scrollY * 0.3}px) scale(${1 - progress * 0.1})`;
                heroTitle.style.opacity = 1 - progress * 0.8;
            }
        }, { passive: true });
    }

});
