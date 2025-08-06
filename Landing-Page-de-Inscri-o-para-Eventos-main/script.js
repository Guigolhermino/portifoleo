// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        this.applyTheme();
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const icon = this.themeToggle.querySelector('i');
        
        if (this.theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }
}

// Countdown Timer
class CountdownTimer {
    constructor() {
        // Set target date to August 15, 2025, 19:00 BRT (22:00 UTC)
        this.targetDate = new Date('2025-08-15T22:00:00.000Z').getTime();
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        this.init();
    }

    init() {
        this.updateCountdown();
        this.interval = setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        if (distance < 0) {
            this.handleExpired();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.elements.days.textContent = days.toString().padStart(2, '0');
        this.elements.hours.textContent = hours.toString().padStart(2, '0');
        this.elements.minutes.textContent = minutes.toString().padStart(2, '0');
        this.elements.seconds.textContent = seconds.toString().padStart(2, '0');
    }

    handleExpired() {
        clearInterval(this.interval);
        Object.values(this.elements).forEach(element => {
            element.textContent = '00';
        });
        
        // Update countdown section message
        const countdownSection = document.querySelector('.countdown-section h3');
        if (countdownSection) {
            countdownSection.textContent = 'O webinar já começou!';
        }
    }
}

// Form Validation
class FormValidator {
    constructor() {
        this.form = document.getElementById('registrationForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.successOverlay = document.getElementById('successOverlay');
        this.closeSuccessBtn = document.getElementById('closeSuccess');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.closeSuccessBtn.addEventListener('click', () => this.hideSuccess());
        this.successOverlay.addEventListener('click', (e) => {
            if (e.target === this.successOverlay) {
                this.hideSuccess();
            }
        });

        // Real-time validation
        const inputs = this.form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const fieldName = field.getAttribute('name');
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        switch (fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'Nome é obrigatório';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Nome deve ter pelo menos 2 caracteres';
                    isValid = false;
                } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
                    errorMessage = 'Nome deve conter apenas letras e espaços';
                    isValid = false;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'E-mail é obrigatório';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Por favor, insira um e-mail válido';
                    isValid = false;
                }
                break;

            case 'privacy':
                if (!field.checked) {
                    errorMessage = 'Você deve concordar com os termos de uso';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error');
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    }

    validateForm() {
        const requiredFields = this.form.querySelectorAll('input[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        // Show loading state
        this.setSubmitLoading(true);

        try {
            // Simulate API call
            await this.simulateRegistration();
            
            // Show success message
            this.showSuccess();
            
            // Reset form
            this.form.reset();
            
        } catch (error) {
            console.error('Registration error:', error);
            alert('Erro ao realizar inscrição. Tente novamente.');
        } finally {
            this.setSubmitLoading(false);
        }
    }

    async simulateRegistration() {
        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                // In a real application, this would send data to a server
                const formData = new FormData(this.form);
                const registrationData = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    company: formData.get('company'),
                    role: formData.get('role'),
                    newsletter: formData.get('newsletter') === 'on',
                    timestamp: new Date().toISOString()
                };
                
                console.log('Registration data:', registrationData);
                
                // Store in localStorage for demo purposes
                const registrations = JSON.parse(localStorage.getItem('webinar_registrations') || '[]');
                registrations.push(registrationData);
                localStorage.setItem('webinar_registrations', JSON.stringify(registrations));
                
                resolve();
            }, 2000);
        });
    }

    setSubmitLoading(loading) {
        if (loading) {
            this.submitBtn.disabled = true;
            this.submitBtn.classList.add('loading');
            this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('loading');
            this.submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Inscrever-se Agora - É Gratuito!';
        }
    }

    showSuccess() {
        this.successOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideSuccess();
        }, 5000);
    }

    hideSuccess() {
        this.successOverlay.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Smooth Scrolling for CTA buttons
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const ctaButtons = document.querySelectorAll('a[href="#registration"]');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const target = document.getElementById('registration');
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Analytics and Tracking (placeholder for real implementation)
class Analytics {
    constructor() {
        this.init();
    }

    init() {
        // Track page view
        this.trackEvent('page_view', {
            page: 'webinar_landing',
            timestamp: new Date().toISOString()
        });

        // Track scroll depth
        this.trackScrollDepth();
        
        // Track CTA clicks
        this.trackCTAClicks();
    }

    trackEvent(eventName, data) {
        // In a real application, this would send data to analytics service
        console.log('Analytics Event:', eventName, data);
        
        // Store events in localStorage for demo purposes
        const events = JSON.parse(localStorage.getItem('webinar_analytics') || '[]');
        events.push({
            event: eventName,
            data: data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('webinar_analytics', JSON.stringify(events));
    }

    trackScrollDepth() {
        let maxScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                // Track milestones
                if (maxScroll >= 25 && maxScroll < 50) {
                    this.trackEvent('scroll_depth', {depth: '25%'});
                } else if (maxScroll >= 50 && maxScroll < 75) {
                    this.trackEvent('scroll_depth', {depth: '50%'});
                } else if (maxScroll >= 75 && maxScroll < 100) {
                    this.trackEvent('scroll_depth', {depth: '75%'});
                } else if (maxScroll >= 100) {
                    this.trackEvent('scroll_depth', {depth: '100%'});
                }
            }
        });
    }

    trackCTAClicks() {
        const ctaButtons = document.querySelectorAll('.btn-primary');
        ctaButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                this.trackEvent('cta_click', {
                    button_text: button.textContent.trim(),
                    button_index: index,
                    section: this.getButtonSection(button)
                });
            });
        });
    }

    getButtonSection(button) {
        const section = button.closest('section');
        if (section) {
            return section.className || 'unknown';
        }
        return 'header';
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            this.trackPageLoad();
        });

        // Monitor core web vitals
        this.trackCoreWebVitals();
    }

    trackPageLoad() {
        const navigationTiming = performance.getEntriesByType('navigation')[0];
        
        if (navigationTiming) {
            const metrics = {
                dns_lookup: navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart,
                tcp_connect: navigationTiming.connectEnd - navigationTiming.connectStart,
                server_response: navigationTiming.responseEnd - navigationTiming.requestStart,
                dom_parse: navigationTiming.domContentLoadedEventEnd - navigationTiming.responseEnd,
                page_load: navigationTiming.loadEventEnd - navigationTiming.navigationStart
            };
            
            console.log('Page Load Metrics:', metrics);
        }
    }

    trackCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach((entry) => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach((entry) => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
    }
}

