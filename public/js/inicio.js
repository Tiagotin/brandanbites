const categorias = document.querySelectorAll('.categorias');

// Escuchar el clic en cada .categorias
categorias.forEach(categoria => {
    categoria.addEventListener('click', (e) => {
        e.preventDefault(); // Evitar el comportamiento predeterminado de los enlaces

        const categoriaId = categoria.id; // Obtener el id del div clicado

        // Guardar el id de la categoría seleccionada en localStorage
        localStorage.setItem('selectedValue', categoriaId);

        // Redirigir a la página de catálogo
        window.location.href = '../productos/catalogo.html'; // Redirigir a catalogo.html
    });
});

// Restaurar la sección activa al cargar la página de catálogo
document.addEventListener('DOMContentLoaded', () => {
    const storedValue = localStorage.getItem('selectedValue');

    if (storedValue) {
        cargarProductos(storedValue); // Cargar productos de la categoría almacenada
    } else {
        cargarProductos(categoriaActual); // Cargar productos de la categoría por defecto
    }
});
