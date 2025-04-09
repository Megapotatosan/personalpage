document.addEventListener('DOMContentLoaded', () => {
    // Tech-style particle background
    createTechParticles();
    
    // Animate elements on scroll
    setupScrollAnimations();
    
    // Interactive profile card effects
    setupProfileInteractions();
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
`;
document.head.appendChild(style);
