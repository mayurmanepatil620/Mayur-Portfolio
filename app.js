// Application State
let isTyping = false;
let skillsAnimated = false;

// Typing Animation Data
const typingTexts = ["Full-Stack Developer","Data Science Enthusiast", "Fronted Developer","Student"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mayur Mane Patil Portfolio initialized');
    
    // Initialize all components
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initMobileMenu();
    initContactForm();
    initSkillsAnimation();
    initHeroButtons();
    
    // Update active navigation on page load
    updateActiveNavigation();
});

// Navigation Functions
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
}

function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    
    if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight || 70;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function initHeroButtons() {
    // Initialize "Get In Touch" button
    const getInTouchBtn = document.querySelector('a[href="#contact"]');
    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('contact');
        });
    }
    
    // Initialize "View My Work" button
    const viewWorkBtn = document.querySelector('a[href="#projects"]');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('projects');
        });
    }
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight || 70;
    
    let currentSection = 'home';
    const scrollPosition = window.scrollY + headerHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu Functions
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}

// Typing Animation Functions
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    startTypingAnimation();
}

function startTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        // Remove characters
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            setTimeout(startTypingAnimation, 500);
        } else {
            setTimeout(startTypingAnimation, 100);
        }
    } else {
        // Add characters
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
                startTypingAnimation();
            }, 2000);
        } else {
            setTimeout(startTypingAnimation, 150);
        }
    }
}

// Skills Animation Functions
function initSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateSkillBars();
                animateCircularSkills();
                skillsAnimated = true;
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(skillsSection);
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

function animateCircularSkills() {
    const circles = document.querySelectorAll('.circle');
    
    circles.forEach((circle, index) => {
        const percent = circle.getAttribute('data-percent');
        const degree = (percent / 100) * 360;
        
        setTimeout(() => {
            circle.style.background = `conic-gradient(
                #0ef ${degree}deg,
                rgba(255, 255, 255, 0.1) ${degree}deg
            )`;
        }, index * 300);
    });
}

// Scroll Animations
function initScrollAnimations() {
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
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.project-card, .certification-card, .contact-item, .timeline-item, .education-item'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
    
    // Stagger animations for grids
    const projectCards = document.querySelectorAll('.project-card');
    const certificationCards = document.querySelectorAll('.certification-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
    
    certificationCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.3}s`;
    });
}

// Contact Form Functions
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmission);
        
        // Add real-time validation
        const formInputs = contactForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    field.style.borderColor = '#ff4444';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ff4444;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: block;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = 'rgba(0, 238, 255, 0.2)';
    
    const errorMessage = field.parentNode.querySelector('.field-error');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function handleContactSubmission(e) {
    e.preventDefault();
    
    const formFields = e.target.querySelectorAll('.form-control');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Validate all fields
    let isValid = true;
    formFields.forEach(field => {
        const fieldValid = validateField({ target: field });
        if (!fieldValid) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Please fix the errors in the form before submitting.', 'error');
        return;
    }
    
    // Get form data
    const name = formFields[0].value.trim();
    const email = formFields[1].value.trim();
    const subject = formFields[2].value.trim();
    const message = formFields[3].value.trim();
    
    // Disable form during submission
    formFields.forEach(field => field.disabled = true);
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate form submission
    setTimeout(() => {
        showNotification(`Thank you ${name}! Your message has been sent successfully. I'll get back to you soon at ${email}.`, 'success');
        
        // Reset form
        e.target.reset();
        
        // Re-enable form
        formFields.forEach(field => {
            field.disabled = false;
            clearFieldError(field);
        });
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
        
        // Log submission for development
        console.log('Form submitted:', { name, email, subject, message });
    }, 1500);
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const iconMap = {
        success: '✓',
        error: '✗',
        info: 'ℹ',
        warning: '⚠'
    };
    
    const colorMap = {
        success: '#0ef',
        error: '#ff4444',
        info: '#666',
        warning: '#ffa500'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${iconMap[type]}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colorMap[type]};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-family: inherit;
        font-size: 0.9rem;
        line-height: 1.4;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
    `;
    
    const messageElement = notification.querySelector('.notification-message');
    messageElement.style.cssText = `
        flex: 1;
        word-wrap: break-word;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        line-height: 1;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual close
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    if (notification && notification.parentElement) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }
}

// Performance optimization: Throttle function
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

// Project card interactions
function initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add loading animation and entrance effects
window.addEventListener('load', function() {
    // Remove any loading screens
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Initialize additional interactions
    initProjectInteractions();
    
    // Start entrance animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'slideInUp 1s ease-out';
    }
    
    console.log('Portfolio fully loaded and initialized');
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    updateActiveNavigation();
});

// Keyboard navigation and accessibility
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu and notifications
    if (e.key === 'Escape') {
        closeMobileMenu();
        
        // Close any open notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => removeNotification(notification));
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', throttle(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}, 250));

// Handle all internal link clicks
document.addEventListener('click', function(e) {
    // Handle internal navigation links
    if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
        const link = e.target.matches('a[href^="#"]') ? e.target : e.target.closest('a[href^="#"]');
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        if (targetId) {
            scrollToSection(targetId);
        }
    }
});

// Console welcome message
console.log('%c🚀 Mayur Mane Patil Portfolio', 'color: #0ef; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to my portfolio! Feel free to explore the code.', 'color: #ccc; font-size: 14px;');
console.log('%cBuilt with vanilla JavaScript, HTML5, and modern CSS', 'color: #888; font-size: 12px;');