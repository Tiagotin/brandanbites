import { productosComidas } from "../../src/products/products.js";
import { productosBebidas } from "../../src/products/products.js";
import { productosDulces } from "../../src/products/products.js";
import { productosGalletitas } from "../../products/products.js src/products.js";
import { cargarProductos } from "../../src/products/products.js";

console.log(cargarProductos('bebida'))

const catalogo = document.getElementById('catalogos');
const categorias = document.querySelectorAll('.categorias');



// Variables de paginación
let paginaActual = 1;
let productosPorPagina = 2;
let categoriaActual = 'comidas'; // Valor inicial


