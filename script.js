// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.navbar').forEach(navbar => {
        const hamburger = navbar.querySelector('.hamburger');
        const navMenu = navbar.querySelector('.nav-menu');
        const navClose = navbar.querySelector('.nav-close');
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
        if (navClose && navMenu && hamburger) {
            navClose.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        }
        navbar.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
                }
            });
        });
    });
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission (replace with actual form handling)
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .stat');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Set initial body opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// --- Landing Overlay Animation and Logic ---
window.addEventListener('DOMContentLoaded', () => {
    // Prevent scroll while landing is active
    document.body.classList.add('landing-active');

    // Falling lines animation
    const canvas = document.getElementById('landing-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w = window.innerWidth;
        let h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;

        // Falling lines config
        const lines = [];
        const lineCount = Math.floor(w / 60) + 10;
        for (let i = 0; i < lineCount; i++) {
            lines.push({
                x: Math.random() * w,
                y: Math.random() * h,
                len: 80 + Math.random() * 60,
                speed: 2 + Math.random() * 3,
                alpha: 0.2 + Math.random() * 0.4
            });
        }

        function drawLines() {
            ctx.clearRect(0, 0, w, h);
            ctx.save();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            for (let line of lines) {
                ctx.globalAlpha = line.alpha;
                ctx.beginPath();
                ctx.moveTo(line.x, line.y);
                ctx.lineTo(line.x, line.y + line.len);
                ctx.stroke();
                line.y += line.speed;
                if (line.y > h) {
                    line.y = -line.len;
                    line.x = Math.random() * w;
                }
            }
            ctx.restore();
            requestAnimationFrame(drawLines);
        }
        drawLines();

        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        });
    }

    // Enter button logic
    const enterBtn = document.getElementById('enter-btn');
    const landingOverlay = document.getElementById('landing-overlay');
    const mainContent = document.getElementById('main-content');
    if (enterBtn && landingOverlay && mainContent) {
        enterBtn.addEventListener('click', () => {
            landingOverlay.classList.add('fade-out');
            setTimeout(() => {
                landingOverlay.style.display = 'none';
                mainContent.style.display = '';
                setTimeout(() => {
                    mainContent.classList.add('visible');
                }, 10);
                document.body.classList.remove('landing-active');
            }, 700);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dropdown-header').forEach(function(header) {
        header.addEventListener('click', function() {
            const card = this.parentElement;
            card.classList.toggle('open');
        });
    });
}); 