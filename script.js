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
        const name = card.querySelector('h3').innerText;
        const price = card.querySelector('p').innerText;
        const product = { name, price };

        fetch('/add-to-cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        })
        .then(() => {
            cart.push(product);
            localStorage.setItem('makeupCart', JSON.stringify(cart));
            updateCartCount();
            alert(`${name} added to bag!`);
        })
        .catch(err => console.error("Database error:", err));
    });
});

// 2. Checkout Logic (For the cart.html page)
const checkoutBtn = document.getElementById('checkout-btn') || document.querySelector('.cart-summary .buy-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your bag is empty!");
        } else {
            localStorage.removeItem('makeupCart');
            window.location.href = 'success.html'; // Matches your success.html file
        }
    });
}

updateCartCount();