document.addEventListener('DOMContentLoaded', () => {
    // Setup interactive geometry background first
    setupGeometryBackground();
    
    // Setup typing effect
    setupTypingEffect();
    
    // Interactive profile card effects
    setupProfileInteractions();
    
    // Setup skill progress bars
    setupSkillProgress();
    
    // Setup project cards
    setupProjectCards();

    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    const moonIcon = themeToggle.querySelector('i');

    // 檢查本地存儲中的主題設置
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        moonIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // Theme toggle functionality
    function toggleTheme() {
        const body = document.body;
        const themeIcon = document.querySelector('.theme-toggle i');
        
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    // Initialize theme based on user preference
    function initializeTheme() {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            document.body.classList.add('dark-theme');
            document.querySelector('.theme-toggle i').classList.replace('fa-moon', 'fa-sun');
        }
    }

    // Call initialize theme when DOM is loaded
    initializeTheme();
});

function createTechParticles() {
    const container = document.querySelector('.tech-background');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('tech-particle');
        
        // Random positioning and sizing
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        container.appendChild(particle);
    }
}

function setupScrollAnimations() {
    const profileCard = document.querySelector('.profile-card');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const rotation = scrollPosition / 10;
        profileCard.style.transform = `rotateY(${rotation}deg)`;
    });
}

function setupProfileInteractions() {
    const profileImage = document.querySelector('.profile-image img');
    const techCircle = document.querySelector('.tech-circle');
    
    profileImage.addEventListener('mouseenter', () => {
        techCircle.style.border = '2px solid var(--secondary)';
        techCircle.style.animationDuration = '5s';
    });
    
    profileImage.addEventListener('mouseleave', () => {
        techCircle.style.border = '2px dashed var(--primary)';
        techCircle.style.animationDuration = '20s';
    });
    
    // Add ripple effect to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            link.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
}

function setupTypingEffect() {
    const text = "AI/Data Science Developer";
    const typingText = document.querySelector('.typing-text');
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                typingText.textContent = '';
                i = 0;
                typeWriter();
            }, 3000);
        }
    }
    
    typeWriter();
}

function setupSkillProgress() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const percentage = bar.textContent;
        bar.style.width = '0%';
        bar.textContent = '';
        
        setTimeout(() => {
            bar.style.width = percentage;
            bar.textContent = percentage;
        }, 500);
    });
}

function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

function setupGeometryBackground() {
    const canvas = document.getElementById('geometryBackground');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: undefined, y: undefined };
    let animationFrameId;

    // 設置 canvas 尺寸
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // 創建粒子類
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 2;
            this.baseSize = this.size;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.shape = Math.random() > 0.3 ? 'circle' : 'triangle';
            this.color = Math.random() > 0.5 ? '#6366f1' : '#8b5cf6';
            this.alpha = 0.3;
            this.baseAlpha = this.alpha;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // 檢查邊界
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;

            // 與滑鼠互動
            if (mouse.x !== undefined && mouse.y !== undefined) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const force = (120 - distance) / 120;
                    this.alpha = Math.min(0.8, this.baseAlpha + force * 0.5);
                    this.size = this.baseSize + force * 3;
                    this.x -= dx * 0.02 * force;
                    this.y -= dy * 0.02 * force;
                } else {
                    this.alpha = this.baseAlpha;
                    this.size = this.baseSize;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;

            if (this.shape === 'circle') {
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else {
                const size = this.size * 1.5;
                ctx.moveTo(this.x, this.y - size);
                ctx.lineTo(this.x - size, this.y + size);
                ctx.lineTo(this.x + size, this.y + size);
                ctx.closePath();
                ctx.fill();
            }
        }
    }

    // 初始化粒子
    function init() {
        particles = [];
        const particleCount = Math.min(150, (canvas.width * canvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // 動畫循環
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 繪製連接線
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.05;
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const alpha = (150 - distance) / 150 * 0.15;
                    ctx.globalAlpha = alpha;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                }
            }
        }
        ctx.stroke();

        // 更新和繪製粒子
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    // 事件監聽器
    window.addEventListener('resize', () => {
        resizeCanvas();
        init();
    });

    // 更新滑鼠事件監聽
    document.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    // 初始化
    resizeCanvas();
    init();
    animate();

    // 清理函數
    return () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    };
}

// Add styles for dynamically created elements
const style = document.createElement('style');
style.textContent = `
    .tech-particle {
        position: absolute;
        background-color: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.6;
        animation: floatTechParticle linear infinite;
    }
    
    @keyframes floatTechParticle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.9;
        }
        100% {
            transform: translateY(0) translateX(0);
            opacity: 0.6;
        }
    }
    
    .ripple {
        position: absolute;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .skills-section {
        margin-top: 50px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        backdrop-filter: blur(10px);
    }
    
    .skills-container {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 20px;
    }
    
    .skill-card {
        background: rgba(255, 255, 255, 0.1);
        padding: 20px;
        border-radius: 10px;
        width: 300px;
        transition: transform 0.3s ease;
    }
    
    .skill-card:hover {
        transform: translateY(-5px);
    }
    
    .skill-icon {
        font-size: 2em;
        margin-bottom: 10px;
        color: var(--primary);
    }
    
    .skill-progress {
        margin-top: 15px;
    }
    
    .progress-bar {
        height: 10px;
        background: var(--primary);
        margin: 10px 0;
        border-radius: 5px;
        transition: width 1s ease-in-out;
    }
    
    .projects-section {
        margin-top: 50px;
        padding: 20px;
    }
    
    .projects-carousel {
        display: flex;
        justify-content: center;
        gap: 30px;
        flex-wrap: wrap;
    }
    
    .project-card {
        width: 300px;
        height: 200px;
        perspective: 1000px;
        cursor: pointer;
    }
    
    .project-front, .project-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        transition: transform 0.6s;
        border-radius: 10px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .project-back {
        transform: rotateY(180deg);
    }
    
    .project-card.flipped .project-front {
        transform: rotateY(180deg);
    }
    
    .project-card.flipped .project-back {
        transform: rotateY(0);
    }
    
    .project-link {
        margin-top: 15px;
        padding: 8px 15px;
        background: var(--primary);
        color: white;
        border-radius: 5px;
        text-decoration: none;
        transition: background 0.3s;
    }
    
    .project-link:hover {
        background: var(--secondary);
    }
    
    .typing-text {
        display: inline-block;
        border-right: 2px solid var(--primary);
        animation: blink 0.75s step-end infinite;
    }
    
    @keyframes blink {
        from, to { border-color: transparent }
        50% { border-color: var(--primary) }
    }
`;
document.head.appendChild(style);
