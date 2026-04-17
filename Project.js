/* --- STATE MANAGEMENT --- */
let cart = []; // Array to store objects like { name: "Watch", price: 299 }

/* Toggles the sidebar visibility
@param {number} width - The width in pixels (0 to close, 350 to open) */
function toggleCart(width) {
    document.getElementById("mySidebar").style.width = width + "px";
    document.body.style.marginRight = width + "px";
}

//Adds a product to the cart and updates the display
function addToCart(name, price) {
    // Add the new item to our array
    cart.push({ name, price });
    
    // Refresh the visual list and open the cart
    updateUI();
    toggleCart(350);
}

//Removes an item from the cart based on its index
function removeFromCart(i) {
    cart.splice(i, 1); // Remove 1 element at position i
    updateUI();
}

//Simulates a checkout and clears the cart
function orderNow() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Order Placed! Thank you for the purchase.");
    cart = []; // Reset the cart array
    updateUI();
    toggleCart(0); // Close sidebar
}

//Re-renders the cart list and calculates the new total price
function updateUI() {
    const list = document.getElementById('cart-items-list');
    const totalPriceEl = document.getElementById('total-price');
    const navCountEl = document.getElementById('count-nav');
    
    list.innerHTML = ""; // Clear existing list items
    let total = 0;

    // Loop through each item in the cart array
    cart.forEach((item, i) => {
        const li = document.createElement('li');
        li.className = "cart-item";
        li.innerHTML = `
            <span>${item.name}</span> 
            <button onclick="removeFromCart(${i})" style="color: tomato; background:none; border:none; cursor:pointer; font-size: 1.2rem; font-weight: bold;">&times;</button>
        `;
        list.appendChild(li);
        total += item.price; // Accumulate price
    });

    // Update UI text values
    totalPriceEl.innerText = total;
    navCountEl.innerText = cart.length;
}

//Filters visible product cards by category
function filterItems(event, cat) {
    // Remove 'active' class from all buttons and add it to the clicked one
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Show/Hide cards based on their class names
    const cards = document.querySelectorAll('.card');
    cards.forEach(c => {
        if (cat === 'all' || c.classList.contains(cat)) {
            c.classList.remove('hidden');
        } else {
            c.classList.add('hidden');
        }
    });
}