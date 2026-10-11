// Mock JSON Data for Services
const services = [
    { id: 1, name: "Express Wash & Vacuum", category: "express", price: 150 },
    { id: 2, name: "Full Interior Detailing", category: "full", price: 450 },
    { id: 3, name: "Exterior Polish & Wax", category: "full", price: 600 },
    { id: 4, name: "Engine Bay Wash", category: "add-ons", price: 120 },
    { id: 5, name: "Headlight Restoration", category: "add-ons", price: 200 },
    { id: 6, name: "Quick Paint Touchup", category: "express", price: 180 }
];

// State Management
let cart = JSON.parse(localStorage.getItem('userCart')) || [];

// Render Services to Grid
function renderServices(filterCategory = 'all') {
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = '';

    const filtered = filterCategory === 'all' 
        ? services 
        : services.filter(s => s.category === filterCategory);

    filtered.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <h3>${service.name}</h3>
            <div class="price">R${service.price}</div>
            <button class="add-btn" onclick="addToCart(${service.id})">Add to Booking</button>
        `;
        grid.appendChild(card);
    });
}

// Add Item to Cart
function addToCart(id) {
    const service = services.find(s => s.id === id);
    cart.push(service);
    updateCart();
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update Cart Display & LocalStorage
function updateCart() {
    localStorage.setItem('userCart', JSON.stringify(cart));
    const cartList = document.getElementById('cartList');
    const totalAmount = document.getElementById('totalAmount');

    if (cart.length === 0) {
        cartList.innerHTML = `<p style="color: var(--muted);">No services selected yet.</p>`;
        totalAmount.innerText = '0';
        return;
    }

    cartList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name} (R${item.price})</span>
            <button class="remove-btn" onclick="removeFromCart(${index})">✕</button>
        `;
        cartList.appendChild(div);
    });

    totalAmount.innerText = total;
}

// Filter Button Click Handlers
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderServices(e.target.dataset.category);
    });
});

// Checkout Action
function checkout() {
    if (cart.length === 0) {
        alert("Please add at least one service to your booking.");
        return;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Booking confirmed! Total amount: R${total}. Thank you for using ProBooking.`);
    cart = [];
    updateCart();
}

// Initialize Page
renderServices();
updateCart();