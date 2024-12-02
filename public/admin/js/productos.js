const catalogo = document.getElementById('catalogos');
const categorias = document.querySelectorAll('.categorias');

// Variables de paginación
let paginaActual = 1;
let productosPorPagina = 5; // Cambia esto según cuántos productos quieras mostrar por página
let totalPaginas = 0;
let categoriaActual = 'comidas'; // Valor inicial



// Definición de productos por categoría
let productosComidas = [
    { titulo: 'Hamburguesa', subtitulo: 'Completa', img: '../../img/Kiosco - Menú/baggio.png', precio: 1000 }
];

let productosBebidas = [
    { titulo: 'Coca-Cola', subtitulo: 'Original', img: '../../../../img/Kiosco - Menú/cocacolag.png', precio: 1000 }
];

let productosDulces = [
    { titulo: 'Turron', subtitulo: '', img: '../../img/Kiosco - Menú/alfajores/turron.png', precio: 1000 }
];

let productosGalletitas = [
    { titulo: 'Papas Fritas', subtitulo: '', img: '../../img/Kiosco - Menú/papas.png', precio: 1000 }
];

// Cargar productos de acuerdo a la categoría
function cargarProductos(categoria) {
  let productos;
  switch (categoria) {
      case 'comidas':
          productos = productosComidas;
          break;
      case 'bebidas':
          productos = productosBebidas;
          break;
      case 'dulces':
          productos = productosDulces;
          break;
      case 'galletitas':
          productos = productosGalletitas;
          break;
      default:
          productos = [];
  }

  totalPaginas = Math.ceil(productos.length / productosPorPagina); // Calcular total de páginas

  // Limitar los productos a mostrar según la página actual
  const inicio = (paginaActual - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosAPasar = productos.slice(inicio, fin); // Obtener productos para la página actual

  const productosContainer = document.getElementById(`productos-container-${categoria}`);
  productosContainer.innerHTML = ''; // Limpiar el contenedor

  productosAPasar.forEach(producto => {
      const card = document.createElement('div');
      card.className = 'cards';
      card.innerHTML = `
      <img src="${producto.img}" alt="Imagen">
      <h1>${producto.titulo}</h1>
      <span>${producto.subtitulo}</span>
      <span id=precio>Precio: $${producto.precio}</span>
      <div class="extra">
          <input type="number" name="cantidad" id="cantidad" max="10" min="1">
          <button>Añadir Al Carrito</button>
      </div>
      `;
      productosContainer.appendChild(card);
  });

  crearPaginacion(categoria); // Crear la paginación después de mostrar productos
}

// Crear botones de paginación
function crearPaginacion(categoria) {
  const paginationContainer = document.getElementById(`pagination-${categoria}`);
  paginationContainer.innerHTML = ""; // Limpiar paginación anterior

  for (let i = 1; i <= totalPaginas; i++) {
      const botonPagina = document.createElement("button");
      botonPagina.innerText = i;

      // Cambiar la página actual cuando se haga clic en el botón
      botonPagina.addEventListener("click", function() {
          paginaActual = i;
          cargarProductos(categoria); // Cargar productos de la categoría actual
      });

      if (i === paginaActual) {
          botonPagina.classList.add("pagina-activa"); // Resaltar página actual
      }

      paginationContainer.appendChild(botonPagina);
  }
}


catalogo.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
      e.preventDefault(); // Para evitar el salto del enlace

      const targetId = e.target.getAttribute('href').substring(1); // Obtener el ID del div correspondiente
      const selectedSection = document.getElementById(targetId);

      // Remover la clase 'active' de todas las secciones
      categorias.forEach((categoria) => {
          categoria.classList.remove('active');
      });

      // Agregar la clase 'active' a la sección seleccionada
      if (selectedSection) {
          selectedSection.classList.add('active');
          categoriaActual = targetId; // Actualizar la categoría actual
          cargarProductos(categoriaActual); // Cargar productos de la nueva categoría
      }

      // Guardar el valor seleccionado en localStorage
      localStorage.setItem('selectedValue', targetId);
  }
});

// Restaurar la sección activa al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const storedValue = localStorage.getItem('selectedValue');

  if (storedValue) {
      const selectedItem = document.getElementById(storedValue);
      if (selectedItem) {
          // Remover 'active' de todas las categorías y agregarla solo a la guardada
          categorias.forEach((categoria) => {
              categoria.classList.remove('active');
          });
          selectedItem.classList.add('active');
          cargarProductos(storedValue); // Cargar productos de la categoría almacenada
      }
  } else {
      cargarProductos(categoriaActual); // Cargar productos de la categoría por defecto
  }
});
