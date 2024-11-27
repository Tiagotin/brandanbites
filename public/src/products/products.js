export let productosComidas = [  // Definición de productos por categoría
    { titulo: 'Hamburguesa', subtitulo: 'Completa', img: 'comidas/hamburguesa.png', precio: 1000 },
    { titulo: 'Pebete', subtitulo: 'único', img: 'comidas/pebete.png', precio: 1000 },
    { titulo: 'Sanguche de Milanesa', subtitulo: 'Completo', img: 'comidas/sanguche.png', precio: 1000 }
    // Agrega más productos si es necesario
];

export let productosBebidas = [
    { titulo: 'Coca-Cola',  subtitulo: 'Original', img: 'bebidas/cocacolag.png', precio: 100},
    { titulo: 'Baggio',  subtitulo: 'Chico', img: 'bebidas/baggiochiquito.png', precio: 100},
    { titulo: 'Baggio',  subtitulo: 'Grande', img: 'bebidas/baggiolitro.png', precio: 100},
        // Agrega más productos si es necesario
];

export let productosDulces = [
    { titulo: 'Mentitas', subtitulo: 'Sabor Multifruta', img: 'dulces/mentitas.png', precio: 1000 },
    { titulo: 'Mentitas', subtitulo: 'Sabor Menta', img: 'dulces/mentitas.png', precio: 1000 },
    { titulo: 'Mentitas', subtitulo: 'Sabor Dulce de Leche', img: 'dulces/mentitas.png', precio: 1000 }
    // Agrega más productos si es necesario
];

export let productosGalletitas = [
    { titulo: 'Papas Fritas', subtitulo: '', img: 'snacks/papas.png', precio: 1800 },
    { titulo: 'Alfajor Block', subtitulo: '', img: 'snacks/alfajorblock.png', precio: 1000 },
    { titulo: 'Alfajor milka', subtitulo: '', img: 'snacks/alfajormilka.png', precio: 1000 },
    // Agrega más productos si es necesario
];

// Cargar productos de acuerdo a la categoría
export function cargarProductos(categoria) {
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
            productos = productosComidas;
    }
    return productos
  }