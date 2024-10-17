const catalogo = document.getElementById('catalogos');
const categorias = document.querySelectorAll('.categorias');

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
    }
  }
});
