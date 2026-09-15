/* ==========================================
   HEMANT KUSHWAHA - Developer Portfolio
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
    const navLinks = document.querySelectorAll('.nav-link');

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

    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);

    /* 5. Contact Form Backend Integration & Validation */
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formSuccess = document.getElementById('formSuccess');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
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
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            let isValid = true;

            const nameValue = nameInput.value.trim();
            const emailValue = emailInput.value.trim();
            const messageValue = messageInput.value.trim();

            // Name validation
            if (nameValue === '') {
                setFieldError(nameInput, true);
                isValid = false;
            } else {
                setFieldError(nameInput, false);
            }

            // Email validation
            if (!validateEmail(emailValue)) {
                setFieldError(emailInput, true);
                isValid = false;
            } else {
                setFieldError(emailInput, false);
            }

            // Message validation
            if (messageValue === '') {
                setFieldError(messageInput, true);
                isValid = false;
            } else {
                setFieldError(messageInput, false);
            }

            if (!isValid) return;

            // Prepare loading state
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            formSuccess.classList.remove('active');

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: nameValue,
                        email: emailValue,
                        message: messageValue
                    })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    // Success state
                    contactForm.reset();
                    [nameInput, emailInput, messageInput].forEach(input => {
                        input.parentElement.classList.remove('error');
                        input.classList.remove('error');
                    });

                    formSuccess.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${data.message || 'Message sent successfully'}`;
                    formSuccess.classList.add('active');

                    setTimeout(() => {
                        formSuccess.classList.remove('active');
                    }, 6000);
                } else {
                    // Server error / validation error response
                    alert(data.message || 'Failed to send message. Please try again.');
                }
            } catch (error) {
                console.error('Network or server error:', error);
                alert('Network error. Please make sure the backend server is running.');
            } finally {
                // Restore button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });

        // Real-time input error clearing on typing
        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    setFieldError(input, false);
                }
            });
        });
    }

});
