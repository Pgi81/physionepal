// Selectors
const cartBadge = document.querySelector('.badge');
const cartList = document.querySelector('.list-group');
const totalElement = document.querySelector('.list-group-item strong');
let cart = [];
let total = 0;

// Function to add item to cart
function addToCart(name, price) {
  const itemIndex = cart.findIndex(item => item.name === name);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity += 1;
  } else {
    cart.push({ name, price: parseFloat(price), quantity: 1 });
  }
  updateCart();
}

// Function to update cart UI
function updateCart() {
  cartList.innerHTML = `
    ${cart.map(item => `
      <li class="list-group-item d-flex justify-content-between lh-sm">
        <div>
          <h6 class="my-0">${item.name}</h6>
          <small class="text-body-secondary">Qty: ${item.quantity}</small>
        </div>
        <span class="text-body-secondary">$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="btn btn-sm btn-danger remove-item" data-name="${item.name}">X</button>
      </li>
    `).join('')}
    <li class="list-group-item d-flex justify-content-between">
      <span>Total (USD)</span>
      <strong>$${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</strong>
    </li>
  `;
  cartBadge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Function to remove item from cart
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

// Event Listeners
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    const name = e.target.getAttribute('data-name');
    const price = e.target.getAttribute('data-price');
    addToCart(name, price);
  }

  if (e.target.classList.contains('remove-item')) {
    const name = e.target.getAttribute('data-name');
    removeFromCart(name);
  }
});

// Checkout Button
document.querySelector('.btn-primary').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert(`Proceeding to checkout with total: $${total.toFixed(2)}`);
});
