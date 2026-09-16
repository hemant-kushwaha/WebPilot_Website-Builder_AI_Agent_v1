/* ==========================================
   FITFORGE - Premium Fitness & Wellness Brand
   JavaScript (script.js)
========================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. Sticky Header on Scroll */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* 2. Mobile Navigation Menu Toggle */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    /* 3. Active Nav Link Highlight on Scroll */
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    /* 4. Scroll Reveal Animation */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    // Trigger once on load and then on scroll
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);

    /* 5. Contact Form Validation and Submission */
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const formSuccess = document.getElementById('formSuccess');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phone === '' || re.test(phone); // Allow empty or valid phone
    }

    function setFieldError(inputElement, isError) {
        const formGroup = inputElement.parentElement;
        if (isError) {
            formGroup.classList.add('error');
            inputElement.classList.add('error');
        } else {
            formGroup.classList.remove('error');
            inputElement.classList.remove('error');
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Name validation
            if (nameInput.value.trim() === '') {
                setFieldError(nameInput, true);
                isValid = false;
            } else {
                setFieldError(nameInput, false);
            }

            // Email validation
            if (!validateEmail(emailInput.value.trim())) {
                setFieldError(emailInput, true);
                isValid = false;
            } else {
                setFieldError(emailInput, false);
            }

            // Phone validation
            if (phoneInput.value.trim() !== '' && !validatePhone(phoneInput.value.trim())) {
                setFieldError(phoneInput, true);
                isValid = false;
            } else {
                setFieldError(phoneInput, false);
            }

            // Message validation
            if (messageInput.value.trim() === '') {
                setFieldError(messageInput, true);
                isValid = false;
            } else {
                setFieldError(messageInput, false);
            }

            if (isValid) {
                // Simulate successful form submission
                contactForm.reset();
                // Clear errors
                [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
                    input.parentElement.classList.remove('error');
                    input.classList.remove('error');
                });

                formSuccess.classList.add('active');

                setTimeout(() => {
                    formSuccess.classList.remove('active');
                }, 6000);
            }
        });

        // Real-time input error clearing on typing
        [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    setFieldError(input, false);
                }
            });
        });
    }

});
