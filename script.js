// 1. Initialize the cart from local storage
let cart = JSON.parse(localStorage.getItem('makeupCart')) || [];

// 2. Function to update the Cart Count in the Navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = `Cart (${cart.length})`;
    }
}

// 3. Setup "Add to Cart" Buttons (Sending to MongoDB + LocalStorage)
document.querySelectorAll('.buy-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.closest('.product-card') || button.parentElement;
        const name = card.querySelector('h3').innerText;
        const price = card.querySelector('p').innerText;

        const product = { name, price };

        // --- CONNECT TO BACKEND ---
        fetch('/add-to-cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Saved to MongoDB:', data);
            
            // Update Local UI
            cart.push(product);
            localStorage.setItem('makeupCart', JSON.stringify(cart));
            updateCartCount();
            
            alert(`${name} has been added to your beauty bag and saved to the cloud!`);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Could not reach the database, but saved to your browser locally.");
            
            // Fallback: still update local UI even if DB fails
            cart.push(product);
            localStorage.setItem('makeupCart', JSON.stringify(cart));
            updateCartCount();
        });
    });
});

// 4. Setup the "Explore" Button
const shopBtn = document.getElementById('shop-btn');
if (shopBtn) {
    shopBtn.addEventListener('click', function() {
        alert('Welcome to the store! Our summer collection is coming soon.');
    });
}

// 5. Cart Page Logic (cart.html)
const cartTableBody = document.getElementById('cart-items');
if (cartTableBody) {
    if (cart.length === 0) {
        cartTableBody.innerHTML = "<tr><td colspan='4'>Your bag is empty.</td></tr>";
        if(document.getElementById('subtotal')) document.getElementById('subtotal').innerText = "$0.00";
        if(document.getElementById('final-total')) document.getElementById('final-total').innerText = "$0.00";
    } else {
        cartTableBody.innerHTML = ""; 
        let total = 0;

        cart.forEach((item) => {
            const priceNum = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
            total += priceNum;

            const row = `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>1</td>
                    <td>${item.price}</td>
                </tr>
            `;
            cartTableBody.innerHTML += row;
        });

        if(document.getElementById('subtotal')) {
            document.getElementById('subtotal').innerText = `$${total.toFixed(2)}`;
        }
        if(document.getElementById('final-total')) {
            document.getElementById('final-total').innerText = `$${total.toFixed(2)}`;
        }
    }
}

// 6. Checkout Logic
const checkoutBtn = document.querySelector('.cart-summary .buy-btn');
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