        document.addEventListener('DOMContentLoaded', () => {
    // === Typing effect for subtitle ===
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, 70);
            }
        };
        type();
    }

    // === Theme toggle ===
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    function toggleTheme() {
        const body = document.body;
        body.classList.toggle('dark-mode');
        body.style.transition = 'background-color 0.5s ease';

        if (body.classList.contains('dark-mode')) {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light';
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark';
        }
    }
    themeToggle.addEventListener('click', toggleTheme);

    // === Mobile menu toggle ===
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('nav');
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // === Smooth scroll ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // === Fade-in animations ===
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // === Scroll progress bar ===
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '4px';
    progressBar.style.background = '#4f46e5';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.2s ease';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // === Auto-highlight active section in nav ===
    const sections = document.querySelectorAll('main section');
    const navItems = document.querySelectorAll('.nav-links a');
    const highlightNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) current = section.getAttribute('id');
        });
        navItems.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-link');
            }
        });
    };
    window.addEventListener('scroll', highlightNav);

    // === Floating tech keywords simulation ===
    const keywords = ['React', 'Node.js', 'AI', 'AWS', 'JavaScript', 'CSS', 'Python', 'Docker'];
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-1';
    document.body.appendChild(container);

    function createKeyword() {
        const el = document.createElement('span');
        el.textContent = keywords[Math.floor(Math.random() * keywords.length)];
        el.style.position = 'absolute';
        el.style.left = Math.random() * 100 + '%';
        el.style.top = Math.random() * 100 + '%';
        el.style.color = 'rgba(79, 70, 229, 0.15)';
        el.style.fontSize = (Math.random() * 20 + 14) + 'px';
        el.style.fontWeight = 'bold';
        el.style.userSelect = 'none';
        el.style.animation = `float ${5 + Math.random() * 5}s linear infinite`;
        container.appendChild(el);
        setTimeout(() => el.remove(), 10000);
    }
    setInterval(createKeyword, 1000);

    // === Floating animation keyframes ===
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0) rotate(0deg); }
        }
        .active-link {
            color: #4f46e5;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
});