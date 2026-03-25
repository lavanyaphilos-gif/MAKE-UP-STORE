let cart = JSON.parse(localStorage.getItem('makeupCart')) || [];

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = `Cart (${cart.length})`;
    }
}

// 1. Add to Cart Logic (Shop Page)
document.querySelectorAll('.buy-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.closest('.product-card');
        if (!card) return; 

        const name = card.querySelector('h3').innerText;
        const price = card.querySelector('p').innerText;
        const product = { name, price };

        cart.push(product);
        localStorage.setItem('makeupCart', JSON.stringify(cart));
        updateCartCount();
        alert(`${name} added to your bag!`);
    });
});

// 2. Checkout Logic (Cart Page)
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