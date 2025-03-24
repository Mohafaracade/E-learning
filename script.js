document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const searchBar = document.querySelector('.search-bar');
    const headerSearchInput = searchBar?.querySelector('input');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTop = document.querySelector('.scroll-top');
    const counters = document.querySelectorAll('.counter');
    const animateElements = document.querySelectorAll('.feature-card, .step-card, .program-card');

    // Mobile Menu Toggle with improved animation
    if (menuToggle && navbarCollapse) {
        menuToggle.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.navbar') && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Enhanced Header Scroll Effect
    const handleScroll = () => {
        const scrollY = window.scrollY;
        
        // Header transformation
        if (scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        // Scroll progress
        if (scrollProgress) {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = scrollY / windowHeight;
            scrollProgress.style.transform = `scaleX(${progress})`;
        }

        // Scroll to top button visibility
        if (scrollTop) {
            scrollTop.classList.toggle('visible', scrollY > 300);
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Smooth Scroll Implementation
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Enhanced Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = link.getAttribute('href');
                smoothScroll(target);
                
                // Close mobile menu if open
                if (navbarCollapse?.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                    document.body.classList.remove('menu-open');
                }
            }
        });

        // Advanced Hover Effect
        link.addEventListener('mouseenter', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'nav-ripple';
            const rect = e.target.getBoundingClientRect();
            ripple.style.cssText = `
                left: ${rect.left}px;
                top: ${rect.top}px;
                width: ${rect.width}px;
                height: ${rect.height}px;
            `;
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
        });
    });

    // Enhanced Search Bar Interactions
    if (headerSearchInput) {
        headerSearchInput.addEventListener('focus', () => {
            searchBar.classList.add('expanded');
        });

        headerSearchInput.addEventListener('blur', () => {
            if (!headerSearchInput.value) {
                searchBar.classList.remove('expanded');
            }
        });

        // Search Loading Animation
        let searchTimeout;
        headerSearchInput.addEventListener('input', () => {
            searchBar.classList.add('loading');
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchBar.classList.remove('loading');
            }, 1000);
        });
    }

    // Optimized Counter Animation
    const animateCounter = (counter) => {
        const target = parseInt(counter.innerText.replace(/[^0-9]/g, ''));
        const suffix = counter.innerText.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 50;
        const duration = 1000;
        const step = duration / 50;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = `${Math.floor(current)}${suffix}`;
                setTimeout(updateCounter, step);
            } else {
                counter.innerText = `${target}${suffix}`;
            }
        };

        updateCounter();
    };

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-down');
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    [...counters, ...animateElements].forEach(element => {
        animationObserver.observe(element);
    });

    // Scroll to Top Button
    if (scrollTop) {
        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        heroImage.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    });

    // Optional: Add scroll fade effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroSection.style.opacity = 1 - (scrolled / 1000);
    });

    // Add animation order to program cards
    document.querySelectorAll('.program-card').forEach((card, index) => {
        card.style.setProperty('--animation-order', index + 1);
    });

    // Add hover effect for program cards
    document.querySelectorAll('.program-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const icon = card.querySelector('.program-icon');
            icon.style.transform = 'rotate(15deg) scale(1.2)';
        });

        card.addEventListener('mouseleave', (e) => {
            const icon = card.querySelector('.program-icon');
            icon.style.transform = 'rotate(0) scale(1)';
        });
    });

    const programCards = document.querySelectorAll('.program-card');
    
    programCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            programCards.forEach(c => c.classList.remove('active', 'clicked'));
            
            // Add clicked animation
            this.classList.add('clicked');
            
            // Add active state after a small delay
            setTimeout(() => {
                this.classList.add('active');
            }, 200);
            
            // Optional: Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            
            const x = event.clientX - rect.left - size/2;
            const y = event.clientY - rect.top - size/2;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // View Toggle Functionality
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Add your view switching logic here
        });
    });

    // Search Animation
    const searchInput = document.querySelector('.event-search');
    searchInput?.addEventListener('focus', () => {
        searchInput.style.background = 'rgba(255, 255, 255, 0.15)';
        searchInput.style.width = '120%';
    });

    searchInput?.addEventListener('blur', () => {
        searchInput.style.background = 'rgba(255, 255, 255, 0.1)';
        searchInput.style.width = '100%';
    });

    // Filter Dropdowns An      imation
    const filters = document.querySelectorAll('.date-filter, .category-filter');
    filters.forEach(filter => {
        filter.addEventListener('change', () => {
            filter.style.background = filter.value ? 'rgba(255, 193, 7, 0.2)' : 'rgba(255, 255, 255, 0.1)';
        });
    });

    const eventCards = document.querySelectorAll('.event-card');

    eventCards.forEach(card => {
        card.addEventListener('click', function(event) {
            // Remove active class from all cards
            eventCards.forEach(c => {
                c.classList.remove('active');
                c.style.transform = 'scale(1)';
            });
            
            // Add active class and scale effect to clicked card
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            
            // Create and add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            
            const x = event.clientX - rect.left - size/2;
            const y = event.clientY - rect.top - size/2;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);
            
            // Add yellow highlight animation
            this.style.backgroundColor = '#ffc107';
            this.style.color = '#000';
            
            // Reset other cards
            eventCards.forEach(c => {
                if (c !== this) {
                    c.style.backgroundColor = '';
                    c.style.color = '';
                }
            });
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate reCAPTCHA
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                alert('Please complete the reCAPTCHA verification');
                return;
            }
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value,
                recaptcha: recaptchaResponse
            };
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success state
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.background = '#10B981';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    grecaptcha.reset();
                }, 2000);
            }, 1500);
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.toggle('is-valid', this.value.trim() !== '');
            });
        });
    }

    const video = document.getElementById('elearningVideo');
    const playBtn = document.querySelector('.play-btn');
    const volumeBtn = document.querySelector('.volume-btn');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const progress = document.querySelector('.progress');
    const volumeProgress = document.querySelector('.volume-progress');
    const videoControls = document.querySelector('.video-controls');

    // Play/Pause
    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Update progress bar
    video.addEventListener('timeupdate', () => {
        const percentage = (video.currentTime / video.duration) * 100;
        progress.style.width = `${percentage}%`;
    });

    // Click on progress bar
    document.querySelector('.progress-bar').addEventListener('click', (e) => {
        const progressBar = e.currentTarget;
        const clickPosition = (e.pageX - progressBar.offsetLeft) / progressBar.offsetWidth;
        video.currentTime = clickPosition * video.duration;
    });

    // Volume
    volumeBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        volumeBtn.innerHTML = video.muted ? 
            '<i class="fas fa-volume-mute"></i>' : 
            '<i class="fas fa-volume-up"></i>';
        volumeProgress.style.width = video.muted ? '0%' : '100%';
    });

    // Fullscreen
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            video.requestFullscreen();
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            document.exitFullscreen();
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });
});



