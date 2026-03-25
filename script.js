let cart = JSON.parse(localStorage.getItem('makeupCart')) || [];

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = `Cart (${cart.length})`;
    }
}

// 1. Add to Cart Logic
document.querySelectorAll('.buy-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.closest('.product-card');
        if (!card) return;

        const name = card.querySelector('h3').innerText;
        const priceText = card.querySelector('p').innerText;
        const price = parseFloat(priceText.replace('$', '')); // Converts "$35.00" to 35

        const product = { name, price: price.toFixed(2) };

        cart.push(product);
        localStorage.setItem('makeupCart', JSON.stringify(cart));
        updateCartCount();
        alert(`${name} added to your bag!`);
        
        // Optional: Send to MongoDB
        fetch('/add-to-cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        }).catch(err => console.log("DB Sync failed, but saved locally."));
    });
});

// 2. Display Cart Items & Calculate Total (On cart.html)
const cartTable = document.getElementById('cart-items');
const totalDisplay = document.getElementById('final-total');

if (cartTable) {
    let total = 0;
    cartTable.innerHTML = ""; // Clear table

    cart.forEach((item) => {
        total += parseFloat(item.price);
        const row = `<tr><td>${item.name}</td><td>$${item.price}</td></tr>`;
        cartTable.innerHTML += row;
    });

    if (totalDisplay) {
        totalDisplay.innerText = `$${total.toFixed(2)}`;
    }
}

// 3. Checkout Button
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your bag is empty!");
        } else {
            localStorage.removeItem('makeupCart');
            window.location.href = 'success.html';
        }
    });
}

updateCartCount();