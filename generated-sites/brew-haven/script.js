// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Sticky Header & Active Nav on Scroll
const header = document.getElementById('header');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(111, 78, 55, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.04)';
    }

    // Scroll spy for active nav link
    let scrollPosition = window.scrollY + 200;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Toast notification for ordering items
function orderItem(itemName) {
    showToast(`"${itemName}" added to your order! Ready for pickup.`);
}

// Contact Form Handler
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    showToast(`Thank you, ${name}! Your message has been sent.`);
    document.getElementById('contactForm').reset();
}

// Newsletter Form Handler
function handleNewsletter(event) {
    event.preventDefault();
    showToast('Successfully subscribed to Brew Haven newsletters!');
    event.target.reset();
}

// Toast Function
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}
