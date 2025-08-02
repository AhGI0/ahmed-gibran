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

        // Fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Mobile menu toggle (basic implementation)
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Header background on scroll
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

        // Dark mode toggle functionality
        function toggleTheme() {
            const body = document.body;
            const themeIcon = document.querySelector('.theme-icon');
            const themeText = document.querySelector('.theme-text');
            
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                themeIcon.textContent = '☀️';
                themeText.textContent = 'Light';
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.textContent = '🌙';
                themeText.textContent = 'Dark';
                localStorage.setItem('theme', 'light');
            }
        }

        // Load saved theme on page load
        document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme');
            const themeIcon = document.querySelector('.theme-icon');
            const themeText = document.querySelector('.theme-text');
            
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
                themeIcon.textContent = '☀️';
                themeText.textContent = 'Light';
            }
        });