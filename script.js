// ============================================
// DIGITAL MENU - JAVASCRIPT FUNCTIONALITY
// ============================================

// Initialize localStorage with default menu items
const DEFAULT_MENU = [
    {
        id: 1,
        name: 'Grilled Chicken Burger',
        description: 'Juicy grilled chicken with cheese and special sauce',
        price: 280,
        category: 'burgers',
        type: 'nonveg',
        rating: 4.8,
        popular: true,
        emoji: '🍔'
    },
    {
        id: 2,
        name: 'Margherita Pizza',
        description: 'Classic pizza with fresh mozzarella and basil',
        price: 350,
        category: 'pizza',
        type: 'veg',
        rating: 4.6,
        popular: false,
        emoji: '🍕'
    },
    {
        id: 3,
        name: 'Spicy Chicken Wings',
        description: 'Crispy wings with spicy chili sauce',
        price: 220,
        category: 'chicken',
        type: 'nonveg',
        rating: 4.7,
        popular: true,
        emoji: '🍗'
    },
    {
        id: 4,
        name: 'Hakka Noodles',
        description: 'Stir-fried noodles with mixed vegetables',
        price: 180,
        category: 'noodles',
        type: 'veg',
        rating: 4.5,
        popular: false,
        emoji: '🍜'
    },
    {
        id: 5,
        name: 'Biryani Special',
        description: 'Aromatic basmati rice with chicken and spices',
        price: 320,
        category: 'rice',
        type: 'nonveg',
        rating: 4.9,
        popular: true,
        emoji: '🍛'
    },
    {
        id: 6,
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        price: 100,
        category: 'drinks',
        type: 'veg',
        rating: 4.4,
        popular: false,
        emoji: '🥤'
    },
    {
        id: 7,
        name: 'Chocolate Cake',
        description: 'Rich and moist chocolate cake with frosting',
        price: 150,
        category: 'dessert',
        type: 'veg',
        rating: 4.8,
        popular: true,
        emoji: '🍰'
    }
];

// State Management
const state = {
    cart: [],
    menuItems: [],
    filters: {
        category: 'all',
        veg: false,
        nonveg: false,
        popular: false,
        price: 5000,
        search: ''
    },
    restaurantInfo: {
        name: 'FoodHub',
        welcome: 'Discover our delicious menu and order now!'
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    renderMenu();
    setupEventListeners();
    updateCartUI();
});

// Load data from localStorage
function loadFromLocalStorage() {
    const savedMenu = localStorage.getItem('menuItems');
    const savedCart = localStorage.getItem('cart');
    const savedRestaurant = localStorage.getItem('restaurantInfo');

    state.menuItems = savedMenu ? JSON.parse(savedMenu) : DEFAULT_MENU;
    state.cart = savedCart ? JSON.parse(savedCart) : [];
    state.restaurantInfo = savedRestaurant ? JSON.parse(savedRestaurant) : state.restaurantInfo;

    // Update UI with saved restaurant info
    updateRestaurantInfo();
}

// Save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('menuItems', JSON.stringify(state.menuItems));
    localStorage.setItem('cart', JSON.stringify(state.cart));
    localStorage.setItem('restaurantInfo', JSON.stringify(state.restaurantInfo));
}

// Update restaurant info in UI
function updateRestaurantInfo() {
    document.getElementById('restaurantName').textContent = state.restaurantInfo.name;
    document.getElementById('restaurantWelcome').textContent = state.restaurantInfo.welcome;
}

