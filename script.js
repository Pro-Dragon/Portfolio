// Navbar hide on scroll down, show on scroll up
(function () {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastY = window.scrollY;
    let ticking = false;
    const SHOW_THRESHOLD = 10; // always show near top

    function onScroll() {
        const currentY = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                // If scrolled down and past threshold, hide; otherwise show
                if (currentY > lastY && currentY > SHOW_THRESHOLD) {
                    navbar.classList.add('nav-hidden');
                } else {
                    navbar.classList.remove('nav-hidden');
                }
                lastY = currentY;
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ===== MOBILE NAV TOGGLE ===== */
(() => {
    const navbar = document.querySelector('.navbar');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelectorAll('.nav-link');

    if (!navbar || !toggle) return;

    toggle.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.forEach((link) => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('nav-open')) {
                navbar.classList.remove('nav-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
})();
/* ===== PROFESSIONAL BUTTER-SMOOTH SCROLL (Framer/Vercel Standard) ===== */
const heroImage = document.querySelector(".page1-hero");
const heroText = document.querySelector(".page1-text");
const heroHeading = document.querySelector(".extrude");
const heroCTA = document.querySelector(".hero-bottom-right");
const page1 = document.querySelector(".page-1");
const parallax = document.querySelectorAll(".home-parallax");
let scrollPosition = 0;
let lastScrollPosition = 0;
let ticking = false;
let mouseX = 0;
let mouseY = 0;

// Cache elements
const elements = {
    image: heroImage,
    text: heroText,
    heading: heroHeading,
    cta: heroCTA
};

// High-performance scroll with RAF throttling
window.addEventListener("scroll", () => {
    scrollPosition = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

function updateParallax() {
    // Only update if scroll position changed
    if (lastScrollPosition !== scrollPosition && scrollPosition < window.innerHeight) {
        const imageOffset = scrollPosition * 0.3;
        const textOffset = scrollPosition * 0.05;
        // Disable parallax on the hero bottom-right (typewriter/resume block)
        const ctaOffset = 0;
        
        // Batch DOM updates - write all at once
        if (elements.image) {
            elements.image.style.transform = `translate3d(-50%, ${imageOffset}px, 0) rotate(-5deg)`;
        }
        
        if (elements.text) {
            elements.text.style.transform = `translate3d(-50%, ${textOffset}px, 0)`;
        }
        
        lastScrollPosition = scrollPosition;
    }
    
    ticking = false;
}

/* ===== CUSTOM CURSOR ===== */
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';

let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;

// Wait for body to be ready
if (document.body) {
    document.body.appendChild(cursor);
} else {
    document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(cursor);
    });
}

// Initialize cursor at center
cursor.style.transform = `translate3d(${cursorX - 15}px, ${cursorY - 15}px, 0)`;

let cursorTicking = false;
let cursorRAF = null;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    if (!cursorTicking) {
        cursorRAF = requestAnimationFrame(() => {
            cursor.style.transform = `translate3d(${cursorX - 15}px, ${cursorY - 15}px, 0)`;
            cursorTicking = false;
        });
        cursorTicking = true;
    }
}, { passive: true, capture: true });

// Delegate hover effect with event delegation for better performance
document.addEventListener('mouseenter', (e) => {
    if (e.target && (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.tagName === 'IMG' || (e.target.classList && e.target.classList.contains('extrude')))) {
        cursor.classList.add('cursor-hover');
    }
}, true);

document.addEventListener('mouseleave', (e) => {
    if (e.target && (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.tagName === 'IMG' || (e.target.classList && e.target.classList.contains('extrude')))) {
        cursor.classList.remove('cursor-hover');
    }
}, true);

// Click animation
document.addEventListener('mousedown', () => {
    cursor.classList.add('cursor-click');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('cursor-click');
});

// Optimize initial load
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        updateParallax();
    });
} else {
    updateParallax();
}

/* ===== TYPEWRITER EFFECT ===== */
const typewriterElement = document.querySelector('.typewriter');
const cursorBlink = document.querySelector('.cursor-blink');
const roles = ['a Competitive Coder', 'an Engineering Student', 'a Developer', 'a Programmer'];
let roleIndex = 0;
let charIndex = 0;
let typingForward = true;

function typeWriter() {
    if (!typewriterElement) return;

    const currentText = roles[roleIndex];
    typewriterElement.textContent = currentText.substring(0, charIndex);
    typewriterElement.appendChild(cursorBlink);

    if (typingForward) {
        if (charIndex < currentText.length) {
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            typingForward = false;
            setTimeout(typeWriter, 1500); // pause at full text
        }
    } else {
        if (charIndex > 0) {
            charIndex--;
            setTimeout(typeWriter, 50);
        } else {
            typingForward = true;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeWriter, 500); // pause before next word
        }
    }
}

