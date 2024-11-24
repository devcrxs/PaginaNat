// Selecciona elementos del DOM
const hamburger = document.querySelector(".hamburger");
const navBar = document.querySelector(".nav-bar");
const allButtonsNavBar = document.querySelectorAll('.nav-bar ul li a');
const buttonGoCreateBook = document.querySelector(".create-button-circle");

let isClickHeader = false;
let scrollTimeout;

// Toggle de la clase 'active' en el navBar cuando se hace clic en el hamburger
hamburger.addEventListener('click', () => {
  navBar.classList.toggle("active");
});

// Función para manejar el cambio de estilos en los botones de navegación durante el scroll
const handleScroll = () => {
  clearTimeout(scrollTimeout);
  const fromTop = window.scrollY;

  allButtonsNavBar.forEach(button => {
    const section = document.querySelector(button.getAttribute('href'));

    if (isInViewport(section, fromTop)) {
      updateActiveNavButton(button);
    }
  });

  // Reinicia el estado de `isClickHeader` después de un pequeño retraso
  scrollTimeout = setTimeout(() => {
    isClickHeader = false;
  }, 150);
};

// Verifica si una sección está dentro de la vista
const isInViewport = (section, fromTop) => {
  return (
    section.offsetTop - 400 <= fromTop &&
    section.offsetTop + section.offsetHeight + 400 > fromTop && !isClickHeader
  );
};

// Actualiza el botón de navegación activo
const updateActiveNavButton = (activeButton) => {
  allButtonsNavBar.forEach(button => button.classList.remove('active'));
  activeButton.classList.add('active');
};

// Añade un listener al evento de scroll
window.addEventListener('scroll', handleScroll);

// Maneja el scroll suave hacia la creación de libro/personaje
buttonGoCreateBook.addEventListener('click', (event) => {
  event.preventDefault();
  smoothScrollToSection(buttonGoCreateBook.parentElement.getAttribute('href'));
});

// Maneja el scroll suave hacia las secciones de la página cuando se hace clic en un enlace de navegación
allButtonsNavBar.forEach(link => {
  link.addEventListener('click', (event) => {
    isClickHeader = true;
    event.preventDefault();

    // Elimina la clase 'active' de todos los botones
    updateActiveNavButton(link);

    // Realiza el scroll suave hacia la sección correspondiente
    smoothScrollToSection(link.getAttribute('href'));
  });
});

// Función que realiza el scroll suave hacia una sección dada
const smoothScrollToSection = (targetId) => {
  const targetSection = document.querySelector(targetId);
  targetSection.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
};
function moveCarousel2(direction,contentItems) {
  let carouselContainer = document.querySelector(contentItems);
  const scrollAmount = 200; // Cantidad de desplazamiento
  if (direction === 'left') {
    carouselContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else if (direction === 'right') {
    carouselContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

