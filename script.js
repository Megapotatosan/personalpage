document.addEventListener('DOMContentLoaded', () => {
    // Setup interactive geometry background
    setupGeometryBackground();
    
    // Setup typing effect
    setupTypingEffect();
    
    // Interactive profile card effects
    setupProfileInteractions();
    
    // Setup theme toggling
    setupThemeToggle();
});

function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = document.querySelector('.theme-toggle i');

    // 檢查本地存儲中的主題設置
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // 點擊切換主題
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

function setupGeometryBackground() {
    const canvas = document.getElementById('geometryBackground');
    if (!canvas) return;
    
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
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            
            if (this.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // 繪製三角形
                ctx.beginPath();
                ctx.moveTo(this.x, this.y - this.size);
                ctx.lineTo(this.x - this.size, this.y + this.size);
                ctx.lineTo(this.x + this.size, this.y + this.size);
                ctx.closePath();
                ctx.fill();
            }
            
            ctx.restore();
        }
    }

    function init() {
        particles = [];
        resizeCanvas();
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        animationFrameId = requestAnimationFrame(animate);
    }

    // 事件監聽器
    window.addEventListener('resize', () => {
        init();
    });

    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    // 初始化和啟動動畫
    init();
    animate();
}

function setupProfileInteractions() {
    const profileCard = document.querySelector('.profile-card');
    if (!profileCard) return;
    
    // 添加鼠標移動效果
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 計算旋轉角度（最大 5 度）
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = -((y - centerY) / centerY) * 5;
        const rotateY = ((x - centerX) / centerX) * 5;
        
        profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // 鼠標離開時重置
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
    
    // 添加漣漪效果到社交鏈接
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
    const textElement = document.querySelector('.typing-text');
    if (!textElement) return;
    
    const text = "AI/Data Science Developer";
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            textElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                textElement.textContent = '';
                i = 0;
                typeWriter();
            }, 3000);
        }
    }
    
    typeWriter();
}

// 公開函數以便在HTML中調用
function toggleTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.click();
    }
}
