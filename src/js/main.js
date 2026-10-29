// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();
        const target = document.querySelector(targetId);

        if (target) {
            const navHeight = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Depth gauge animation
const gaugeValue = document.getElementById('gauge-depth');
if (gaugeValue) {
    let currentDepth = 0;
    const targetDepth = 6000;
    const duration = 2000;
    const steps = 60;
    const increment = targetDepth / steps;
    const stepDuration = duration / steps;

    function animateDepth() {
        if (currentDepth < targetDepth) {
            currentDepth += increment;
            gaugeValue.textContent = Math.floor(currentDepth).toString();
            setTimeout(animateDepth, stepDuration);
        } else {
            gaugeValue.textContent = targetDepth.toString();
        }
    }

    // Start animation when gauge is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateDepth();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(gaugeValue.closest('.depth-gauge'));
}

// Product card entrance animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .cta-box').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    cardObserver.observe(card);
});

// Respect prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.product-card, .cta-box').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
        element.style.transition = 'none';
    });

    // Stop gauge animation
    if (gaugeValue) {
        gaugeValue.textContent = '6000';
    }
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});
