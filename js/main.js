// ===== FERRARI 499P COMPLETE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INITIALIZE ALL COMPONENTS =====
    initHeader();
    initCustomCursor();
    initSmoothScroll();
    initLiveryGallery();
    initVideoSwiper();
    initFormHandling();
    initScrollAnimations();
    initVideoCards();
    initMobileMenu();
    initBottomNavScroll();
    initSearchFunction();
    initStatsCounter();
});

// ===== HEADER FUNCTIONALITY =====
function initHeader() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.classList.add('scrolled');
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.classList.remove('scrolled');
        }
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').replace('#', '');
            if (href === current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== LIVERY GALLERY =====
function initLiveryGallery() {
    const mainImage = document.getElementById('mainLivery');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (!mainImage || !thumbnails.length) return;
    
    window.changeLivery = function(src) {
        mainImage.src = src;
        thumbnails.forEach(thumb => {
            thumb.classList.remove('active');
            if (thumb.src === src) {
                thumb.classList.add('active');
            }
        });
    };
}

// ===== VIDEO SWIPER =====
function initVideoSwiper() {
    if (typeof Swiper === 'undefined' || !document.querySelector('.video-swiper')) return;
    
    new Swiper('.video-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your interest in the Ferrari 499P. A representative will contact you soon.');
        this.reset();
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.powertrain-card, .aero-feature, .control-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
}

// ===== VIDEO CARDS =====
function initVideoCards() {
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', function() {
            alert('Video player would open here');
        });
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (!menuBtn || !navList) return;
    
    menuBtn.addEventListener('click', function() {
        if (navList.style.display === 'flex') {
            navList.style.display = '';
            this.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
            navList.style.display = 'flex';
            navList.style.flexDirection = 'column';
            navList.style.position = 'absolute';
            navList.style.top = '80px';
            navList.style.left = '0';
            navList.style.width = '100%';
            navList.style.background = 'rgba(0,0,0,0.95)';
            navList.style.padding = '2rem';
            navList.style.zIndex = '999';
            this.innerHTML = '<i class="fas fa-times"></i>';
        }
    });
}

// ===== BOTTOM NAV SCROLL =====
function initBottomNavScroll() {
    const bottomNav = document.querySelector('.bottom-nav-list');
    if (!bottomNav) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;

    bottomNav.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - bottomNav.offsetLeft;
        scrollLeft = bottomNav.scrollLeft;
    });

    bottomNav.addEventListener('mouseleave', () => isDown = false);
    bottomNav.addEventListener('mouseup', () => isDown = false);

    bottomNav.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - bottomNav.offsetLeft;
        const walk = (x - startX) * 2;
        bottomNav.scrollLeft = scrollLeft - walk;
    });
}

// ===== SEARCH FUNCTION =====
function initSearchFunction() {
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            alert('Search functionality');
        });
    }
}

// ===== STATS COUNTER =====
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const value = stat.textContent;
        const numericValue = parseInt(value) || 0;
        
        if (numericValue > 0) {
            stat.textContent = '0';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateValue(stat, 0, numericValue, 2000);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(stat);
        }
    });
    
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
}