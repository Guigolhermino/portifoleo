// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.toggleButton = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.toggleButton.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Countdown Timer
class CountdownTimer {
    constructor(targetDate) {
        this.targetDate = new Date(targetDate).getTime();
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
            this.handleCountdownEnd();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.elements.days.textContent = this.formatNumber(days);
        this.elements.hours.textContent = this.formatNumber(hours);
        this.elements.minutes.textContent = this.formatNumber(minutes);
        this.elements.seconds.textContent = this.formatNumber(seconds);
    }

    formatNumber(num) {
        return num.toString().padStart(2, '0');
    }

    handleCountdownEnd() {
        clearInterval(this.interval);
        Object.values(this.elements).forEach(element => {
            element.textContent = '00';
        });
        
        // Show launch message
        const countdownSection = document.querySelector('.countdown-section');
        const launchMessage = document.createElement('div');
        launchMessage.className = 'launch-message';
        launchMessage.innerHTML = '<h2>🚀 O aplicativo foi lançado!</h2>';
        countdownSection.appendChild(launchMessage);
    }
}

// Email Form Handler
class EmailFormHandler {
    constructor() {
        this.form = document.getElementById('emailForm');
        this.emailInput = document.getElementById('email');
        this.submitButton = this.form.querySelector('.cta-button');
        this.messageElement = document.getElementById('formMessage');
        this.subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('input', () => this.clearMessage());
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const email = this.emailInput.value.trim();
        
        if (!this.validateEmail(email)) {
            this.showMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        if (this.isEmailRegistered(email)) {
            this.showMessage('Este e-mail já está cadastrado!', 'error');
            return;
        }

        this.setLoading(true);

        try {
            // Simulate API call
            await this.simulateApiCall();
            
            // Store email locally
            this.subscribers.push({
                email: email,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('subscribers', JSON.stringify(this.subscribers));

            this.showMessage('✅ Obrigado! Você será notificado sobre o lançamento.', 'success');
            this.emailInput.value = '';
            
            // Add celebration animation
            this.celebrateSubscription();
            
        } catch (error) {
            this.showMessage('Ocorreu um erro. Tente novamente.', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isEmailRegistered(email) {
        return this.subscribers.some(subscriber => subscriber.email === email);
    }

    async simulateApiCall() {
        // Simulate network delay
        return new Promise(resolve => setTimeout(resolve, 1500));
    }

    setLoading(loading) {
        this.submitButton.classList.toggle('loading', loading);
        this.submitButton.disabled = loading;
        this.emailInput.disabled = loading;
    }

    showMessage(message, type) {
        this.messageElement.textContent = message;
        this.messageElement.className = `form-message ${type}`;
        this.messageElement.style.opacity = '1';
    }

    clearMessage() {
        this.messageElement.style.opacity = '0';
        setTimeout(() => {
            this.messageElement.textContent = '';
            this.messageElement.className = 'form-message';
        }, 300);
    }

    celebrateSubscription() {
        // Add confetti effect (simple version)
        const button = this.submitButton;
        button.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            button.style.animation = '';
        }, 500);
    }
}

// Smooth Scroll Animation
class ScrollAnimations {
    constructor() {
        this.observers = [];
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupSmoothScroll();
    }

    setupIntersectionObserver() {
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

        // Observe animated elements
        const animatedElements = document.querySelectorAll('.hero-section, .product-preview, .countdown-section, .signup-section, .social-section');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(element);
        });

        this.observers.push(observer);
    }

    setupSmoothScroll() {
        // Add smooth scrolling to any anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// App Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            domReady: 0,
            resourcesLoaded: 0
        };
        this.init();
    }

    init() {
        this.measureLoadTime();
        this.measureDOMReady();
        this.measureResourcesLoaded();
    }

    measureLoadTime() {
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            console.log(`Page loaded in ${this.metrics.loadTime.toFixed(2)}ms`);
        });
    }

    measureDOMReady() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.metrics.domReady = performance.now();
                console.log(`DOM ready in ${this.metrics.domReady.toFixed(2)}ms`);
            });
        } else {
            this.metrics.domReady = performance.now();
        }
    }

    measureResourcesLoaded() {
        window.addEventListener('load', () => {
            this.metrics.resourcesLoaded = performance.now();
            console.log(`All resources loaded in ${this.metrics.resourcesLoaded.toFixed(2)}ms`);
        });
    }
}

// Social Links Handler
class SocialLinksHandler {
    constructor() {
        this.socialLinks = {
            facebook: 'https://facebook.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
            linkedin: 'https://linkedin.com',
            youtube: 'https://youtube.com'
        };
        this.init();
    }

    init() {
        const socialLinksElements = document.querySelectorAll('.social-link');
        socialLinksElements.forEach((link, index) => {
            const socialPlatforms = Object.keys(this.socialLinks);
            const platform = socialPlatforms[index];
            
            if (platform && this.socialLinks[platform]) {
                link.href = this.socialLinks[platform];
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
            
            // Add click tracking
            link.addEventListener('click', (e) => {
                console.log(`Social link clicked: ${platform}`);
            });
        });
    }
}

// App Initialization
class App {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Initialize performance monitoring first
            this.components.performanceMonitor = new PerformanceMonitor();
            
            // Initialize theme management
            this.components.themeManager = new ThemeManager();
            
            // Initialize countdown timer (set to 30 days from now)
            const launchDate = new Date();
            launchDate.setDate(launchDate.getDate() + 30); // 30 days from now
            this.components.countdownTimer = new CountdownTimer(launchDate);
            
            // Initialize email form handler
            this.components.emailFormHandler = new EmailFormHandler();
            
            // Initialize scroll animations
            this.components.scrollAnimations = new ScrollAnimations();
            
            // Initialize social links
            this.components.socialLinksHandler = new SocialLinksHandler();
            
            // Add loading complete class
            document.body.classList.add('loaded');
            
            console.log('🚀 App initialized successfully!');
            
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    // Method to get subscriber count
    getSubscriberCount() {
        const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
        return subscribers.length;
    }

    // Method to export subscribers (for development)
    exportSubscribers() {
        const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
        console.table(subscribers);
        return subscribers;
    }
}

// Initialize the application
const app = new App();

// Expose app instance to global scope for debugging
window.app = app;

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker would be registered here in a full implementation
        console.log('Service Worker support detected');
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});
