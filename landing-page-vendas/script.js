// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle icon
        const icon = this.themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Mobile Navigation
class MobileNav {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// FAQ Accordion
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => this.toggleItem(item));
        });
    }

    toggleItem(item) {
        const isActive = item.classList.contains('active');
        
        // Close all items
        this.faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// Smooth Scrolling
class SmoothScroller {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Form Handler
class FormHandler {
    constructor() {
        this.form = document.getElementById('signupForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name') || document.getElementById('name').value,
            email: formData.get('email') || document.getElementById('email').value,
            phone: formData.get('phone') || document.getElementById('phone').value
        };

        // Validate form
        if (!this.validateForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await this.simulateSubmission(data);
            
            // Show success message
            this.showMessage('Inscrição realizada com sucesso! Entraremos em contato em breve.', 'success');
            this.form.reset();
        } catch (error) {
            // Show error message
            this.showMessage('Erro ao processar inscrição. Tente novamente.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    validateForm(data) {
        const errors = [];

        if (!data.name || data.name.length < 2) {
            errors.push('Nome deve ter pelo menos 2 caracteres');
        }

        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Email inválido');
        }

        if (!data.phone || data.phone.length < 10) {
            errors.push('Telefone deve ter pelo menos 10 dígitos');
        }

        if (errors.length > 0) {
            this.showMessage(errors.join('<br>'), 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async simulateSubmission(data) {
        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve();
            }, 2000);
        });
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-${type}`;
        messageDiv.innerHTML = message;

        // Insert after form
        this.form.parentNode.insertBefore(messageDiv, this.form.nextSibling);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Scroll Animation Observer
class ScrollAnimator {
    constructor() {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, this.options);

        // Observe elements
        const elements = document.querySelectorAll('.feature-card, .module-card, .testimonial-card, .pricing-card');
        elements.forEach(el => this.observer.observe(el));
    }
}

// Header Scroll Effect
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            this.header.style.background = 'rgba(255, 255, 255, 0.95)';
            this.header.style.backdropFilter = 'blur(10px)';
        } else {
            this.header.style.background = 'var(--bg-color)';
            this.header.style.backdropFilter = 'none';
        }
    }
}

// Video Placeholder Handler
class VideoHandler {
    constructor() {
        this.videoPlaceholder = document.querySelector('.video-placeholder');
        this.init();
    }

    init() {
        if (this.videoPlaceholder) {
            this.videoPlaceholder.addEventListener('click', () => this.handleVideoClick());
        }
    }

    handleVideoClick() {
        // Simulate video modal or redirect
        alert('Vídeo de apresentação seria carregado aqui!\n\nEm uma implementação real, você poderia:\n- Abrir um modal com o vídeo\n- Redirecionar para YouTube/Vimeo\n- Carregar um player incorporado');
    }
}

// Pricing Calculator
class PricingCalculator {
    constructor() {
        this.init();
    }

    init() {
        // Add any pricing calculation logic here
        this.addHoverEffects();
    }

    addHoverEffects() {
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('featured')) {
                    card.style.transform = 'translateY(0) scale(1)';
                } else {
                    card.style.transform = 'translateY(0) scale(1.05)';
                }
            });
        });
    }
}

// Security Indicator
class SecurityIndicator {
    constructor() {
        this.init();
    }

    init() {
        // Update page title with lock icon
        document.title = '🔒 ' + document.title;
        
        // Add security badges
        this.addSecurityBadges();
    }

    addSecurityBadges() {
        // This could add additional security indicators
        console.log('Security indicators active');
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor page performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MobileNav();
    new FAQAccordion();
    new SmoothScroller();
    new FormHandler();
    new ScrollAnimator();
    new HeaderScroll();
    new VideoHandler();
    new PricingCalculator();
    new SecurityIndicator();
    new PerformanceMonitor();
    
    console.log('Landing page initialized successfully!');
});

// Error handling for uncaught errors
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Handle promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Export for testing purposes (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        FormHandler,
        FAQAccordion
    };
}
