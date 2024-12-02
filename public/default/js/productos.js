import {
  productosComidas,
  productosBebidas,
  productosDulces,
  productosGalletitas,
  cargarProductos,
} from "../../src/products/products.js";

const catalogo = document.getElementById("catalogos");
const categorias = document.querySelectorAll(".categorias");

let paginaActual = 1;
let productosPorPagina = 5; // Cambia esto según cuántos productos quieras mostrar por página
let totalPaginas = 0;


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
  