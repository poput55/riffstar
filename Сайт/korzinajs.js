function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('total');
    cartList.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <div>${item.name} - ${item.price} руб.</div>
            <button onclick="removeFromCart('${item.name}')">Удалить</button>
        `;
        cartList.appendChild(div);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = `Общая сумма: ${totalPrice} руб.`;
}

function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartDisplay();
}

function purchaseItems() {
    alert('Спасибо за покупку!');
    clearCart();
}

window.onload = updateCartDisplay;
