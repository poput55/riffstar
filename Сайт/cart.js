// Массив для хранения товаров в корзине
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Инициализация из localStorage

// Функция для добавления товара в корзину
function addToCart(name, price) {
    const item = { name, price: parseFloat(price) }; // Преобразуем цену в число
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем корзину в localStorage
    alert(`${name} добавлена в корзину!`);
    updateCartDisplay();
}

// Функция для получения товаров из корзины
function getCartItems() {
    return cart;
}

// Функция для удаления товара из корзины
function removeFromCart(index) {
    if (index > -1) {
        cart.splice(index, 1); // Удаляем товар по индексу
        localStorage.setItem('cart', JSON.stringify(cart)); // Обновляем localStorage
        alert("Товар удален из корзины.");
        updateCartDisplay(); // Обновляем отображение корзины после удаления
    }
}

// Функция для очистки корзины
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart)); // Обновляем localStorage
    alert("Корзина очищена.");
    updateCartDisplay(); // Обновляем отображение корзины после очистки
}

// Функция для обновления отображения корзины
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById("cartItems");
    const totalDiv = document.getElementById("total");
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "Ваша корзина пуста.";
        totalDiv.innerHTML = "Общая сумма: 0 руб.";
    } else {
        cartItemsDiv.innerHTML = cart.map((item, index) => 
            `<div class="cart-item">${item.name} - ${item.price.toFixed(2)} руб. <button onclick="removeFromCart(${index})">Удалить</button></div>`
        ).join("");
        totalDiv.innerHTML = `Общая сумма: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)} руб.`;
    }
}

function updateTotal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = cart.reduce((sum, product) => sum + product.price, 0);
    document.getElementById('total').innerText = `Общая сумма: ${total} руб.`;
}

// Обновляем отображение корзины при загрузке страницы
updateCartDisplay();

// Добавление обработчиков событий для кнопок "Добавить в корзину"
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.product button');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.parentElement;
            const productName = productElement.querySelector('h3').textContent;
            const productPrice = productElement.querySelector('p').textContent.replace('Цена: ', '').replace(' руб.', '');
            addToCart(productName, productPrice);
        });
    });
});
