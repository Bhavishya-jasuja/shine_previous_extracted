// Test function to verify hamburger menu elements
function testHamburgerMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Test click event
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            // Test click detected
        });
    }
}

// New Carousel Functionality
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let autoSlideInterval;

    // Function to show slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.zIndex = '1';
        });
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        slides[index].style.opacity = '1';
        slides[index].style.zIndex = '10';
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Function to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Function to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Auto slide functionality with constant speed
    const AUTO_SLIDE_INTERVAL = 10000; // 10 seconds for better readability
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Start auto slide
    startAutoSlide();

    // Pause auto slide on hover and resume with constant timing
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        carouselContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
                resetAutoSlide();
            }
        }
    }

    // Initialize first slide
    showSlide(0);
}

// Mobile Navigation
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile nav initialized

    // Toggle mobile menu
    if (navToggle && navMenu) {
        // Remove any existing event listeners
        navToggle.removeEventListener('click', handleToggleClick);
        
        // Add new event listener
        navToggle.addEventListener('click', handleToggleClick);
        
        function handleToggleClick(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        }
    } else {
        console.error('navToggle or navMenu not found!', { navToggle, navMenu });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                // Menu closed by link click
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navToggle && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            // Menu closed by outside click
        }
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked link
            link.classList.add('active');
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations and Active Navigation
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.team-member, .service-card, .gallery-item, .contact-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Update active navigation based on scroll position
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Add scroll event listener for active navigation
    window.addEventListener('scroll', updateActiveNav);
    
    // Set initial active state
    updateActiveNav();
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
			const formData = new FormData(contactForm);
			const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const phone = contactForm.querySelector('input[type="tel"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
			
			// Build WhatsApp message
			const whatsappNumber = '918791362345'; // with country code
			const composedMessage = `New Website Inquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`;
			const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(composedMessage)}`;
			
			// Open WhatsApp chat in new tab/window
			window.open(waUrl, '_blank');
			showNotification('Opening WhatsApp to send your message...', 'success');
			contactForm.reset();
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Testimonials Carousel
function initTestimonialsCarousel() {
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });

    // Auto rotate testimonials with constant speed
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 4000);
}

// Gallery Modal Functions
function openGalleryModal(imageSrc, imageAlt) {
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('galleryModalImg');
    const caption = document.querySelector('.gallery-caption');
    
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    modalImg.alt = imageAlt;
    caption.textContent = ''; // Remove any caption text
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Initialize Gallery Modal
function initGalleryModal() {
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.querySelector('.gallery-close');
    
    // Close modal when clicking the X button
    closeBtn.addEventListener('click', closeGalleryModal);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeGalleryModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeGalleryModal();
        }
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(43, 75, 74, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #2B4B4A, #1A3A39)';
            navbar.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2B4B4A, #1A3A39);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255,255,255,0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10000;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyle);

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .submit-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Appointment Modal Functionality
function initAppointmentModal() {
    const modal = document.getElementById('appointmentModal');
    const closeBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const appointmentForm = document.getElementById('appointmentForm');
    const ctaButtons = document.querySelectorAll('.cta-button');

    // Open modal when CTA buttons are clicked
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });

    // Close modal functions
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('appointmentDate').min = today;
    }

    // Event listeners for closing modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle form submission
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(appointmentForm);
            const appointmentData = {
                patientName: formData.get('patientName'),
                patientAge: formData.get('patientAge'),
                patientGender: formData.get('patientGender'),
                patientPhone: formData.get('patientPhone'),
                patientEmail: formData.get('patientEmail'),
                appointmentDate: formData.get('appointmentDate'),
                appointmentTime: formData.get('appointmentTime'),
                treatmentType: formData.get('treatmentType'),
                patientMessage: formData.get('patientMessage')
            };

            // Build WhatsApp message
            const whatsappNumber = '918791362345'; // with country code
            const composedMessage = `New Appointment Request\n\nName: ${appointmentData.patientName}\nAge: ${appointmentData.patientAge}\nGender: ${appointmentData.patientGender}\nPhone: ${appointmentData.patientPhone}\nEmail: ${appointmentData.patientEmail || 'N/A'}\nDate: ${appointmentData.appointmentDate}\nTime: ${appointmentData.appointmentTime}\nTreatment: ${appointmentData.treatmentType}\n\nMessage:\n${appointmentData.patientMessage || 'N/A'}`;
            const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(composedMessage)}`;

            // Open WhatsApp chat in new tab/window
            window.open(waUrl, '_blank');
            showNotification('Opening WhatsApp with your appointment request...', 'success');
            
            // Reset form and close modal
            appointmentForm.reset();
            closeModal();
        });
    }
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM fully loaded
    
    // Initialize mobile navigation immediately
    initMobileNav();
    
    // Wait a bit to ensure all elements are rendered
    setTimeout(() => {
        // Test hamburger menu elements first
        testHamburgerMenu();
        
        // Initialize all functionality
        initCarousel();
        initFAQ();
        initSmoothScrolling();
        initScrollAnimations();
        initContactForm();
        initAppointmentModal();
        initTestimonialsCarousel();
        initGalleryModal();
        initNavbarScroll();
        
        // All functions initialized
    }, 100);
});

// Progressive lazy-loading enhancement for images
document.addEventListener('DOMContentLoaded', function() {
    const allImages = Array.from(document.images);
    const criticalSelectors = [
        '.logo-image',
        '.carousel-slide:first-child img'
    ];
    const isCritical = (img) => criticalSelectors.some(sel => {
        try { return img.matches(sel); } catch { return false; }
    });

    allImages.forEach(img => {
        if (!isCritical(img)) {
            if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
            if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
        } else {
            img.setAttribute('fetchpriority', 'high');
        }
    });
});

// Floating Action Buttons Functionality
function initFloatingButtons() {
    const goToTopBtn = document.getElementById('goToTop');
    
    // Show/hide go to top button based on scroll position
    function toggleGoToTopButton() {
        if (window.scrollY > 300) {
            goToTopBtn.classList.add('show');
        } else {
            goToTopBtn.classList.remove('show');
        }
    }
    
    // Go to top functionality
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Event listeners
    if (goToTopBtn) {
        goToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', toggleGoToTopButton);
    
    // Initial check
    toggleGoToTopButton();
}

// Initialize floating buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFloatingButtons();
});

