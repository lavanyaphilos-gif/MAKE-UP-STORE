let cart = JSON.parse(localStorage.getItem('makeupCart')) || [];

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = `Cart (${cart.length})`;
    }
}

// Setup "Add to Cart" Buttons
document.querySelectorAll('.buy-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.closest('.product-card') || button.parentElement;
        const name = card.querySelector('h3').innerText;
        const price = card.querySelector('p').innerText;
        const product = { name, price };

        // Talk to the server
        fetch('/add-to-cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            cart.push(product);
            localStorage.setItem('makeupCart', JSON.stringify(cart));
            updateCartCount();
            alert(`${name} added to your beauty bag and saved to the cloud!`);
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Saved locally, but couldn't reach the database.");
        });
    });
});

updateCartCount();