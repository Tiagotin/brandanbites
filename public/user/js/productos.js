import { obtenerProductos } from '../../src/products/products.js';
import { renderizarProductos, crearPaginacion } from '../../src/products/ui.js';

const catalogo = document.getElementById('catalogos');
const categorias = document.querySelectorAll('.categorias');

let paginaActual = 1;
let productosPorPagina = 4;

function cargarProductosPorPagina(categoria) {
    const productos = obtenerProductos(categoria);
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);

    const inicio = (paginaActual - 1) * productosPorPagina;
    const productosEnPagina = productos.slice(inicio, inicio + productosPorPagina);

    categorias.forEach((cat) => cat.classList.remove('active'));
    document.getElementById(categoria).classList.add('active'); // Resaltar categoría actual

    renderizarProductos(productosEnPagina, `productos-container-${categoria}`);
    crearPaginacion(totalPaginas, categoria, (nuevaPagina) => {
        paginaActual = nuevaPagina;
        cargarProductosPorPagina(categoria);
    });
}


catalogo.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const categoria = e.target.getAttribute('href').substring(1);

        categorias.forEach((cat) => cat.classList.remove('active'));
        document.getElementById(categoria).classList.add('active');

        paginaActual = 1; // Reiniciar página a la primera
        cargarProductosPorPagina(categoria);
        localStorage.setItem('selectedValue', categoria); // Guardar preferencia
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const storedValue = localStorage.getItem('selectedValue') || 'comidas'; // Valor predeterminado
    cargarProductosPorPagina(storedValue); // Cargar productos de la categoría
    document.getElementById(storedValue).classList.add('active'); // Resaltar categoría activa
});

