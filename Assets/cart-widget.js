document.addEventListener('DOMContentLoaded', function () {
    const cartDataUrl = '/cart.js'; // URL de la API del carrito de Shopify

    // Obtener los datos del carrito desde la API de Shopify
    fetch(cartDataUrl)
        .then(response => response.json())
        .then(data => {
            renderCartItems(data.items);
            updateSubtotal(data.items);
        })
        .catch(error => console.error('Error fetching cart data:', error));

    // Función para formatear los precios
    function formatPrice(price) {
        const formatter = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });

        return formatter.format(price / 100).replace('COP', '').trim();
    }

    // Función para renderizar los ítems del carrito
    function renderCartItems(items) {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        items.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
        <div class="cart-item-details">
          <span class="cart-item-name">${item.title}</span>
          <span class="cart-item-price">${formatPrice(item.price)}</span>
          <div class="cart-item-quantity-controls">
            <button class="cart-item-decrease" data-id="${item.id}">-</button>
            <input type="number" value="${item.quantity}" class="cart-item-quantity" data-id="${item.id}" readonly>
            <button class="cart-item-increase" data-id="${item.id}">+</button>
          </div>
          <button class="cart-item-remove" data-id="${item.id}">Eliminar</button>
        </div>
      `;
            cartItemsContainer.appendChild(itemElement);
        });

        addEventListeners();
    }

    // Función para agregar los event listeners
    function addEventListeners() {
        document.querySelectorAll('.cart-item-decrease').forEach(button => {
            button.addEventListener('click', handleDecreaseQuantity);
        });

        document.querySelectorAll('.cart-item-increase').forEach(button => {
            button.addEventListener('click', handleIncreaseQuantity);
        });

        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', handleItemRemove);
        });
    }

    // Función para manejar la disminución de cantidad
    function handleDecreaseQuantity(event) {
        const itemId = event.target.getAttribute('data-id');
        const quantityInput = document.querySelector(`.cart-item-quantity[data-id="${itemId}"]`);
        let newQuantity = parseInt(quantityInput.value) - 1;

        if (newQuantity < 1) {
            newQuantity = 0;
        }

        updateCartItem(itemId, newQuantity);
    }

    // Función para manejar el incremento de cantidad
    function handleIncreaseQuantity(event) {
        const itemId = event.target.getAttribute('data-id');
        const quantityInput = document.querySelector(`.cart-item-quantity[data-id="${itemId}"]`);
        let newQuantity = parseInt(quantityInput.value) + 1;

        updateCartItem(itemId, newQuantity);
    }

    // Función para manejar la eliminación de ítems
    function handleItemRemove(event) {
        const itemId = event.target.getAttribute('data-id');

        updateCartItem(itemId, 0);
    }

    // Función para actualizar ítems del carrito
    function updateCartItem(itemId, quantity) {
        fetch('/cart/change.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: itemId,
                quantity: quantity
            })
        })
            .then(response => response.json())
            .then(data => {
                renderCartItems(data.items);
                updateSubtotal(data.items);
            })
            .catch(error => console.error('Error updating cart item:', error));
    }

    // Función para actualizar el subtotal
    function updateSubtotal(items) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('cart-subtotal').textContent = formatPrice(subtotal);
    }
});