typeWriter();

/* ===== SCRAMBLE TEXT EFFECT ===== */
const scrambleText = document.querySelector('.extrude');
const finalText = 'Dhanush';
// Multi-language characters: Latin, Cyrillic, Greek, Japanese
const chars = 'АБВГДЕЁЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзиклмнопрстуфхцчшщъыьэюяΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω日本語文字和平愛心光明夢想未来希望';
let scrambleInterval;
let iterations = 0;

function scramble() {
    let scrambled = '';
    for (let i = 0; i < finalText.length; i++) {
        if (i < iterations) {
            scrambled += finalText[i];
        } else {
            scrambled += chars[Math.floor(Math.random() * chars.length)];
        }
    }
    scrambleText.textContent = scrambled;
    iterations += 0.25; // Slower reveal
    
    if (iterations >= finalText.length) {
        clearInterval(scrambleInterval);
        scrambleText.textContent = finalText;
    }
}

// Start scramble on load with longer delay
setTimeout(() => {
    scrambleInterval = setInterval(scramble, 100); // Slower timing
}, 500);


page1.addEventListener("mousemove", (ele) => {
    xvalue = ele.clientX - window.innerWidth / 2;
    yvalue = ele.clientY - window.innerHeight / 2;
    parallax.forEach((el, i) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        el.style.transform = `translateZ(calc(${-yvalue * speedy}px))`;
    })
});



// const parallax = document.querySelectorAll(".cursor-effect");
const effect = document.querySelectorAll(".pro");
// const first_page = document.querySelector(".first_page");
const para_effect = document.querySelector(".para-effect");
let xvalue = 0, yvalue = 0, zvalue = 0;

if (para_effect && effect.length) {
    const basePositions = [-565, -175, 215];
    const disableParallax = window.matchMedia('(max-width: 768px)');
    let parallaxX = 0;
    let parallaxTicking = false;

    const updateParallaxCards = () => {
        if (disableParallax.matches) {
            parallaxTicking = false;
            return;
        }
        effect.forEach((el, index) => {
            const speedx = parseFloat(el.dataset.speed || 0);
            const basePosition = basePositions[index] ?? 0;
            el.style.transform = `translateX(calc(${basePosition}px + ${-parallaxX * speedx}px))`;
        });
        parallaxTicking = false;
    };

    para_effect.addEventListener("mousemove", (event) => {
        if (disableParallax.matches) return;
        const rect = para_effect.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        parallaxX = event.clientX - centerX;

        if (!parallaxTicking) {
            requestAnimationFrame(updateParallaxCards);
            parallaxTicking = true;
        }
    });

    para_effect.addEventListener("mouseleave", () => {
        if (disableParallax.matches) return;
        effect.forEach((el, index) => {
            const basePosition = basePositions[index] ?? 0;
            el.style.transform = `translateX(${basePosition}px)`;
        });
    });
}

/* ===== REVEAL ON SCROLL ===== */
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const delay = el.getAttribute('data-reveal-delay');
                if (delay) {
                    el.style.transitionDelay = `${delay}ms`;
                }
                el.classList.add('is-visible');
                observer.unobserve(el);
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -10% 0px'
        }
    );

    revealItems.forEach((el) => revealObserver.observe(el));
} else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
}

/* ===== CONTACT FORM EMAIL FUNCTIONALITY (EmailJS - Secure for Static Sites) ===== */
// EmailJS Configuration - Safe to expose, these are PUBLIC keys
const EMAILJS_SERVICE_ID = 'service_uvshqbl';
const EMAILJS_TEMPLATE_ID = 'template_8ac39sm';
const EMAILJS_PUBLIC_KEY = 'joLXMxzj8ouMiAjYT';

// Initialize EmailJS with public key
emailjs.init(EMAILJS_PUBLIC_KEY);

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');
let statusTimeoutId = null;

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').style.display = 'none';
        submitBtn.querySelector('.btn-loading').style.display = 'inline';
        formStatus.textContent = '';
        formStatus.className = 'form-status';
        
        // Send email using EmailJS
        emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                message: document.getElementById('userMessage').value,
                title: 'Portfolio Contact Form',
            }
        ).then(
            (response) => {
                console.log('SUCCESS!', response.status, response.text);
                formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            },
            (error) => {
                console.error('FAILED...', error);
                formStatus.textContent = '✗ Failed to send message. Please try again or email me directly.';
                formStatus.className = 'form-status error';
            }
        ).finally(() => {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').style.display = 'inline';
            submitBtn.querySelector('.btn-loading').style.display = 'none';

            if (statusTimeoutId) {
                clearTimeout(statusTimeoutId);
            }
            statusTimeoutId = setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
                statusTimeoutId = null;
            }, 5000);
        });
    });
}