// Setup Event Listeners
function setupEventListeners() {
    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        state.filters.search = e.target.value.toLowerCase();
        renderMenu();
    });

    // Categories
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.filters.category = btn.dataset.category;
            renderMenu();
        });
    });

    // Filters
    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            state.filters[checkbox.dataset.filter] = checkbox.checked;
            renderMenu();
        });
    });

    // Price range
    document.getElementById('priceRange').addEventListener('input', (e) => {
        state.filters.price = parseInt(e.target.value);
        document.getElementById('priceValue').textContent = `₹${state.filters.price}`;
        renderMenu();
    });

    // Cart
    document.getElementById('cartBtn').addEventListener('click', openCart);
    document.getElementById('closeCart').addEventListener('click', closeCart);
    document.getElementById('cartOverlay').addEventListener('click', closeCart);
    document.getElementById('checkoutBtn').addEventListener('click', openCheckout);

    // Checkout
    document.getElementById('closeCheckout').addEventListener('click', closeCheckout);
    document.getElementById('checkoutForm').addEventListener('submit', generateOrderSummary);

    // Summary
    document.getElementById('closeSummary').addEventListener('click', closeSummary);
    document.getElementById('whatsappBtn').addEventListener('click', sendWhatsApp);
    document.getElementById('copyBtn').addEventListener('click', copyOrder);
    document.getElementById('printBtn').addEventListener('click', printOrder);
    document.getElementById('newOrderBtn').addEventListener('click', newOrder);

    // Admin Panel
    document.getElementById('adminToggle').addEventListener('click', toggleAdminPanel);
    document.getElementById('adminClose').addEventListener('click', closeAdminPanel);

    // Admin Tabs
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            document.querySelectorAll('.admin-tab-content').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
            document.getElementById(`${tabName}-tab`).classList.add('active');
            btn.classList.add('active');

            if (tabName === 'manage-items') {
                renderManageItems();
            }
        });
    });

    // Admin Actions
    document.getElementById('saveRestaurantInfo').addEventListener('click', saveRestaurantInfo);
    document.getElementById('addItemBtn').addEventListener('click', addMenuItem);

    // QR Code
    document.getElementById('qrBtn').addEventListener('click', generateQRCode);
    document.getElementById('closeQR').addEventListener('click', () => {
        document.getElementById('qrModal').classList.remove('open');
    });
}

// ============================================
// MENU RENDERING
// ============================================

function renderMenu() {
    const filtered = getFilteredMenu();
    const menuGrid = document.getElementById('menuGrid');

    if (filtered.length === 0) {
        menuGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #95a5a6;">No items found</p>';
        return;
    }

    menuGrid.innerHTML = filtered.map(item => `
        <div class="menu-card">
            <div class="menu-card-image">${item.emoji}</div>
            <div class="menu-card-content">
                <div class="menu-card-header">
                    <h3 class="menu-card-title">${item.name}</h3>
                </div>
                <div class="badges">
                    <span class="badge badge-${item.type}">${item.type === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}</span>
                    ${item.popular ? '<span class="badge badge-popular">⭐ Popular</span>' : ''}
                </div>
                <p class="menu-card-description">${item.description}</p>
                <div class="menu-card-footer">
                    <span class="menu-card-price">₹${item.price}</span>
                    <span class="menu-card-rating">⭐ ${item.rating}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${item.id})">Add to Cart +</button>
            </div>
        </div>
    `).join('');
}

// Get filtered menu items
function getFilteredMenu() {
    return state.menuItems.filter(item => {
        // Search filter
        if (state.filters.search && !item.name.toLowerCase().includes(state.filters.search)) {
            return false;
        }

        // Category filter
        if (state.filters.category !== 'all' && item.category !== state.filters.category) {
            return false;
        }

        // Type filters
        if (state.filters.veg && item.type !== 'veg') return false;
        if (state.filters.nonveg && item.type !== 'nonveg') return false;

        // Popular filter
        if (state.filters.popular && !item.popular) return false;

        // Price filter
        if (item.price > state.filters.price) return false;

        return true;
    });
}

// ============================================
// CART MANAGEMENT
// ============================================

function addToCart(itemId) {
    const item = state.menuItems.find(m => m.id === itemId);
    const cartItem = state.cart.find(c => c.id === itemId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        state.cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }

    saveToLocalStorage();
    updateCartUI();
    showNotification(`${item.name} added to cart!`);
}

