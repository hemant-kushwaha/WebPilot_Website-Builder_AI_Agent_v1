/* --- Menu Data & Application Logic --- */

const menuItems = [
    {
        id: 'm1',
        name: 'Truffle Mushroom Bruschetta',
        category: 'starters',
        price: 14.50,
        image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&q=80&w=600',
        description: 'Toasted artisan sourdough topped with wild sautéed porcini mushrooms, black truffle paste, and whipped ricotta.',
        tag: 'Popular',
        dietary: ['Vegetarian']
    },
    {
        id: 'm2',
        name: 'Crispy Calamari Fritti',
        category: 'starters',
        price: 16.00,
        image: 'https://images.unsplash.com/photo-1599487484170-7c1e6e5fa8ad?auto=format&fit=crop&q=80&w=600',
        description: 'Lightly battered tender baby squid fried to golden perfection, served with lemon garlic aioli and fresh parsley.',
        tag: 'Chef Pick',
        dietary: ['Seafood']
    },
    {
        id: 'm3',
        name: 'Burrata Caprese Salad',
        category: 'starters',
        price: 15.00,
        image: 'https://images.unsplash.com/photo-1592417817098-8f3d691a4bf5?auto=format&fit=crop&q=80&w=600',
        description: 'Creamy artisanal burrata cheese, heirloom vine-ripened tomatoes, fresh basil pesto, and aged balsamic reduction.',
        tag: 'Organic',
        dietary: ['Vegetarian', 'Gluten-Free']
    },
    {
        id: 'm4',
        name: 'Pan-Seared Chilean Sea Bass',
        category: 'mains',
        price: 42.00,
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600',
        description: 'Melt-in-your-mouth sea bass served over saffron risotto, baby bok choy, and ginger lemongrass glaze.',
        tag: 'Bestseller',
        dietary: ['Gluten-Free']
    },
    {
        id: 'm5',
        name: 'Handmade Tagliatelle Bolognese',
        category: 'mains',
        price: 26.00,
        image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281246?auto=format&fit=crop&q=80&w=600',
        description: 'Slow-cooked traditional 8-hour beef ragu tossed with fresh egg tagliatelle pasta and freshly grated Parmigiano-Reggiano.',
        tag: 'Classic',
        dietary: []
    },
    {
        id: 'm6',
        name: 'Herb-Crusted Rack of Lamb',
        category: 'mains',
        price: 46.00,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
        description: 'New Zealand tender lamb chops crusted with rosemary and thyme, served with garlic potato mash and red wine reduction.',
        tag: 'Signature',
        dietary: ['Gluten-Free']
    },
    {
        id: 'm7',
        name: 'Wood-Fired Truffle Margherita Pizza',
        category: 'pizza',
        price: 22.00,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600',
        description: 'San Marzano tomato sauce, fresh fior di latte mozzarella, basil leaves, extra virgin olive oil, and a drizzle of truffle oil.',
        tag: 'Wood-Fired',
        dietary: ['Vegetarian']
    },
    {
        id: 'm8',
        name: 'Prosciutto & Arugula Pizza',
        category: 'pizza',
        price: 25.00,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
        description: 'Mozzarella base topped with aged San Daniele prosciutto, wild baby arugula, cherry tomatoes, and shaved parmesan flakes.',
        tag: 'Popular',
        dietary: []
    },
    {
        id: 'm9',
        name: 'Classic Tiramisu al Mascarpone',
        category: 'desserts',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600',
        description: 'Italian ladyfingers soaked in dark roast espresso and liqueur, layered with rich velvety mascarpone cream and cocoa dust.',
        tag: 'Must Try',
        dietary: ['Vegetarian']
    },
    {
        id: 'm10',
        name: 'Molten Lava Chocolate Cake',
        category: 'desserts',
        price: 13.50,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
        description: 'Warm Valrhona dark chocolate cake with a gooey flowing center, served alongside Madagascar vanilla bean gelato.',
        tag: 'Sweet',
        dietary: ['Vegetarian']
    },
    {
        id: 'm11',
        name: 'Artisan Chianti Classico (Glass)',
        category: 'drinks',
        price: 14.00,
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600',
        description: 'Bold Tuscan red wine with notes of ripe cherry, violet, and subtle earthy oak spices. 2018 vintage.',
        tag: 'Sommelier Pick',
        dietary: ['Vegan', 'Gluten-Free']
    },
    {
        id: 'm12',
        name: 'Signature Passionfruit Basil Mojito',
        category: 'drinks',
        price: 15.00,
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600',
        description: 'White rum, fresh passionfruit puree, muddled sweet basil leaves, lime juice, and sparkling club soda.',
        tag: 'Refreshing',
        dietary: ['Vegan', 'Alcohol-Free Option']
    }
];

