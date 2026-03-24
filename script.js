// 1. Initialize the cart from local storage
let cart = JSON.parse(localStorage.getItem('makeupCart')) || [];

// 2. Function to update the Cart Count in the Navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = `Cart (${cart.length})`;
    }
}

// 3. Setup "Add to Cart" Buttons (on index.html)
document.querySelectorAll('.buy-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.parentElement;
        const name = card.querySelector('h3').innerText;
        const price = card.querySelector('p').innerText;

        const product = { name, price };
        cart.push(product);

        localStorage.setItem('makeupCart', JSON.stringify(cart));
        updateCartCount();
        alert(`${name} has been added to your beauty bag!`);
    });
});

// 4. Setup the "Explore" Button (on index.html)
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
        // Reset totals to zero if empty
        if(document.getElementById('subtotal')) document.getElementById('subtotal').innerText = "$0.00";
        if(document.getElementById('final-total')) document.getElementById('final-total').innerText = "$0.00";
    } else {
        cartTableBody.innerHTML = ""; 
        let total = 0;

        cart.forEach((item) => {
            // Clean the price string (remove $) to do math
            const priceNum = parseFloat(item.price.replace('$', ''));
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

        // Update the summary numbers on the cart page
        if(document.getElementById('subtotal')) {
            document.getElementById('subtotal').innerText = `$${total.toFixed(2)}`;
        }
        if(document.getElementById('final-total')) {
            document.getElementById('final-total').innerText = `$${total.toFixed(2)}`;
        }
    }
}

// 6. Checkout Logic (Redirects to success.html)
const checkoutBtn = document.querySelector('.cart-summary .buy-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your bag is empty! Add some products before checking out.");
        } else {
            // Clear the cart from memory because order is placed
            localStorage.removeItem('makeupCart');
            // Move to the success page
            window.location.href = 'success.html';
        }
    });
}

// Run the count update immediately when any page loads
updateCartCount();