let cart = JSON.parse(localStorage.getItem('makeupCart')) || [];

function updateCartCount() {
    const countTag = document.getElementById('cart-count');
    if (countTag) countTag.innerText = `Cart (${cart.length})`;
}

// Add Item
document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.parentElement;
        const name = card.querySelector('h3').innerText;
        const price = card.querySelector('p').innerText.replace('$', '');
        
        cart.push({ name, price: parseFloat(price) });
        localStorage.setItem('makeupCart', JSON.stringify(cart));
        updateCartCount();
        alert(`${name} added!`);
    });
});

// Render Cart
const table = document.getElementById('cart-items');
const totalTag = document.getElementById('final-total');

function renderCart() {
    if (!table) return;
    table.innerHTML = "<tr><th>Product</th><th>Price</th><th>Action</th></tr>";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><button class="remove-btn" onclick="removeItem(${index})">Remove</button></td>
            </tr>`;
    });
    if (totalTag) totalTag.innerText = `$${total.toFixed(2)}`;
}

window.removeItem = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('makeupCart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
};

const checkout = document.getElementById('checkout-btn');
if (checkout) {
    checkout.addEventListener('click', () => {
        if (cart.length === 0) return alert("Bag is empty!");
        localStorage.removeItem('makeupCart');
        window.location.href = 'success.html';
    });
}

updateCartCount();
renderCart();