// Portfolio JavaScript with Advanced Animations

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    // --- Loading Screen ---
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');

    if (loadingScreen && loadingProgress) {
        // Animated loading screen
        let pct = 0;
        function animate() {
            pct += Math.random() * 12 + 6;
            if (pct > 100) pct = 100;
            loadingProgress.style.width = pct + '%';
            if (pct < 100) {
                setTimeout(animate, 180);
            } else {
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    // loadingScreen.style.opacity = 0;
                    // loadingScreen.style.pointerEvents = 'none';
                    // setTimeout(() => loadingScreen.style.display = 'none', 600);
                }, 600);
            }
        }
        animate();

        // Fallback: forcibly hide after 4.5s
        setTimeout(() => {
            if (loadingScreen && !loadingScreen.classList.contains('fade-out')) {
                loadingScreen.classList.add('fade-out');
                // loadingScreen.style.opacity = 0;
                // loadingScreen.style.pointerEvents = 'none';
                // setTimeout(() => loadingScreen.style.display = 'none', 600);
            }
        }, 4500);
    }

    // --- Custom Cursor ---
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorDot = document.querySelector('.cursor-dot');

    if (cursorFollower && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';

            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Cursor effects on hover
        const hoverElements = document.querySelectorAll('a, button, .project-item, .expertise-card, .gallery-item, .menu-link, .social-link, .submit-btn, .primary-btn, .secondary-btn, .project-btn');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.borderColor = '#d4af37';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0)';
            });

            element.addEventListener('mouseleave', () => {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.borderColor = '#ffffff';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    } else {
        console.log("Cursor elements not found");
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.nav-menu-toggle');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const menuLinks = document.querySelectorAll('.menu-link');
    const menuSocial = document.querySelector('.menu-social');
    const nav = document.querySelector('.minimal-nav');

    if (menuToggle && fullscreenMenu) {
        const toggleMenu = () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            fullscreenMenu.setAttribute('aria-hidden', isExpanded);

            if (!isExpanded) {
                fullscreenMenu.style.opacity = '1';
                fullscreenMenu.style.visibility = 'visible';
                document.body.style.overflow = 'hidden';
                // Animate menu links
                setTimeout(() => {
                    menuLinks.forEach((link, index) => {
                        setTimeout(() => {
                            link.style.transitionDelay = (index * 0.1) + 's';
                        }, 10);
                    });
                    if (menuSocial) {
                        menuSocial.style.transitionDelay = '0.3s';
                    }
                }, 100);
            } else {
                fullscreenMenu.style.opacity = '0';
                fullscreenMenu.style.visibility = 'hidden';
                document.body.style.overflow = 'auto';
            }
        };

        menuToggle.addEventListener('click', toggleMenu);
        menuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        // Close menu when clicking links
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                fullscreenMenu.setAttribute('aria-hidden', 'true');
                fullscreenMenu.style.opacity = '0';
                fullscreenMenu.style.visibility = 'hidden';
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        fullscreenMenu.addEventListener('click', (e) => {
            if (e.target === fullscreenMenu) {
                menuToggle.setAttribute('aria-expanded', 'false');
                fullscreenMenu.setAttribute('aria-hidden', 'true');
                fullscreenMenu.style.opacity = '0';
                fullscreenMenu.style.visibility = 'hidden';
                document.body.style.overflow = 'auto';
            }
        });
    } else {
        console.log("Menu toggle or fullscreen menu not found");
    }

    // --- Smooth Scrolling ---
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Allow default for external links or # (same page)
            const href = this.getAttribute('href');
            if (href === '#' || href.startsWith('http')) {
                return;
            }

            e.preventDefault();
            const targetId = href;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (fullscreenMenu && fullscreenMenu.getAttribute('aria-hidden') === 'false') {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    fullscreenMenu.setAttribute('aria-hidden', 'true');
                    fullscreenMenu.style.opacity = '0';
                    fullscreenMenu.style.visibility = 'hidden';
                    document.body.style.overflow = 'auto';
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Fade-in Animation for cards ---
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Stop observing once animated
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, fadeObserverOptions);

        fadeElements.forEach(element => {
             // Ensure initial state for animation
             // Initial styles are in CSS (opacity: 0, transform)
            fadeObserver.observe(element);
        });
    } else {
        console.log("No fade-in elements found for IntersectionObserver");
    }


    // --- Parallax Effect for Hero Section ---
    // Note: Particles are handled by a separate library or script, not included here.
    // If you want a simple parallax effect on the background, you can use this:
    /*
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
             heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
             // Adjust the multiplier (0.5) for speed
        }
    });
    */


    // --- Floating Orbs Animation Enhancement ---
    const floatingOrbs = document.querySelectorAll('.floating-orb');
    floatingOrbs.forEach((orb, index) => {
        // Add random movement to make it more natural
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 10;
            const randomY = (Math.random() - 0.5) * 10;
            orb.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 2000 + index * 500);
    });

    // --- Project Hover Effects (Duplicate from CSS transitions, but kept for JS enhancement if needed) ---
    // The CSS transitions handle this well, so JS enhancement is minimal here.
    // const projectItems = document.querySelectorAll('.project-item, .gallery-item');
    // projectItems.forEach(item => {
    //     item.addEventListener('mouseenter', () => {
    //         item.style.transform = 'translateY(-10px) scale(1.05) rotate(-1deg)';
    //     });
    //     item.addEventListener('mouseleave', () => {
    //         item.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    //     });
    // });

    // --- Form Submission ---
    // The form uses Formspree, so basic validation is good.
    const contactForms = document.querySelectorAll('.elegant-form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            // Basic validation can be added here if needed before Formspree handles it.
            // For now, let Formspree handle submission.
            console.log("Form submitted, handled by Formspree.");
        });
    });

    // --- Dynamic Year for Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Header scroll effect ---
    // The CSS already handles the blur and shadow effect via `backdrop-filter` and `box-shadow`.
    // This JS part is optional if you want to change background color on scroll.
    /*
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                // nav.style.backdropFilter = 'blur(12px)';
                // nav.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                // nav.style.backdropFilter = 'blur(10px)';
                // nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            }
        });
    }
    */

    // --- Timeline Animation ---
    function revealTimelineItems() {
        const items = document.querySelectorAll('.journey-timeline .timeline-item');
        const trigger = window.innerHeight * 0.92;
        items.forEach((item) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < trigger) {
                item.classList.add('visible');
                 // Stop observing once visible
                 // timelineObserver.unobserve(item); // If using IntersectionObserver
            }
        });
    }
    window.addEventListener('scroll', revealTimelineItems);
    // Initial check in case items are already in view
    window.addEventListener('DOMContentLoaded', revealTimelineItems);

    // Optional: Use IntersectionObserver for timeline items too
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
         const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing once animated
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }


    // --- Debounce function for performance ---
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // --- Enhanced Hero Animations ---

    // Typing Effect for Name
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

    // Role Rotation Animation
    function rotateRoles() {
        const rolesElement = document.querySelector('.rotating-roles');
        if (!rolesElement) return;

        const roles = rolesElement.dataset.roles.split(',');
        let currentIndex = 0;

        setInterval(() => {
            rolesElement.style.opacity = '0';
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % roles.length;
                rolesElement.textContent = roles[currentIndex];
                rolesElement.style.opacity = '1';
            }, 300);
        }, 3000);
    }

    // Counter Animation for Stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const increment = target / 50;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 40);
                } else {
                    counter.textContent = target;
                }
            };

            // Start animation when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(counter);
        });
    }

    // Particle System for Hero Background
    function createParticleSystem() {
        const canvas = document.getElementById('hero-particles');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - distance / 100)})`;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Skill Planet Tooltips
    function initSkillPlanets() {
        const skillPlanets = document.querySelectorAll('.skill-planet');
        skillPlanets.forEach(planet => {
            planet.addEventListener('mouseenter', function() {
                const skill = this.dataset.skill;
                if (skill) {
                    // Create tooltip
                    const tooltip = document.createElement('div');
                    tooltip.className = 'skill-tooltip';
                    tooltip.textContent = skill;
                    tooltip.style.cssText = `
                        position: absolute;
                        background: rgba(10, 10, 10, 0.9);
                        color: var(--accent-gold);
                        padding: 0.5rem 1rem;
                        border-radius: 20px;
                        font-size: 0.8rem;
                        font-weight: 500;
                        pointer-events: none;
                        z-index: 1000;
                        transform: translateX(-50%);
                        white-space: nowrap;
                        top: -40px;
                        left: 50%;
                        opacity: 0;
                        transition: opacity 0.3s;
                    `;
                    this.appendChild(tooltip);
                    setTimeout(() => tooltip.style.opacity = '1', 10);
                }
            });

            planet.addEventListener('mouseleave', function() {
                const tooltip = this.querySelector('.skill-tooltip');
                if (tooltip) {
                    tooltip.style.opacity = '0';
                    setTimeout(() => tooltip.remove(), 300);
                }
            });
        });
    }

    // Enhanced Intersection Observer for multiple sections
    function initSectionAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');

                    // Special handling for expertise cards
                    if (entry.target.classList.contains('expertise-section')) {
                        const cards = entry.target.querySelectorAll('.expertise-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animate');
                            }, index * 200);
                        });
                    }

                    // Special handling for project cards
                    if (entry.target.classList.contains('projects-section')) {
                        const cards = entry.target.querySelectorAll('.project-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animate');
                            }, index * 150);
                        });
                    }

                    // Special handling for timeline items
                    if (entry.target.classList.contains('journey-section')) {
                        const items = entry.target.querySelectorAll('.timeline-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate');
                            }, index * 300);
                        });
                    }

                    sectionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe sections
        const sections = document.querySelectorAll('.about-section, .expertise-section, .projects-section, .journey-section');
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Project Card Interactions
    function initProjectInteractions() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Featured project interactions
        const featuredProject = document.querySelector('.featured-project');
        if (featuredProject) {
            featuredProject.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.01)';
            });

            featuredProject.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
    }

    // Enhanced Button Animations
    function initButtonAnimations() {
        const buttons = document.querySelectorAll('.project-btn, .cta-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateX(5px)';
                }
            });

            button.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateX(0)';
                }
            });
        });
    }

    // Project Card Hover Effects
    function initProjectEffects() {
        const projectCards = document.querySelectorAll('.project-item, .gallery-item');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02) rotate(1deg)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            });
        });
    }

    // Set current year in footer
    function setCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // Project Filtering System
    function initProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        if (filterButtons.length === 0 || projectCards.length === 0) {
            console.log('Filter buttons or project cards not found');
            return;
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');
                let visibleIndex = 0;

                projectCards.forEach((card) => {
                    const cardCategory = card.getAttribute('data-category');

                    // Clear any existing inline styles that might interfere
                    card.style.transition = '';

                    if (filterValue === 'all' || cardCategory === filterValue) {
                        // Show card with staggered animation
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px) scale(0.9)';

                        setTimeout(() => {
                            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, visibleIndex * 150 + 50);

                        visibleIndex++;
                    } else {
                        // Hide card with animation
                        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-20px) scale(0.9)';

                        setTimeout(() => {
                            if (card.style.opacity === '0') {
                                card.style.display = 'none';
                            }
                        }, 400);
                    }
                });
            });
        });
    }

    // Circular Navigation Functionality
    function initCircularNavigation() {
        const mainNav = document.getElementById('main-nav');
        const circularNav = document.getElementById('circular-nav');
        const circularToggle = document.querySelector('.circular-nav-toggle');
        const circularMenu = document.getElementById('circular-menu');
        let isMenuOpen = false;
        let lastScrollY = window.scrollY;

        // Show/hide circular nav based on scroll
        function handleScroll() {
            const currentScrollY = window.scrollY;
            const scrollThreshold = 200; // Show after scrolling 200px

            if (currentScrollY > scrollThreshold) {
                // Show circular nav, hide main nav
                circularNav.classList.add('visible');
                mainNav.classList.add('hidden');
            } else {
                // Hide circular nav, show main nav
                circularNav.classList.remove('visible');
                mainNav.classList.remove('hidden');
                // Close menu if open
                if (isMenuOpen) {
                    circularMenu.classList.remove('active');
                    isMenuOpen = false;
                }
            }

            lastScrollY = currentScrollY;
        }

        // Toggle circular menu
        function toggleCircularMenu() {
            isMenuOpen = !isMenuOpen;
            circularMenu.classList.toggle('active', isMenuOpen);
        }

        // Close menu when clicking on a menu item
        function handleMenuItemClick() {
            if (isMenuOpen) {
                circularMenu.classList.remove('active');
                isMenuOpen = false;
            }
        }

        // Event listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        circularToggle.addEventListener('click', toggleCircularMenu);

        // Add click handlers to menu items
        const menuItems = document.querySelectorAll('.circular-menu .menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', handleMenuItemClick);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !circularNav.contains(e.target)) {
                circularMenu.classList.remove('active');
                isMenuOpen = false;
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                circularMenu.classList.remove('active');
                isMenuOpen = false;
            }
        });
    }

    // Initialize enhanced animations
    setTimeout(() => {
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            const text = typingElement.dataset.text || typingElement.textContent;
            typeWriter(typingElement, text, 150);
        }

        rotateRoles();
        animateCounters();
        createParticleSystem();
        initSkillPlanets();
        initSectionAnimations();
        initProjectEffects();
        initProjectInteractions();
        initProjectFiltering();
        initButtonAnimations();
        initCircularNavigation();
        setCurrentYear();
    }, 2000);

    // --- Optimize scroll events ---
    const optimizedScroll = debounce(() => {
        // Scroll-based animations can go here if needed
    }, 16);

    window.addEventListener('scroll', optimizedScroll);

    console.log("All JavaScript initialized");
});

// Prevent right-click context menu (optional for portfolio)
// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
// });