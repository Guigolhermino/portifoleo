// ===== PORTFOLIO WEBSITE SCRIPT =====

feather.replace();

// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();
    
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initSmoothScrolling();
    initScrollIndicator();
    initMobileMenu();
    initProjectCards();
    
    console.log('Portfolio website initialized successfully');
});

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle scroll effect on navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
    
    // Add click event to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                // Trigger project card animations
                if (entry.target.classList.contains('project-card')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200);
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in, section, .project-card');
    fadeElements.forEach(el => observer.observe(el));
}

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
    // This will be triggered by scroll animation
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, index * 200);
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Already handled in navigation, but ensuring all anchor links work
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL INDICATOR =====
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
        
        // Hide scroll indicator when scrolling past hero
        window.addEventListener('scroll', function() {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                
                if (window.scrollY > heroBottom - 200) {
                    scrollIndicator.style.opacity = '0';
                } else {
                    scrollIndicator.style.opacity = '1';
                }
            }
        });
    }
}

// ===== PROJECT CARDS =====
document.addEventListener('DOMContentLoaded', function() {
    const projectImages = document.querySelectorAll('.project-image');

    projectImages.forEach(projectImage => {
        const video = projectImage.querySelector('video');
        if (video) {
            projectImage.addEventListener('mouseenter', function() {
                video.play();
            });

            projectImage.addEventListener('mouseleave', function() {
                video.pause();
                video.currentTime = 0;
            });
        }
    });
});

function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover effects and interactions
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearFormErrors();
            
            // Validate form
            const formData = new FormData(this);
            const formValues = {
                name: formData.get('name').trim(),
                email: formData.get('_replyto').trim(),
                subject: formData.get('subject').trim(),
                message: formData.get('message').trim()
            };
            
            let isValid = true;
            
            // Validate name
            if (!formValues.name) {
                showFieldError('name', 'Nome é obrigatório');
                isValid = false;
            }
            
            // Validate email
            if (!formValues.email) {
                showFieldError('email', 'E-mail é obrigatório');
                isValid = false;
            } else if (!isValidEmail(formValues.email)) {
                showFieldError('email', 'E-mail inválido');
                isValid = false;
            }
            
            // Validate subject
            if (!formValues.subject) {
                showFieldError('subject', 'Assunto é obrigatório');
                isValid = false;
            }
            
            // Validate message
            if (!formValues.message) {
                showFieldError('message', 'Mensagem é obrigatória');
                isValid = false;
            } else if (formValues.message.length < 10) {
                showFieldError('message', 'Mensagem deve ter pelo menos 10 caracteres');
                isValid = false;
            }
            
            if (isValid) {
                submitForm(formValues);
            }
        });
    }
    
    // Close success message when clicking outside
    if (successMessage) {
        successMessage.addEventListener('click', function(e) {
            if (e.target === this) {
                hideSuccessMessage();
            }
        });
    }
}

function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
    });
    
    const formFields = document.querySelectorAll('.form-group input, .form-group textarea');
    formFields.forEach(field => {
        field.style.borderColor = 'var(--border-color)';
    });
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + '-error');
    
    if (field) {
        field.style.borderColor = '#ef4444';
    }
    
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitForm(formValues) {
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    const contactForm = document.getElementById('contact-form');
    
    // Mostra o estado de carregamento do botão
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    submitButton.disabled = true;
    
    // Pega a URL do action do formulário
    const formAction = contactForm.action;
    
    // Envia os dados para o Formspree
    fetch(formAction, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        // Resetar o estado do botão
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        submitButton.disabled = false;

        // Se a resposta for bem-sucedida
        if (response.ok) {
            contactForm.reset();
            showSuccessMessage();
            console.log('Form submitted successfully!');
        } else {
            // Caso de erro no envio
            console.error('Submission error:', response.statusText);
            alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
        }
    })
    .catch(error => {
        // Lidar com erros de rede
        console.error('Network error:', error);
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        submitButton.disabled = false;
        alert('Ocorreu um erro de rede. Verifique sua conexão e tente novamente.');
    });
}

function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.style.display = 'block';
        
        // Replace Feather icons in success message
        feather.replace();
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideSuccessMessage();
        }, 5000);
    }
}

function hideSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.style.display = 'none';
    }
}

// ===== UTILITY FUNCTIONS =====

// Throttle function for performance optimization
function throttle(func, wait) {
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

// Debounce function for performance optimization
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

// Optimized scroll handler
const optimizedScrollHandler = throttle(function() {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function() {
    // Log performance metrics
    const navigationTiming = performance.getEntriesByType('navigation')[0];
    console.log('Page Load Time:', navigationTiming.loadEventEnd - navigationTiming.loadEventStart, 'ms');
    
    // Initialize any remaining animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        closeMobileMenu();
        hideSuccessMessage();
    }
    
    // Handle Enter key on interactive elements
    if (e.key === 'Enter') {
        if (e.target.classList.contains('scroll-indicator')) {
            e.target.click();
        }
    }
});

// ===== BROWSER COMPATIBILITY =====
// Check for IntersectionObserver support
if (!window.IntersectionObserver) {
    // Fallback for older browsers
    console.warn('IntersectionObserver not supported. Using fallback scroll animations.');
    
    window.addEventListener('scroll', debounce(function() {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('visible');
            }
        });
    }, 100));
}

// ===== FINAL INITIALIZATION =====
console.log('Portfolio website script loaded successfully');
