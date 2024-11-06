hamburger = document.querySelector(".hamburger");
hamburger.onclick = function(){
  navBar = document.querySelector(".nav-bar");
  navBar.classList.toggle("active");
}

const allButtonsNavBar = document.querySelectorAll('.nav-bar ul li a');
let isClickHeader = false;
let scrollTimeout;

window.addEventListener('scroll', () => { //Darle estilos al header cuando hacemos scroll
    clearTimeout(scrollTimeout);

    let fromTop = window.scrollY;

    allButtonsNavBar.forEach(button => {

        let section = document.querySelector(button.getAttribute('href'));

        if (
            section.offsetTop - 400 <= fromTop &&
            section.offsetTop + section.offsetHeight + 400 > fromTop && !isClickHeader 
        ) {

            allButtonsNavBar.forEach(button2 => {
                button2.classList.remove('active');
            });
            button.classList.add('active');
        }
    });

    scrollTimeout = setTimeout(() => {
        isClickHeader = false;
    }, 150);
});

const buttonGoCreateBook = document.querySelector(".create-button-circle"); //Hacer scroll hacia la creacion de personajes/libro
buttonGoCreateBook.addEventListener('click', function(event) {
    event.preventDefault();
    let targetId = buttonGoCreateBook.parentElement.getAttribute('href');
    let targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
});


allButtonsNavBar.forEach(link => { //Hacer scroll hacia las secciones de la pagina

    link.addEventListener('click', function(event) {
        isClickHeader = true; 
        event.preventDefault();

        allButtonsNavBar.forEach(link => link.classList.remove('active'));

        this.classList.add('active');

        let targetId = this.getAttribute('href').substring(1);
        let targetSection = document.getElementById(targetId);

        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });
});