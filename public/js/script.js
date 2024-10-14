async function fetchProducts(category) {
    try {
        const response = await fetch(`/api/products${category ? '/' + category : ''}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

async function displayProducts(category) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '<p>Cargando productos...</p>';
    
    const products = await fetchProducts(category);
    
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>$${product.price.toFixed(2)}</p>
            <button class="buy-btn" data-id="${product.id}">Comprar</button>
        `;
        productsGrid.appendChild(productElement);
    });

    // Agregar event listeners a los botones de compra
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', (e) => buyProduct(e.target.dataset.id));
    });
}

document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelector('.category-btn.active').classList.remove('active');
        e.target.classList.add('active');
        displayProducts(e.target.dataset.category);
    });
});

document.getElementById('search-btn').addEventListener('click', async () => {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const allProducts = await fetchProducts('');
    const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>$${product.price.toFixed(2)}</p>
            <button class="buy-btn" data-id="${product.id}">Comprar</button>
        `;
        productsGrid.appendChild(productElement);
    });

    // Agregar event listeners a los botones de compra
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', (e) => buyProduct(e.target.dataset.id));
    });
});

async function buyProduct(productId) {
    try {
        const response = await fetch(`/api/products/${productId}`);
        const product = await response.json();

        const res = await fetch('/pago', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productos: [{ nombre: product.name, precio: product.price, cantidad: 1 }] })
        });

        const data = await res.json();
        window.location.href = `https://www.mercadopago.com/checkout/v1/redirect?preference-id=${data.id}`;
    } catch (error) {
        console.error('Error buying product:', error);
        alert('Hubo un error al procesar la compra. Por favor, intenta de nuevo.');
    }
}

document.getElementById('login-btn').addEventListener('click', () => {
    const userName = prompt("Por favor, ingresa tu nombre:");
    if (userName) {
        document.getElementById('user-name').textContent = userName;
        document.getElementById('login-btn').textContent = "Cerrar sesión";
    }
});

// Mostrar productos de dulces por defecto
displayProducts('dulces');