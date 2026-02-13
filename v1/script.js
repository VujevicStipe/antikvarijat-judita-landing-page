/* ========================================
   ANTIKVARIJAT JUDITA - PAPIRNATNI SVIJET
   Interactive JavaScript & GSAP Animations
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

console.log('📚 Antikvarijat Judita - GSAP Loaded');

// ========================================
// MOBILE MENU TOGGLE
// ========================================

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Animate hamburger with GSAP
        const hamburger = menuToggle.querySelector('.hamburger');
        if (isExpanded) {
            gsap.to(hamburger, {
                rotation: 45,
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            gsap.to(hamburger, {
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            const hamburger = menuToggle.querySelector('.hamburger');
            gsap.to(hamburger, {
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
    
    // Close menu on navigation link click
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            const hamburger = menuToggle.querySelector('.hamburger');
            gsap.to(hamburger, {
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav-paper').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

const navbar = document.querySelector('.nav-paper');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll with GSAP
    if (currentScroll > 50) {
        gsap.to(navbar, {
            boxShadow: '0 4px 20px rgba(44, 37, 32, 0.15)',
            duration: 0.3
        });
    } else {
        gsap.to(navbar, {
            boxShadow: '0 4px 12px rgba(44, 37, 32, 0.08)',
            duration: 0.3
        });
    }
});

// ========================================
// HERO ANIMATIONS - NOTEBOOK STYLE
// ========================================

// Set initial state for all elements
gsap.set('.notebook-container', { opacity: 0, scale: 0.9, rotation: -2 });
gsap.set('.date-stamp', { opacity: 0, scale: 0, rotation: -45 });
gsap.set('.handwritten-title', { opacity: 0, y: 30 });
gsap.set('.handwritten-text p', { opacity: 0, x: -30 });
gsap.set('.btn-notebook', { opacity: 0, y: 20 });
gsap.set('.side-pencil', { opacity: 0, x: 100, rotation: 45 });
gsap.set('.hole', { scale: 0 });
gsap.set('.doodle', { opacity: 0, scale: 0, rotation: -180 });

// Create timeline for hero animations
const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTimeline
    .to('.notebook-container', {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: 'back.out(1.3)'
    })
    .to('.hole', {
        scale: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    }, '-=0.5')
    .to('.date-stamp', {
        opacity: 1,
        scale: 1,
        rotation: -1,
        duration: 0.6,
        ease: 'back.out(1.7)'
    }, '-=0.2')
    .to('.handwritten-title', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.2')
    .to('.handwritten-text p', {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15
    }, '-=0.4')
    .to('.btn-notebook', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.5)'
    }, '-=0.2')
    .to('.side-pencil', {
        opacity: 1,
        x: 0,
        rotation: -15,
        duration: 1,
        ease: 'back.out(1.5)'
    }, '-=0.5')
    .to('.doodle', {
        opacity: 0.4,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.5)'
    }, '-=0.5');

// ========================================
// SCROLL-TRIGGERED REVEAL ANIMATIONS
// ========================================

// Info Cards
const cards = document.querySelectorAll('.info-cards .card');
cards.forEach((card, index) => {
    gsap.fromTo(card, 
        {
            opacity: 0,
            y: 80,
            rotation: -5
        },
        {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.8,
            ease: 'back.out(1.4)',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Card hover effects with GSAP
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.05,
            rotation: -2,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ========================================
// HOW IT WORKS - STEPS ANIMATION
// ========================================

const steps = document.querySelectorAll('.step');
steps.forEach((step, index) => {
    // Animate the entire step
    gsap.fromTo(step,
        {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100
        },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Animate step number separately
    const stepNumber = step.querySelector('.number-bg');
    if (stepNumber) {
        gsap.fromTo(stepNumber,
            {
                scale: 0.5,
                rotation: -180,
                opacity: 0
            },
            {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: step,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
});

// ========================================
// BUY & SELL SECTION ANIMATIONS
// ========================================

// Split content animation
const splitContent = document.querySelector('.split-content');
if (splitContent) {
    gsap.fromTo(splitContent,
        {
            opacity: 0,
            x: -100
        },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: splitContent,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// Feature items stagger
const featureItems = document.querySelectorAll('.feature-item');
featureItems.forEach((item, index) => {
    gsap.fromTo(item,
        {
            opacity: 0,
            x: -50
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.feature-list',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Visual card animation
const visualCard = document.querySelector('.visual-card');
if (visualCard) {
    gsap.fromTo(visualCard,
        {
            opacity: 0,
            scale: 0.8,
            rotation: 5
        },
        {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: 'back.out(1.5)',
            scrollTrigger: {
                trigger: visualCard,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// Stat items animation
const statItems = document.querySelectorAll('.stat-item');
statItems.forEach((stat, index) => {
    gsap.fromTo(stat,
        {
            opacity: 0,
            scale: 0.8
        },
        {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.visual-card',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Stat numbers counter animation
const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach((stat) => {
    const finalValue = stat.textContent;
    const isPercentage = finalValue.includes('%');
    const isPlus = finalValue.includes('+');
    const numValue = parseInt(finalValue.replace(/[^\d]/g, ''));
    
    if (!isNaN(numValue)) {
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
                let obj = { val: 0 };
                gsap.to(obj, {
                    val: numValue,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function() {
                        let displayValue = Math.ceil(obj.val);
                        if (isPercentage) {
                            stat.textContent = displayValue + '%';
                        } else if (isPlus) {
                            stat.textContent = displayValue + '+';
                        } else {
                            stat.textContent = displayValue;
                        }
                    }
                });
            }
        });
    }
});

// Decoration elements float
const decoElements = document.querySelectorAll('.deco-element');
decoElements.forEach((deco, index) => {
    gsap.to(deco, {
        y: -15,
        duration: 2.5,
        delay: index * 0.3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
    });
});

// ========================================
// ABOUT SECTION ANIMATION
// ========================================

const aboutContent = document.querySelector('.about-content');
if (aboutContent) {
    gsap.fromTo(aboutContent,
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: aboutContent,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// ========================================
// CONTACT SECTION ANIMATIONS
// ========================================

// Info cards animation
const infoCards = document.querySelectorAll('.info-card');
infoCards.forEach((card, index) => {
    gsap.fromTo(card,
        {
            opacity: 0,
            y: 50,
            rotation: -3
        },
        {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.3)',
            scrollTrigger: {
                trigger: '.contact-info',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Hover effect
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -8,
            boxShadow: '8px 8px 0 rgba(44, 37, 32, 0.08)',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            boxShadow: '5px 5px 0 rgba(44, 37, 32, 0.08)',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Map animation
const mapContainer = document.querySelector('.map-container');
if (mapContainer) {
    gsap.fromTo(mapContainer,
        {
            opacity: 0,
            scale: 0.9
        },
        {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: mapContainer,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// ========================================
// FOOTER ANIMATIONS
// ========================================

const footerLinks = document.querySelectorAll('.footer-menu li, .footer-contact li');
footerLinks.forEach((link, index) => {
    gsap.fromTo(link,
        {
            opacity: 0,
            x: -20
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: index * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.footer-paper',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// ========================================
// MAGNETIC BUTTON EFFECT
// ========================================

const magneticButtons = document.querySelectorAll('.magnetic-btn, .btn-notebook');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(button, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// ========================================
// SCROLL INDICATOR PULSE
// ========================================

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    gsap.to(scrollIndicator, {
        opacity: 0.5,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
    });
    
    // Hide on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            gsap.to(scrollIndicator, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        } else {
            gsap.to(scrollIndicator, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    });
}

// ========================================
// SECTION HEADER ANIMATIONS
// ========================================

const sectionHeaders = document.querySelectorAll('.section-header');
sectionHeaders.forEach(header => {
    gsap.fromTo(header,
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// ========================================
// PARALLAX EFFECTS
// ========================================

// Subtle parallax for sections
const parallaxSections = document.querySelectorAll('.buy-sell, .about-section');
parallaxSections.forEach(section => {
    gsap.to(section, {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });
});

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Pause animations for users who prefer reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.pause();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('user-is-tabbing');
});

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c📚 Antikvarijat Judita', 'font-size: 20px; font-weight: bold; color: #FF6B6B;');
console.log('%cUštedite do 50% na školskim udžbenicima!', 'font-size: 14px; color: #5A4F47;');
console.log('%cWeb design by Perica • 2026 Paper World Concept', 'font-size: 12px; color: #8B8179;');
console.log('%c✨ GSAP Animations Active!', 'font-size: 14px; font-weight: bold; color: #7FB069;');

// ========================================
// PAGE LOAD COMPLETE
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
    console.log('%c✓ Page fully loaded!', 'color: #7FB069; font-weight: bold;');
});

}); // End of DOMContentLoaded