function removeFromCart(itemId) {
    state.cart = state.cart.filter(item => item.id !== itemId);
    saveToLocalStorage();
    updateCartUI();
}

function updateQuantity(itemId, change) {
    const item = state.cart.find(c => c.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            saveToLocalStorage();
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;

    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (state.cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '₹0';
        document.getElementById('checkoutBtn').disabled = true;
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = state.cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price} x ${item.quantity}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    cartTotal.textContent = `₹${total}`;
    document.getElementById('checkoutBtn').disabled = false;
}

function openCart() {
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('cartOverlay').classList.add('open');
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
}

// ============================================
// CHECKOUT & ORDER SUMMARY
// ============================================

function openCheckout() {
    if (state.cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    document.getElementById('checkoutModal').classList.add('open');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('open');
}

function generateOrderSummary(e) {
    e.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const tableNumber = document.getElementById('tableNumber').value || 'Not specified';
    const orderNotes = document.getElementById('orderNotes').value || 'None';

    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const now = new Date();
    const dateTime = now.toLocaleString();

    // Store order data for later use
    window.currentOrder = {
        customerName,
        customerPhone,
        tableNumber,
        orderNotes,
        items: state.cart,
        total,
        dateTime,
        restaurantName: state.restaurantInfo.name
    };

    // Generate summary HTML
    const summaryHTML = `
        <div class="summary-item">
            <span class="summary-label">Restaurant:</span>
            <span class="summary-value">${state.restaurantInfo.name}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Customer Name:</span>
            <span class="summary-value">${customerName}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Phone:</span>
            <span class="summary-value">${customerPhone}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Table Number:</span>
            <span class="summary-value">${tableNumber}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Date & Time:</span>
            <span class="summary-value">${dateTime}</span>
        </div>
        <div style="margin: 15px 0; padding: 15px 0; border-top: 2px solid rgba(0, 0, 0, 0.2); border-bottom: 2px solid rgba(0, 0, 0, 0.2);">
            <h4 style="margin-bottom: 10px;">Ordered Items:</h4>
            ${state.cart.map(item => `
                <div class="summary-item">
                    <span class="summary-label">${item.name} x${item.quantity}</span>
                    <span class="summary-value">₹${item.price * item.quantity}</span>
                </div>
            `).join('')}
        </div>
        <div class="summary-item" style="font-size: 18px; font-weight: bold; margin-top: 15px;">
            <span class="summary-label">Total Amount:</span>
            <span class="summary-value">₹${total}</span>
        </div>
        ${orderNotes !== 'None' ? `
            <div class="summary-item">
                <span class="summary-label">Special Notes:</span>
                <span class="summary-value">${orderNotes}</span>
            </div>
        ` : ''}
    `;

    document.getElementById('summaryContent').innerHTML = summaryHTML;

    closeCheckout();
    document.getElementById('checkoutModal').classList.remove('open');
    document.getElementById('summaryModal').classList.add('open');
}

function closeSummary() {
    document.getElementById('summaryModal').classList.remove('open');
}

function getOrderText() {
    const order = window.currentOrder;
    let text = `${order.restaurantName} - ORDER SUMMARY\n`;
    text += `${'='.repeat(40)}\n\n`;
    text += `Customer Name: ${order.customerName}\n`;
    text += `Phone: ${order.customerPhone}\n`;
    text += `Table Number: ${order.tableNumber}\n`;
    text += `Date & Time: ${order.dateTime}\n\n`;
    text += `ITEMS:\n${'-'.repeat(40)}\n`;

    order.items.forEach(item => {
        text += `${item.name} x${item.quantity} ................ ₹${item.price * item.quantity}\n`;
    });

    text += `${'-'.repeat(40)}\n`;
    text += `TOTAL: ₹${order.total}\n`;

    if (order.orderNotes !== 'None') {
        text += `\nSpecial Notes: ${order.orderNotes}\n`;
    }

    return text;
}

function sendWhatsApp() {
    const order = window.currentOrder;
    const text = getOrderText();
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${order.customerPhone}?text=${encoded}`, '_blank');
}

function copyOrder() {
    const text = getOrderText();
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Order copied to clipboard!');
    });
}

function printOrder() {
    const order = window.currentOrder;
    const text = getOrderText();

    const printWindow = window.open('', '', 'width=600,height=800');
    printWindow.document.write(`
        <html>
            <head>
                <title>Order Summary</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    pre { font-family: monospace; white-space: pre-wrap; }
                </style>
            </head>
            <body>
                <pre>${text}</pre>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function newOrder() {
    state.cart = [];
    saveToLocalStorage();
    updateCartUI();
    closeSummary();
    closeCart();
    document.getElementById('checkoutForm').reset();
    showNotification('Order cleared. Start a new order!');
}

// ============================================
// ADMIN PANEL
// ============================================

function toggleAdminPanel() {
    const adminContent = document.getElementById('adminContent');
    if (!adminContent.classList.contains('open')) {
        const password = prompt('Enter admin password:');
        if (password === 'admin123') {
            adminContent.classList.add('open');
        } else if (password !== null) {
            alert('Invalid password!');
        }
    } else {
        adminContent.classList.remove('open');
    }
}

function closeAdminPanel() {
    document.getElementById('adminContent').classList.remove('open');
}

function saveRestaurantInfo() {
    state.restaurantInfo.name = document.getElementById('adminRestaurantName').value;
    state.restaurantInfo.welcome = document.getElementById('adminWelcomeMsg').value;
    saveToLocalStorage();
    updateRestaurantInfo();
    showNotification('Restaurant info updated!');
}

function addMenuItem() {
    const name = document.getElementById('adminItemName').value;
    const description = document.getElementById('adminItemDesc').value;
    const price = parseInt(document.getElementById('adminItemPrice').value);
    const category = document.getElementById('adminItemCategory').value;
    const type = document.getElementById('adminItemType').value;
    const rating = parseFloat(document.getElementById('adminItemRating').value);
    const popular = document.getElementById('adminItemPopular').checked;

    if (!name || !description || !price || !category) {
        alert('Please fill all required fields!');
        return;
    }

    const newItem = {
        id: state.menuItems.length > 0 ? Math.max(...state.menuItems.map(m => m.id)) + 1 : 1,
        name,
        description,
        price,
        category,
        type,
        rating,
        popular,
        emoji: '🍽️'
    };

    state.menuItems.push(newItem);
    saveToLocalStorage();
    renderMenu();

    // Clear form
    document.getElementById('adminItemName').value = '';
    document.getElementById('adminItemDesc').value = '';
    document.getElementById('adminItemPrice').value = '';
    document.getElementById('adminItemCategory').value = '';
    document.getElementById('adminItemPopular').checked = false;

    showNotification('Item added successfully!');
}

function deleteMenuItem(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        state.menuItems = state.menuItems.filter(m => m.id !== itemId);
        saveToLocalStorage();
        renderMenu();
        renderManageItems();
        showNotification('Item deleted!');
    }
}

function renderManageItems() {
    const list = document.getElementById('manageItemsList');
    list.innerHTML = state.menuItems.map(item => `
        <div class="manage-item">
            <div class="manage-item-info">
                <div class="manage-item-name">${item.name}</div>
                <div class="manage-item-price">₹${item.price} - ${item.category}</div>
            </div>
            <div class="manage-item-actions">
                <button class="delete-btn" onclick="deleteMenuItem(${item.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// ============================================
// QR CODE GENERATION
// ============================================

function generateQRCode() {
    const url = window.location.href;
    document.getElementById('qrCode').innerHTML = '';

    new QRCode(document.getElementById('qrCode'), {
        text: url,
        width: 250,
        height: 250,
        colorDark: '#1abc9c',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    document.getElementById('qrUrl').textContent = url;
    document.getElementById('qrModal').classList.add('open');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #1abc9c;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
