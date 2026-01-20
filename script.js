// Scroll-based Frame Animation with lazy loading
const frameCount = 240;
const frameAnimation = {
    canvas: null,
    context: null,
    frames: [], // Cache for loaded frames
    currentFrame: 0,
    loadingFrames: new Set(), // Track frames currently loading

    init() {
        this.canvas = document.getElementById('frame-animation');
        if (!this.canvas) return;

        this.context = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Initialize frame array
        this.frames = new Array(frameCount);

        // Preload first few frames for immediate display
        this.preloadFrames(1, Math.min(10, frameCount));

        // Handle window resize
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.render();
        });

        // Handle scroll
        window.addEventListener('scroll', () => {
            this.updateFrame();
        });

        // Initial render
        this.updateFrame();
    },

    preloadFrames(start, end) {
        for (let i = start; i <= end; i++) {
            if (this.frames[i - 1] || this.loadingFrames.has(i)) continue;
            this.loadFrame(i);
        }
    },

    loadFrame(frameNumber) {
        if (this.frames[frameNumber - 1] || this.loadingFrames.has(frameNumber)) {
            return;
        }

        this.loadingFrames.add(frameNumber);
        const img = new Image();
        const paddedNumber = frameNumber.toString().padStart(3, '0');
        img.src = `frames/ezgif-frame-${paddedNumber}.jpg`;

        img.onload = () => {
            this.frames[frameNumber - 1] = img;
            this.loadingFrames.delete(frameNumber);
            if (frameNumber === this.currentFrame + 1) {
                this.render();
            }
        };

        img.onerror = () => {
            console.warn(`Failed to load frame ${paddedNumber}`);
            this.loadingFrames.delete(frameNumber);
        };
    },

    updateFrame() {
        const scrollTop = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(scrollFraction * frameCount)
        );

        if (frameIndex !== this.currentFrame) {
            this.currentFrame = frameIndex;
            
            // Load current frame and nearby frames
            const loadRange = 5; // Load 5 frames ahead and behind
            const startFrame = Math.max(1, frameIndex + 1 - loadRange);
            const endFrame = Math.min(frameCount, frameIndex + 1 + loadRange);
            this.preloadFrames(startFrame, endFrame);
            
            this.render();
        }
    },

    render() {
        if (!this.context) return;

        const img = this.frames[this.currentFrame];
        if (!img || !img.complete) {
            // Show placeholder or previous frame if current isn't loaded
            return;
        }

        // Clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Calculate dimensions to cover the canvas while maintaining aspect ratio
        const canvasAspect = this.canvas.width / this.canvas.height;
        const imgAspect = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
            drawWidth = this.canvas.width;
            drawHeight = this.canvas.width / imgAspect;
            offsetX = 0;
            offsetY = (this.canvas.height - drawHeight) / 2;
        } else {
            drawHeight = this.canvas.height;
            drawWidth = this.canvas.height * imgAspect;
            offsetX = (this.canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        // Draw image
        this.context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
};

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
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
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// Intersection Observer for scroll animations
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

// Observe all feature cards, steps, and other animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .step, .subject-category, .pricing-card, .faq-item, .contact-item'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);

    // Show success message
    alert('Thank you for your message! We will get back to you soon.');

    // Reset form
    contactForm.reset();
});

// Download button handlers
const iosDownload = document.getElementById('ios-download');
const androidDownload = document.getElementById('android-download');

iosDownload.addEventListener('click', (e) => {
    e.preventDefault();
    // Check if App Store link is available
    const appStoreLink = 'https://apps.apple.com/'; // Replace with actual link when available

    // For now, show a message
    alert('iOS App Store approval is pending. Please check back soon or contact us for direct download options.');

    // Uncomment when App Store link is available:
    // window.open(appStoreLink, '_blank');
});

androidDownload.addEventListener('click', (e) => {
    e.preventDefault();
    // Check if Play Store link is available
    const playStoreLink = 'https://play.google.com/store/apps/'; // Replace with actual link when available

    // For now, show a message
    alert('Google Play Store approval is pending. Please check back soon or contact us for direct download options.');

    // Uncomment when Play Store link is available:
    // window.open(playStoreLink, '_blank');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-img');

    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effect to pricing cards
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('best-value')) {
            card.style.transform = 'scale(1.05)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Animate numbers on scroll (for stats if needed)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add gradient animation to hero orbs
const orbs = document.querySelectorAll('.gradient-orb');

orbs.forEach((orb, index) => {
    setInterval(() => {
        const randomX = Math.random() * 50 - 25;
        const randomY = Math.random() * 50 - 25;
        orb.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 3000 + index * 1000);
});

// Add typing effect to hero title (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize on page load
window.addEventListener('load', () => {
    // Initialize frame animation
    frameAnimation.init();

    // Add any initialization code here
    console.log('NerdX Landing Page Loaded Successfully!');

    // Add entrance animation to hero
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease';
            heroContent.style.opacity = '1';
        }, 100);
    }

    if (heroImage) {
        heroImage.style.opacity = '0';
        setTimeout(() => {
            heroImage.style.transition = 'opacity 1s ease';
            heroImage.style.opacity = '1';
        }, 300);
    }
});

// Add cursor trail effect (optional premium touch)
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');

        // Close all FAQ items
        faqItems.forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Add loading animation
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}
