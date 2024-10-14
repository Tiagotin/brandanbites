document.addEventListener('DOMContentLoaded', async () => {
    const productosContainer = document.getElementById('productos');

    // Cargar productos
    const response = await fetch('/productos');
    const productos = await response.json();

    productos.forEach(prod => {
        const div = document.createElement('div');
        div.innerHTML = `<h2>${prod.nombre}</h2>
                         <p>${prod.descripcion}</p>
                         <p>Precio: $${prod.precio}</p>`;
        productosContainer.appendChild(div);
    });

    // Comprar productos
    document.getElementById('comprar').addEventListener('click', async () => {
        const productosSeleccionados = productos.map(p => ({ nombre: p.nombre, precio: p.precio, cantidad: 1 }));

        const res = await fetch('/pago', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productos: productosSeleccionados })
        });

        const data = await res.json();
        window.location.href = `https://www.mercadopago.com/checkout/v1/redirect?preference-id=${data.id}`;
    });
});