// Accessibility Enhancements
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.enhanceKeyboardNavigation();
        this.addAriaLabels();
        this.handleReducedMotion();
    }

    enhanceKeyboardNavigation() {
        // Add keyboard navigation for custom elements
        const customButtons = document.querySelectorAll('.theme-toggle');
        customButtons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });

        // Focus management for modal
        const successOverlay = document.getElementById('successOverlay');
        const closeSuccessBtn = document.getElementById('closeSuccess');
        
        successOverlay.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSuccessBtn.click();
            }
        });
    }

    addAriaLabels() {
        // Add missing ARIA labels
        const countdownItems = document.querySelectorAll('.countdown-item');
        countdownItems.forEach((item, index) => {
            const labels = ['dias', 'horas', 'minutos', 'segundos'];
            item.setAttribute('aria-label', `${item.querySelector('.countdown-number').textContent} ${labels[index]}`);
        });

        // Add ARIA labels to form fields
        const formFields = document.querySelectorAll('input, select');
        formFields.forEach(field => {
            const label = field.closest('.form-group').querySelector('label');
            if (label && !field.getAttribute('aria-label')) {
                field.setAttribute('aria-labelledby', label.textContent);
            }
        });
    }

    handleReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable animations for users who prefer reduced motion
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        }
        
        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            } else {
                document.documentElement.style.removeProperty('--animation-duration');
            }
        });
    }
}

// Error Handling and Monitoring
class ErrorMonitor {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('error', (e) => this.handleError(e));
        window.addEventListener('unhandledrejection', (e) => this.handleRejection(e));
    }

    handleError(error) {
        console.error('JavaScript Error:', error);
        
        // In production, send to error monitoring service
        this.logError({
            type: 'javascript_error',
            message: error.message,
            filename: error.filename,
            lineno: error.lineno,
            colno: error.colno,
            stack: error.error?.stack,
            timestamp: new Date().toISOString()
        });
    }

    handleRejection(event) {
        console.error('Unhandled Promise Rejection:', event.reason);
        
        this.logError({
            type: 'unhandled_rejection',
            reason: event.reason,
            timestamp: new Date().toISOString()
        });
    }

    logError(errorData) {
        // Store errors in localStorage for demo purposes
        const errors = JSON.parse(localStorage.getItem('webinar_errors') || '[]');
        errors.push(errorData);
        localStorage.setItem('webinar_errors', JSON.stringify(errors));
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeManager();
    new CountdownTimer();
    new FormValidator();
    new SmoothScroll();
    new Analytics();
    new PerformanceMonitor();
    new AccessibilityManager();
    new ErrorMonitor();

    // Update event date dynamically
    const eventDateElement = document.getElementById('eventDate');
    if (eventDateElement) {
        const eventDate = new Date('2025-08-15T22:00:00.000Z');
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'America/Sao_Paulo'
        };
        eventDateElement.textContent = eventDate.toLocaleDateString('pt-BR', options);
    }

    // Add loading class removal after initial load
    document.body.classList.add('loaded');

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    console.log('🚀 Webinar Landing Page Loaded Successfully!');
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // In a real application, you would register a service worker here
        console.log('Service Worker support detected');
    });
}

// Export for testing purposes
window.WebinarApp = {
    ThemeManager,
    CountdownTimer,
    FormValidator,
    SmoothScroll,
    Analytics,
    PerformanceMonitor,
    AccessibilityManager,
    ErrorMonitor
};