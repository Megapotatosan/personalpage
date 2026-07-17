document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupTypingEffect();
    setupScrollAnimations();
});

// ===== Theme =====

function toggleTheme() {
    const html = document.documentElement;
    const icon = document.querySelector('.theme-toggle i');
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    icon.className = next === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

function initializeTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    const icon = document.querySelector('.theme-toggle i');
    icon.className = saved === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// ===== Typing Effect =====

function setupTypingEffect() {
    const phrases = [
        'intelligent systems.',
        'ML pipelines.',
        'data-driven solutions.',
        'AI-powered products.',
    ];
    const el = document.querySelector('.typing-text');
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
        const phrase = phrases[phraseIndex];
        if (!deleting) {
            el.textContent = phrase.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === phrase.length) {
                deleting = true;
                setTimeout(tick, 2200);
                return;
            }
        } else {
            el.textContent = phrase.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }
        setTimeout(tick, deleting ? 45 : 85);
    }

    tick();
}

// ===== Scroll Animations =====

function setupScrollAnimations() {
    const observer = new IntersectionObserver(
        entries => entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        }),
        { threshold: 0.08 }
    );

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