// Shopping Cart State
let cart = JSON.parse(localStorage.getItem('gourmet_cart')) || [];
let discountApplied = false;
let discountRate = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Set Current Year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initialize Menu
    renderMenu('all');

    // Setup Event Listeners
    setupNavigation();
    setupCartDrawer();
    setupMenuTabs();
    setupTestimonials();
    setupForms();

    // Update cart UI on load
    updateCartUI();
});

/* --- Navigation & Sticky Header --- */
function setupNavigation() {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const promoBanner = document.getElementById('promo-banner');
    const closeBanner = document.getElementById('close-banner');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    if (closeBanner) {
        closeBanner.addEventListener('click', () => {
            promoBanner.style.display = 'none';
        });
    }
}

/* --- Render Menu Items --- */
function renderMenu(category) {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = '';

    const filtered = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);

    if (filtered.length === 0) {
        grid.innerHTML = `<p class="text-center" style="grid-column: 1/-1; padding: 40px; color: var(--gray);">No dishes found in this category.</p>`;
        return;
    }

    filtered.forEach(item => {
        const dietaryHtml = item.dietary.map(d => `<span>${d}</span>`).join('');
        
        const card = document.createElement('div');
        card.className = 'menu-item-card';
        card.innerHTML = `
            <div class="menu-item-img">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <span class="menu-item-tag">${item.tag}</span>
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3>${item.name}</h3>
                    <span class="price">$${item.price.toFixed(2)}</span>
                </div>
                <p>${item.description}</p>
                <div class="menu-item-footer">
                    <div class="dietary-tags">
                        ${dietaryHtml}
                    </div>
                    <button class="btn btn-sm btn-primary add-to-cart-btn" data-id="${item.id}">
                        <i class="fa-solid fa-plus"></i> Add
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Attach event listeners to add buttons
    document.querySelectorAll('.add-to-cart-btn, .add-to-cart-direct').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnEl = e.currentTarget;
            let itemToAdd;

            if (btnEl.classList.contains('add-to-cart-direct')) {
                itemToAdd = {
                    id: btnEl.dataset.id,
                    name: btnEl.dataset.name,
                    price: parseFloat(btnEl.dataset.price),
                    image: btnEl.dataset.img
                };
            } else {
                const id = btnEl.dataset.id;
                const found = menuItems.find(m => m.id === id);
                if (found) {
                    itemToAdd = {
                        id: found.id,
                        name: found.name,
                        price: found.price,
                        image: found.image
                    };
                }
            }

            if (itemToAdd) {
                addToCart(itemToAdd);
            }
        });
    });
}

/* --- Menu Category Tabs --- */
function setupMenuTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            const category = e.target.dataset.category;
            renderMenu(category);
        });
    });
}

/* --- Shopping Cart Drawer & Logic --- */
function setupCartDrawer() {
    const cartBtn = document.getElementById('cart-btn');
    const closeCart = document.getElementById('close-cart');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const startShoppingBtn = document.getElementById('start-shopping-btn');
    const applyPromoBtn = document.getElementById('apply-promo-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    const orderModal = document.getElementById('order-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    const toggleCart = () => {
        cartDrawer.classList.toggle('open');
        cartOverlay.classList.toggle('active');
    };

    cartBtn.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
    
    if (startShoppingBtn) {
        startShoppingBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCart();
            document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', () => {
            const codeInput = document.getElementById('promo-code-input').value.trim().toUpperCase();
            if (codeInput === 'HAVEN20') {
                discountApplied = true;
                discountRate = 0.20;
                showNotification('Promo code "HAVEN20" applied! 20% OFF.');
                updateCartUI();
            } else {
                alert('Invalid promo code. Try "HAVEN20"');
            }
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            
            // Generate Random Order ID
            const orderId = '#GH-' + Math.floor(10000 + Math.random() * 90000);
            document.getElementById('modal-order-id').textContent = orderId;

            // Clear Cart
            cart = [];
            discountApplied = false;
            discountRate = 0;
            saveCart();
            updateCartUI();

            // Close Drawer & Open Modal
            toggleCart();
            orderModal.classList.add('active');
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            orderModal.classList.remove('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.classList.remove('active');
        }
    });
}

function addToCart(item) {
    const existingIndex = cart.findIndex(c => c.id === item.id);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    
    // Open drawer automatically on add
    document.getElementById('cart-drawer').classList.add('open');
    document.getElementById('cart-overlay').classList.add('active');
    
    showNotification(`Added ${item.name} to your order!`);
}

function updateCartQuantity(id, change) {
    const index = cart.findIndex(c => c.id === id);
    if (index > -1) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        saveCart();
        updateCartUI();
    }
}

function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('gourmet_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const drawerItemCount = document.getElementById('drawer-item-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartFooter = document.getElementById('cart-footer');
    const emptyCart = document.getElementById('empty-cart');
    
    const subtotalEl = document.getElementById('cart-subtotal-price');
    const discountRow = document.getElementById('cart-discount-row');
    const discountEl = document.getElementById('cart-discount-price');
    const totalEl = document.getElementById('cart-total-price');

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;
    drawerItemCount.textContent = totalCount;

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartFooter.style.display = 'none';
        // Remove existing items if any
        Array.from(cartItemsContainer.querySelectorAll('.cart-item-card')).forEach(el => el.remove());
        return;
    }

    emptyCart.style.display = 'none';
    cartFooter.style.display = 'block';

    // Clear previous item cards
    Array.from(cartItemsContainer.querySelectorAll('.cart-item-card')).forEach(el => el.remove());

    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const card = document.createElement('div');
        card.className = 'cart-item-card';
        card.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="price">$${itemTotal.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateCartQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQuantity('${item.id}', 1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
        `;
        cartItemsContainer.insertBefore(card, emptyCart);
    });

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    let discountAmount = 0;
    if (discountApplied) {
        discountAmount = subtotal * discountRate;
        discountRow.style.display = 'flex';
        discountEl.textContent = `-$${discountAmount.toFixed(2)}`;
    } else {
        discountRow.style.display = 'none';
    }

    const finalTotal = subtotal - discountAmount;
    totalEl.textContent = `$${finalTotal.toFixed(2)}`;
}

/* --- Notification Toast --- */
function showNotification(message) {
    const existingToast = document.getElementById('toast-notification');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%) translateY(100px)',
        background: 'var(--dark)',
        color: 'var(--white)',
        padding: '12px 24px',
        borderRadius: '50px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        zIndex: '1400',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontWeight: '600',
        fontSize: '0.9rem',
        transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
    });

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 50);

    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

/* --- Testimonial Slider --- */
function setupTestimonials() {
    const cards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    const showSlide = (index) => {
        cards.forEach(c => c.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        cards[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            showSlide(idx);
        });
    });

    // Auto rotate every 6 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % cards.length;
        showSlide(currentSlide);
    }, 6000);
}

/* --- Forms Handling --- */
function setupForms() {
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('res-name').value;
            const date = document.getElementById('res-date').value;
            const time = document.getElementById('res-time').value;
            const guests = document.getElementById('res-guests').value;

            alert(`Thank you, ${name}! Your table for ${guests} guest(s) on ${date} at ${time} has been successfully reserved. We look forward to hosting you.`);
            reservationForm.reset();
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for subscribing! Check your inbox for your welcome voucher.');
            newsletterForm.reset();
        });
    }
}
