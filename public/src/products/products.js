export let productosComidas = [
    { titulo: 'Hamburguesa', subtitulo: 'Completa', img: '../../../src/products/comidas/hamburguesa.png', precio: 1000 },
    { titulo: 'Pebete', subtitulo: 'único', img: '../../../src/products/comidas/pebete.png', precio: 9000 },
    { titulo: 'Sanguche de Milanesa', subtitulo: 'Completo', img: '../../../src/products/comidas/sanguche.png', precio: 1000 },
    { titulo: 'Hamburguesa', subtitulo: 'Completa', img: '../../../src/products/comidas/hamburguesa.png', precio: 1000 },
    { titulo: 'Pebete', subtitulo: 'único', img: '../../../src/products/comidas/pebete.png', precio: 1000 },
    { titulo: 'Sanguche de Milanesa', subtitulo: 'Completo', img: '../../../src/products/comidas/sanguche.png', precio: 1000 },
    { titulo: 'Hamburguesa', subtitulo: 'Completa', img: '../../../src/products/comidas/hamburguesa.png', precio: 1000 },
    { titulo: 'Pebete', subtitulo: 'único', img: '../../../src/products/comidas/pebete.png', precio: 1000 },
    { titulo: 'Sanguche de Milanesa', subtitulo: 'Completo', img: '../../../src/products/comidas/sanguche.png', precio: 1000 },
];

export let productosBebidas = [
    { titulo: 'Coca-Cola', subtitulo: 'Original', img: '../../../src/products/bebidas/cocacolag.png', precio: 100 },
    { titulo: 'Baggio', subtitulo: 'Chico', img: '../../../src/products/bebidas/baggiochiquito.png', precio: 100 },
    { titulo: 'Baggio', subtitulo: 'Grande', img: '../../../src/products/bebidas/baggiolitro.png', precio: 100 }
];

export let productosDulces = [
    { titulo: 'Mentitas', subtitulo: 'Multifruta', img: '../../../src/products/dulces/mentitas.png', precio: 1000 },
    { titulo: 'Mentitas', subtitulo: 'Menta', img: '../../../src/products/dulces/mentitas.png', precio: 1000 },
    { titulo: 'Pico Dulce', subtitulo: 'Caramelo', img: '../../../src/products/dulces/picodulce.jpg', precio: 400}
];

export let productosGalletitas = [
    { titulo: 'Papas Fritas', subtitulo: '', img: '../../../src/products/snacks/papas.png', precio: 1800 },
    { titulo: 'Alfajor Block', subtitulo: '', img: '../../../src/products/snacks/alfajorblock.png', precio: 1000 }
];

// Retorna productos según categoría
export function obtenerProductos(categoria) {
    switch (categoria) {
        case '':
        case 'comidas':
            return productosComidas;
        case 'bebidas':
            return productosBebidas;
        case 'dulces':
            return productosDulces;
        case 'galletitas':
            return productosGalletitas;
        default:
            return productosComidas; // Categoría por defecto
    }
}

