export function renderizarProductos(productos, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = ''; // Limpiar contenedor

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'cards';
        card.innerHTML = `
            <img src="${producto.img}" alt="${producto.titulo}" loading="lazy">
            <h1>${producto.titulo}</h1>
            <span>${producto.subtitulo}</span>
            <div class="extra">Precio: $${producto.precio}</div>
        `;
        contenedor.appendChild(card);
    });
}

export function crearPaginacion(totalPaginas, categoria, callback, paginaActual) {
    const paginationContainer = document.getElementById(`pagination-${categoria}`);
    paginationContainer.innerHTML = ''; // Limpiar paginación previa

    for (let i = 1; i <= totalPaginas; i++) {
        const boton = document.createElement('button');
        boton.innerText = i;

        if (i === paginaActual) {
            boton.classList.add('pagina-activa'); // Estilo para la página actual
        }

        boton.addEventListener('click', () => {
            callback(i); // Cambiar a la página seleccionada
        });

        paginationContainer.appendChild(boton);
    }
}