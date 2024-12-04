import { obtenerProductos } from "../../src/products/products.js";
import { renderizarProductos, crearPaginacion } from "../../src/products/ui.js";

const catalogo = document.getElementById("catalogos");
const categorias = document.querySelectorAll(".categorias");

let paginaActual = 1;
let productosPorPagina = 10;


function asignarEventosContadores() {
  const contadores = document.querySelectorAll(".cantidadProd");

  contadores.forEach((contador) => {
      const restar = contador.querySelector(".restar");
      const sumar = contador.querySelector(".sumar");
      const pCantidad = contador.querySelector(".cantidad");
      const botonCarrito = contador.parentElement.querySelector(".addCarrito");
      const min = 1;
      const max = 9;

      let cantidadActual = parseInt(pCantidad.innerHTML);

      restar.addEventListener("click", () => {
          if (cantidadActual <= min) {
              alert("Superaste el Mínimo");
          } else {
              cantidadActual -= 1;
              pCantidad.innerHTML = cantidadActual;
              console.log(cantidadActual);
          }
      });

      sumar.addEventListener("click", () => {
          if (cantidadActual >= max) {
              alert("Superaste el Máximo");
          } else {
              cantidadActual += 1;
              pCantidad.innerHTML = cantidadActual;
              console.log(cantidadActual);
          }
      });

      botonCarrito.addEventListener("click", () => {
          cantidadActual = min;
          pCantidad.innerHTML = cantidadActual;
          console.log(`Contador restablecido a ${cantidadActual}`);
          alert('Producto Agregado')
      });
  });
}




function cargarProductosPorPagina(categoria) {
  const productos = obtenerProductos(categoria);
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  const inicio = (paginaActual - 1) * productosPorPagina;
  const productosEnPagina = productos.slice(
    inicio,
    inicio + productosPorPagina
  );

  categorias.forEach((cat) => cat.classList.remove("active"));
  document.getElementById(categoria).classList.add("active"); // Resaltar categoría actual

  renderizarProductos(productosEnPagina, `productos-container-${categoria}`);
  asignarEventosContadores();
  
  

  crearPaginacion(totalPaginas, categoria, (nuevaPagina) => {
    paginaActual = nuevaPagina;
    cargarProductosPorPagina(categoria);
  });
}

catalogo.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    const categoria = e.target.getAttribute("href").substring(1);

    categorias.forEach((cat) => cat.classList.remove("active"));
    document.getElementById(categoria).classList.add("active");

    paginaActual = 1; // Reiniciar página a la primera
    cargarProductosPorPagina(categoria);
    localStorage.setItem("selectedValue", categoria); // Guardar preferencia
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const storedValue = localStorage.getItem("selectedValue") || "comidas"; // Valor predeterminado
  cargarProductosPorPagina(storedValue); // Cargar productos de la categoría
  document.getElementById(storedValue).classList.add("active"); // Resaltar categoría activa
});
