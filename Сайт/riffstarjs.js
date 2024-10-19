let currentSlide = 0;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let itemToAdd = null;

function showSlide(index) {
    const slides = document.getElementById('slides');
    const totalSlides = slides.children.length;
    if (index < 0) {
        currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function showCart() {
    document.getElementById('catalog').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    cartList.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} руб.`;
        cartList.appendChild(li);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = `Общая сумма: ${totalPrice} руб.`;
}

function addToCart(name, price) {
itemToAdd = { name, price };
cart.push(itemToAdd); // Добавляем товар в массив
localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем массив в localStorage
alert(`${itemToAdd.name} добавлена в корзину!`);
}


function clearCart() {
    localStorage.removeItem('cart');
    updateCartDisplay();
}

// Обновляем отображение корзины при загрузке страницы
window.onload = updateCartDisplay;
