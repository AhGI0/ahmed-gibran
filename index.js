        document.addEventListener('DOMContentLoaded', () => {
            // Theme toggle
            const themeToggle = document.querySelector('.theme-toggle');
            const themeIcon = document.querySelector('.theme-icon');
            const themeText = document.querySelector('.theme-text');

            function toggleTheme() {
                const body = document.body;
                body.classList.toggle('dark-mode');

                if (body.classList.contains('dark-mode')) {
                    themeIcon.textContent = '☀️';
                    themeText.textContent = 'Light';
                } else {
                    themeIcon.textContent = '🌙';
                    themeText.textContent = 'Dark';
                }
            }

            // Attach event listener for theme toggle
            themeToggle.addEventListener('click', toggleTheme);

            // Mobile menu toggle
            const mobileMenu = document.querySelector('.mobile-menu');
            const navLinks = document.querySelector('.nav-links');

            mobileMenu.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            navLinks.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                const nav = document.querySelector('nav');
                if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            });

            // Smooth scroll for navigation links
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

            // IntersectionObserver for fade-in animations
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe all fade-in elements
            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

            // Header background change on scroll
            window.addEventListener('scroll', () => {
                const header = document.querySelector('header');
                const isDarkMode = document.body.classList.contains('dark-mode');
                
                if (window.scrollY > 100) {
                    header.style.background = isDarkMode ? 
                        'rgba(15, 20, 25, 0.98)' : 
                        'rgba(255, 255, 255, 0.98)';
                } else {
                    header.style.background = isDarkMode ? 
                        'rgba(15, 20, 25, 0.95)' : 
                        'rgba(255, 255, 255, 0.95)';
                }
            });

            // Touch gestures for mobile menu
            let touchStartX = 0;
            let touchEndX = 0;

            document.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            document.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                const swipeThreshold = 50;
                const swipeDistance = touchEndX - touchStartX;

                // Swipe right to open menu (from left edge)
                if (swipeDistance > swipeThreshold && touchStartX < 50 && !navLinks.classList.contains('active')) {
                    navLinks.classList.add('active');
                    mobileMenu.classList.add('active');
                }

                // Swipe left to close menu
                if (swipeDistance < -swipeThreshold && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            }

            // Keyboard navigation for accessibility
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            });

            // Prevent body scroll when mobile menu is open
            const body = document.body;
            const toggleBodyScroll = () => {
                if (navLinks.classList.contains('active')) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = 'auto';
                }
            };

            // Update body scroll when menu state changes
            const menuObserver = new MutationObserver(toggleBodyScroll);
            menuObserver.observe(navLinks, { attributes: true, attributeFilter: ['class'] });

            // Resize handler to close mobile menu on desktop
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    body.style.overflow = 'auto';
                }
            });
        });