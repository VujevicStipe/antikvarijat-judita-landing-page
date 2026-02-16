document.addEventListener('DOMContentLoaded', function() {

document.querySelectorAll('img[title]').forEach(img => {
    img.dataset.title = img.title;
    img.removeAttribute('title');
});

const navEl = document.querySelector('.nav-paper');
function setNavHeight() {
    if (navEl) {
        document.documentElement.style.setProperty('--nav-height', navEl.offsetHeight + 'px');
    }
}
setNavHeight();
window.addEventListener('resize', setNavHeight);

gsap.registerPlugin(ScrollTrigger);

const bentoItems = document.querySelectorAll('.bento-item');
const hiddenContainer = document.getElementById('galleryHidden');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');
let currentIndex = 0;
const images = [];

if (bentoItems.length && lightbox) {
    bentoItems.forEach((item, i) => {
        const img = item.querySelector('img');
        images.push({ src: img.src, alt: img.alt });
        item.addEventListener('click', () => openLightbox(i));
    });

    if (hiddenContainer) {
        hiddenContainer.querySelectorAll('img').forEach(img => {
            images.push({ src: img.src, alt: img.alt });
        });
    }

    const moreCount = document.getElementById('bentoMoreCount');
    if (moreCount) {
        const hiddenCount = images.length - bentoItems.length + 1;
        moreCount.textContent = '+' + hiddenCount;
    }

    function openLightbox(index) {
        currentIndex = index;
        showImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showImage() {
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            const img = images[currentIndex];
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCounter.textContent = (currentIndex + 1) + ' / ' + images.length;
            lightboxImg.style.opacity = '1';
        }, 150);
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage();
    }

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-next').addEventListener('click', nextImage);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    let touchStartX = 0;
    let touchStartY = 0;
    let swiping = false;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        swiping = true;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        if (!swiping) return;
        const diffX = touchStartX - e.changedTouches[0].screenX;
        const diffY = Math.abs(e.changedTouches[0].screenY - touchStartY);
        if (diffY > Math.abs(diffX)) return;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) nextImage();
            else prevImage();
        }
        swiping = false;
    }, { passive: true });
}

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });
    
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav-paper').offsetHeight;
            window.scrollTo({
                top: target.offsetTop - navHeight - 20,
                behavior: 'smooth'
            });
        }
    });
});

const navbar = document.querySelector('.nav-paper');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(44, 37, 32, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 12px rgba(44, 37, 32, 0.08)';
    }
    
    lastScroll = currentScroll;
});

if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

    gsap.set(['.badge', '.main-title', '.lead-text', '.cta-buttons'], { opacity: 0, y: 20 });
    gsap.set('.hero-image', { opacity: 0, scale: 0.95 });
    
    heroTimeline
        .to('.badge', { opacity: 1, y: 0, duration: 0.6 })
        .to('.main-title', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to('.lead-text', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to('.cta-buttons', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to('.hero-image', { opacity: 1, scale: 1, duration: 0.8 }, '-=0.4');

    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        gsap.from(header, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                once: true
            }
        });
    });

    const stickyNotes = document.querySelectorAll('.sticky-note');
    stickyNotes.forEach((note, index) => {
        gsap.from(note, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: '.notebook-steps',
                start: 'top 75%',
                once: true
            }
        });
    });

    const sellCols = document.querySelectorAll('.sell-col');
    sellCols.forEach((col, index) => {
        gsap.from(col, {
            opacity: 0,
            x: index === 0 ? -30 : 30,
            duration: 0.7,
            scrollTrigger: {
                trigger: '.sell-columns',
                start: 'top 75%',
                once: true
            }
        });
    });
}

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        scrollIndicator.style.opacity = window.pageYOffset > 100 ? '0' : '0.6';
    });
}

const nameInput = document.getElementById('name');
if (nameInput) {
    nameInput.addEventListener('blur', function() {
        this.value = this.value.replace(/\b\w/g, c => c.toUpperCase());
    });
}

const messageInput = document.getElementById('message');
if (messageInput) {
    messageInput.addEventListener('input', function() {
        const pos = this.selectionStart;
        this.value = this.value
            .replace(/^\s*\w/, c => c.toUpperCase())
            .replace(/\.\s+\w/g, c => c.toUpperCase());
        this.setSelectionRange(pos, pos);
    });
}

emailjs.init('f9ShUie6D8zh0SBDx');

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailInput.value.trim())) {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Molimo unesite ispravnu email adresu.';
            emailInput.focus();
            setTimeout(() => { formMessage.className = 'form-message'; }, 4000);
            return;
        }

        const formData = {
            name: document.getElementById('name').value,
            email: emailInput.value.trim(),
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Šaljem...</span>';

        try {
            await emailjs.send('service_os2d9gv', 'template_9cjnr5f', formData);

            await emailjs.send('service_os2d9gv', 'template_rrolbbt', formData);

            formMessage.className = 'form-message success';
            formMessage.textContent = '✓ Hvala! Tvoja poruka je uspješno poslana. Javit ćemo ti se uskoro!';
            contactForm.reset();

            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 5000);
        } catch (error) {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Greška pri slanju poruke. Pokušaj ponovo ili nas kontaktiraj telefonom.';
            console.error('EmailJS error:', error);

            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 5000);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.pause();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

});
