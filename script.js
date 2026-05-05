// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Update navbar active state on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
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

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Pricing toggle
function togglePricing() {
    const toggle = document.querySelector('.toggle-btn');
    const prices = document.querySelectorAll('.price');
    
    toggle.classList.toggle('active');
    toggle.style.backgroundColor = toggle.classList.contains('active') ? '#667eea' : '#e2e8f0';
    toggle.querySelector(':after').style.left = toggle.classList.contains('active') ? '30px' : '2px';
    
    // Toggle price display (annual/monthly)
    prices.forEach(price => {
        const currentPrice = price.textContent;
        if (currentPrice.includes('29')) {
            price.innerHTML = '<span>/month</span>';
            price.innerHTML = '232<span>/year</span>';
        } else if (currentPrice.includes('232')) {
            price.innerHTML = '29<span>/month</span>';
        } else if (currentPrice.includes('79')) {
            price.innerHTML = '632<span>/year</span>';
        } else if (currentPrice.includes('632')) {
            price.innerHTML = '79<span>/month</span>';
        }
    });
}

// Parallax effect for hero illustration
window.addEventListener('mousemove', (e) => {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        const moveX = (e.clientX / window.innerWidth) * 20;
        const moveY = (e.clientY / window.innerHeight) * 20;
        heroVisual.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Observe counter elements when they come into view
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.getAttribute('data-count'));
            animateCounter(entry.target, target);
        }
    });
});

counters.forEach(counter => counterObserver.observe(counter));

// Form submission (placeholder)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thanks for your interest! Check your email for confirmation.');
        form.reset();
    });
});

console.log('🚀 Origin landing page loaded successfully!');