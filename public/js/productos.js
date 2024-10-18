const catalogo = document.getElementById('catalogos');
const categorias = document.querySelectorAll('.categorias');

// Variables de paginación
let paginaActual = 1;
let productosPorPagina = 5; // Cambia esto según cuántos productos quieras mostrar por página
let totalPaginas = 0;
let categoriaActual = 'comidas'; // Valor inicial



// Definición de productos por categoría
const productosComidas = [
    { titulo: 'Sebino1', subtitulo: 'mmm ñannn', img: '../../img/Sin título.png' },
    { titulo: 'Sebino2', subtitulo: 'Jugosa hamburguesa', img: '../../img/Sin título.png' },
    { titulo: 'Sebino3', subtitulo: 'Ensalada fresca', img: '../../img/Sin título.png' },
    { titulo: 'Sebino4', subtitulo: 'mmm ñannn', img: '../../img/Sin título.png' },
    { titulo: 'Sebino5', subtitulo: 'Jugosa hamburguesa', img: '../../img/Sin título.png' },
    { titulo: 'Sebino6', subtitulo: 'Ensalada fresca', img: '../../img/Sin título.png' },
    { titulo: 'Sebino7', subtitulo: 'mmm ñannn', img: '../../img/Sin título.png' },
    { titulo: 'Sebino8', subtitulo: 'Jugosa hamburguesa', img: '../../img/Sin título.png' },
    { titulo: 'Sebino9', subtitulo: 'Ensalada fresca', img: '../../img/Sin título.png' },
    { titulo: 'Sebino10', subtitulo: 'Ensalada fresca', img: '../../img/Sin título.png' },
    // Agrega más productos si es necesario
];

const productosBebidas = [
    { titulo: 'Coca-Cola', subtitulo: 'Refresco clásico', img: '../../img/Sin título.png' },
    { titulo: 'Agua', subtitulo: 'Agua mineral', img: '../../img/Sin título.png' },
    { titulo: 'Jugo', subtitulo: 'Jugo natural', img: '../../img/Sin título.png' },
    // Agrega más productos si es necesario
];

const productosDulces = [
    { titulo: 'Chocolate', subtitulo: 'Chocolate oscuro', img: '../../img/Sin título.png' },
    { titulo: 'Galleta', subtitulo: 'Galleta de vainilla', img: '../../img/Sin título.png' },
    { titulo: 'Dulce de leche', subtitulo: 'Delicioso dulce de leche', img: '../../img/productos/dulce de leche.png' },
    // Agrega más productos si es necesario
];

const productosGalletitas = [
    { titulo: 'Galletita de chocolate', subtitulo: 'Galletita deliciosa', img: '../../img/Sin título.png' },
    { titulo: 'Galletita de vainilla', subtitulo: 'Galletita suave', img: '../../img/Sin título.png' },
    { titulo: 'Galletita rellena', subtitulo: 'Galletita con relleno', img: '../../img/Sin título.png' },
    // Agrega más productos si es necesario
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
          <div class="extra"></div>
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
