hamburger = document.querySelector(".hamburger");
hamburger.onclick = function(){
  navBar = document.querySelector(".nav-bar");
  navBar.classList.toggle("active");
}
// Seleccionamos todos los enlaces del menú de navegación
const navLinks2 = document.querySelectorAll('.nav-bar ul li a');
let isClickHeader = false; // Inicializa la variable isClickHeader
let scrollTimeout; // Declaración del timeout

// Función para activar el enlace correspondiente al hacer scroll
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout); // Limpiar el timeout anterior

    let fromTop = window.scrollY;
    // Recorrer todos los enlaces
    navLinks2.forEach(link => {
        // Obtener la sección a la que apunta el enlace (basado en el href)
        let section = document.querySelector(link.getAttribute('href'));
        // Verificar si la sección está dentro del viewport
        if (
            section.offsetTop - 400 <= fromTop &&
            section.offsetTop + section.offsetHeight + 400 > fromTop && !isClickHeader // Usar !isClickHeader
        ) {
            // Si la sección está visible, añadir la clase 'active' al enlace
            navLinks2.forEach(link2 => {
                link2.classList.remove('active');
            });
            link.classList.add('active');
        }
    });

    // Establecer un nuevo timeout para detectar que se ha dejado de hacer scroll
    scrollTimeout = setTimeout(() => {
        isClickHeader = false; // Cambiar la variable a false cuando se ha dejado de hacer scroll
        console.log('El usuario ha dejado de hacer scroll.');
    }, 150); // Cambia 150 a la cantidad de milisegundos que desees
});

// Código para el botón "Crear Libro"
const buttonCreateBook = document.querySelector(".create-button-circle");
buttonCreateBook.addEventListener('click', function(event) {
    event.preventDefault();
    let targetId2 = buttonCreateBook.parentElement.getAttribute('href');
    let targetSection2 = document.querySelector(targetId2);
    // Desplazar suavemente a la sección objetivo
    targetSection2.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
});

// Añadir el event listener a los enlaces de la navegación
navLinks2.forEach(link => {
    // Añadimos un event listener para el evento de clic
    link.addEventListener('click', function(event) {
        isClickHeader = true; // Cambia a true cuando se hace clic en el header
        // Prevenimos el comportamiento predeterminado del enlace
        event.preventDefault();

        // Removemos la clase "active" de todos los enlaces
        navLinks2.forEach(link => link.classList.remove('active'));

        // Añadimos la clase "active" al enlace clicado
        this.classList.add('active');

        // Obtener el ID de la sección objetivo
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        // Desplazar suavemente a la sección objetivo
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // No es necesario cambiar isClickHeader aquí, se cambiará al finalizar el scroll
    });
});

let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let slider = document.querySelector(".slider");

next.addEventListener("click", function(){
    let slides = document.querySelectorAll(".slides");
    slider.appendChild(slides[0]);
});
prev.addEventListener("click", function(){
    let slides = document.querySelectorAll(".slides");
    slider.prepend(slides[slides.length - 1]);
});


//body
var bodyPartner = document.getElementById("bodyPartner");
//eyes
var eyesPartner = document.getElementById("eyesPartner");
//hair
var hairPartner = document.getElementById("hairPartner");

var glassesPartner = document.getElementById("glasses");

var containerCanvas = document.getElementById("containerCanvas");
var canvasScreen = document.getElementById("canvasScreen");
var containerCanvas2 = document.getElementById("containerCanvas2");
var canvasScreen2 = document.getElementById("canvasScreen2");

canvasScreen.width = 50;
canvasScreen.height = 50;
canvasScreen2.width = 50;
canvasScreen2.height = 50;

var charCtx = canvasScreen.getContext("2d");
var charCtx2 = canvasScreen2.getContext("2d");
//new NewChar(gender,race,ethn,hair,eyes);
function NewChar(actualCharacter,gender, skin, hair, eyes, glasses) {
  if (gender == undefined) {
    gender = "male";
    skin = 1;
    hair = [[0], [4], [48, 246, 336]];
    hair[1] = 0;
    eyes = 0;
    glasses = 0;
  }else{
    skin = 1;
    hair = [[0], [4], [48, 246, 336]];
    hair[1] = 1;
    eyes = 0;
    glasses = 0;
  }

  this.gender = gender;
  this.ethnicity = skin;
  this.hair = hair;
  this.eyes = eyes;
  this.glasses = glasses;

  this.drawMyChar = () => {

    
    actualCharacter.clearRect(0, 0, 48, 48);
    actualCharacter.filter ="brightness(" + this.ethnicity + ")";

    if (this.gender == "male") {
      actualCharacter.drawImage(bodyPartner, 48, 0, 48, 48, 0, 0, 48, 48);
    } 
    else if (this.gender == "female") {
      actualCharacter.drawImage(bodyPartner, 192, 0, 48, 48, 0, 0, 48, 48);
    } 
    else {
        actualCharacter.drawImage(bodyPartner, 48, 0, 48, 48, 0, 0, 48, 48);
    }

    actualCharacter.filter = "hue-rotate(" + this.eyes + "deg) brightness(1)";
    actualCharacter.drawImage(eyesPartner, 0 + 48, 0, 48, 48, 0, 0, 48, 48);

    actualCharacter.filter ="hue-rotate(" +this.hair[0] +"deg) brightness(" +Number(1 - this.hair[0] / 1000) +")";
    actualCharacter.drawImage(hairPartner,this.hair[2][this.hair[1]],0,48,48,0,0,48,48);

    
    actualCharacter.drawImage(glassesPartner, this.glasses, 0, 48, 40, 0, 0, 48, 48);
  };

  this.drawMyChar();
  
  this.giveBirth = (z) => {
    var x = document.createElement("IMG");
    var y = document.createElement("IMG");
    x.src = canvasScreen.toDataURL("image/png");
    y.src = canvasScreen2.toDataURL("image/png");
    x.style.width = "100px";
    y.style.width = "100px";
    document.getElementById("ContentPartner").appendChild(x);
    document.getElementById("ContentPartner").appendChild(y);
    document.getElementById("myChildren").style.display = "block"
    document.getElementById("historyP").innerText = "love story between " + document.getElementById("name1").value +  " and " + document.getElementById("name2").value;
    actualCharacter.clearRect(0, 0, 60, 60);
    char = new NewChar(charCtx,char.gender,char.ethnicity,char.hair,char.eyes);
    char2 = new NewChar(charCtx2,char2.gender,char2.ethnicity,char2.hair,char2.eyes);
    z.disabled = true;
  };
}
let cadena1 = "";
let cadena2 = "";
function SetCategoryPersonalization (idElement,type) {
  console.log(type);
  switch(type){
    case '1':
      if (cadena1.trim().length === 0) {
        cadena1 = new String(idElement);
        document.getElementById(cadena1).style.display = "block";
        return;
      }
      document.getElementById(cadena1).style.display = "none";
      cadena1 = idElement;
      document.getElementById(cadena1).style.display = "block";
    break;

    case '2':
      if (cadena2.trim().length === 0) {
        cadena2 = new String(idElement);
        document.getElementById(cadena2).style.display = "block";
        return;
      }
      document.getElementById(cadena2).style.display = "none";
      cadena2 = idElement;
      document.getElementById(cadena2).style.display = "block";
    break;
  }
  
};
window.onload = function() {
  SetCategoryPersonalization('Gender','1');
  SetCategoryPersonalization('Gender2','2');
};
const contenedores = document.querySelectorAll('.contentOptions');

contenedores.forEach(contenedor => {
  const buttons = contenedor.querySelectorAll('.buttonOption');
  
  // Añadir el evento de click a cada botón dentro de este contenedor
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Remover la clase 'selected' de todos los botones en este contenedor
      buttons.forEach(btn => btn.classList.remove('selected'));
      
      // Añadir la clase 'selected' al botón que fue clickeado
      this.classList.add('selected');
    });
  });

  // Evitar deselección al hacer clic fuera del contenedor
  document.addEventListener('click', function(event) {
    if (!contenedor.contains(event.target)) {
      const selectedButton = contenedor.querySelector('.buttonOption.selected');
      if (selectedButton) {
        selectedButton.classList.add('selected'); // Mantener el botón seleccionado
      }
    }
  });
});
let selectedCount = 0;
const maxSelected = 10;

// Función para seleccionar o previsualizar una imagen
function previewOrSelect(imgElement, imageSrc, previewIndex) {
    const wrapper = imgElement.parentNode;

    if (wrapper.getAttribute("data-selected") === "true") {
        previewImage(imageSrc,previewIndex);
        return;
    }

    if (selectedCount >= maxSelected) {
        previewImage(imageSrc);
        return;
    }
    document.querySelector("#preview-text").style.display = "none";
    wrapper.setAttribute("data-selected", "true");
    selectedCount++;
    updateCounter();
    previewImage(imageSrc,previewIndex);

    if (selectedCount >= maxSelected) {
        disableUnselectedImages();
        var button = document.getElementById("button-save-preview");
        button.disabled = false;
    }
}
let actualImageSrc;
let actualPreviewIndex;
function updatePreviewImage() {
  EditSection2(actualImageSrc, actualPreviewIndex);
}
// Función para previsualizar imagen
function previewImage(imageSrc, previewIndex) {
    EditSection2(imageSrc, previewIndex);
    actualImageSrc = imageSrc;
    actualPreviewIndex = previewIndex;
}

// Función para deseleccionar imágenes
function deselectImage(buttonElement) {
    const wrapper = buttonElement.parentNode;

    if (wrapper.getAttribute("data-selected") === "true") {
        wrapper.setAttribute("data-selected", "false");
        selectedCount--;
        updateCounter();

        if (selectedCount < maxSelected) {
            enableAllImages();
            var button = document.getElementById("button-save-preview");
            button.disabled = true;
        }

        if (selectedCount === 0) {
            clearPreview();
        }
    }
}

// Función para limpiar el área de previsualización
function clearPreview() {
    document.querySelector("#preview-text").style.display = "flex";
    ClearSection2();
}

// Función para deshabilitar las imágenes no seleccionadas
function disableUnselectedImages() {
    const allImages = document.querySelectorAll('.image-wrapper');
    allImages.forEach(wrapper => {
        if (wrapper.getAttribute("data-selected") === "false") {
            const img = wrapper.querySelector('img');
            img.classList.add('disabled');
        }
    });
}

// Función para habilitar todas las imágenes
function enableAllImages() {
    const allImages = document.querySelectorAll('.image-wrapper img');
    allImages.forEach(img => {
        img.classList.remove('disabled');
    });
}

// Función para actualizar el contador de imágenes seleccionadas
function updateCounter() {
    const counterText = document.getElementById("current-counter");
    counterText.textContent = `${selectedCount}`;
}

// Función para mover el carrusel a izquierda o derecha
function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const scrollAmount = 200; // Cantidad de desplazamiento
    if (direction === 'left') {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'right') {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}
document.addEventListener("DOMContentLoaded", () => {
  checkCarouselItems();
});

// Función para comprobar cuántos items tiene el carrusel
function checkCarouselItems() {
  const carouselItems = document.querySelectorAll('.carousel .image-wrapper');
  const carouselContainer = document.querySelector('.carousel-container');

  if (carouselItems.length > 5) {
      carouselContainer.classList.add('show-arrows');
  } else {
      carouselContainer.classList.remove('show-arrows');
  }
}

function selectOption(option) {
  const options = document.querySelectorAll('.optionCover');
  options.forEach(opt => opt.classList.remove('selectedCover'));
  option.classList.add('selectedCover');

  const infoBox = document.querySelector('.info-box-Cover');
  const images = document.querySelectorAll('.imagesCover img');

  if (option.id === 'hard-cover') {
      infoBox.textContent = 'The hard cover versions of our books have sturdy, durable covers made from high-quality materials meant to last a lifetime.';
      images[0].src = 'https://cdn.hoorayheroes.com/static/assets/web/images/product/covers/hard/01.jpg';
      images[0].alt = 'Close-up of a hard cover book showing its durability';
      images[1].src = 'https://cdn.hoorayheroes.com/static/assets/web/images/product/covers/hard/02.jpg';
      images[1].alt = 'Open hard cover book showing the quality of the materials';
  } else {
      infoBox.textContent = 'The soft cover versions of our books have soft, pliable covers made from thick, high-quality paper meant to withstand endless bending.';
      images[0].src = 'https://cdn.hoorayheroes.com/static/assets/web/images/product/covers/soft/01.jpg';
      images[0].alt = 'Close-up of a soft cover book showing its flexibility';
      images[1].src = 'https://cdn.hoorayheroes.com/static/assets/web/images/product/covers/soft/02.jpg';
      images[1].alt = 'Open soft cover book showing the quality of the paper';
  }
}
window.addEventListener('resize', setMaxLengthResponsive);
window.addEventListener('DOMContentLoaded', setMaxLengthResponsive);

function setMaxLengthResponsive() {
    const textarea = document.getElementById('textAreaDedication');
    const width = window.innerWidth; // O el tamaño del contenedor si prefieres

    let maxLength;

    if (width < 600) {
        maxLength = 200; // Por ejemplo, para pantallas pequeñas
    } else if (width >= 600 && width < 1200) {
        maxLength = 200; // Para pantallas medianas
    } else {
      maxLength = 300; // Para pantallas grandes
    }

    textarea.setAttribute('maxlength', maxLength);
}

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");
const paper5 = document.querySelector("#p5");
const paper6 = document.querySelector("#p6");
const paper7 = document.querySelector("#p7");
const paper8 = document.querySelector("#p8");
const paper9 = document.querySelector("#p9");
const paper10 = document.querySelector("#p10");
const paper11 = document.querySelector("#p11");
const paper12 = document.querySelector("#p12");


prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

let currentLocation = 1;
let numOfPapers = 12;
let maxLocation = numOfPapers + 1;

function openBook(){
  book.style.transform = "translateX(50%)";
  var x = window.matchMedia("(max-width: 600px)")
  if(x.matches){
    return;
  }
  prevBtn.style.transform = "translateX(-280px)";
  nextBtn.style.transform = "translateX(280px)";
}
function closeBook(isAtBeginning){
  if(isAtBeginning){
    book.style.transform = "translateX(0%)";
  }
  else{
    book.style.transform = "translateX(100%)";
  }
  var x = window.matchMedia("(max-width: 600px)")
  if(x.matches){
    return;
  }
  prevBtn.style.transform = "translateX(0px)";
  nextBtn.style.transform = "translateX(0px)";
}
const mediaQuery = window.matchMedia("(max-width: 500px)");
function goNextPage(){
  if(currentLocation < maxLocation){
    switch(currentLocation){
      case 1: 
      if(mediaQuery.matches){
        if(paper1.classList.contains("flipped")){
          book.style.transform =  "translateX(0)";
        }else{
          openBook();
          paper1.classList.add("flipped");
          paper1.style.zIndex = 1;
          book.style.transform =  "translateX(100%)";
          return;
        }
      }
      else{
        openBook();
        paper1.classList.add("flipped");
        paper1.style.zIndex = 1;
      }
 
      break;
      case 2:
      if(mediaQuery.matches){
        if(paper2.classList.contains("flipped")){
          book.style.transform =  "translateX(0)";
        }else{
          paper2.classList.add("flipped");
          paper2.style.zIndex = 2;
          
          return;
        }
      }
      else{
        paper2.classList.add("flipped");
        paper2.style.zIndex = 2;
      }
      
      break;
      case 3:
      if(mediaQuery.matches){
        if(paper3.classList.contains("flipped")){
          book.style.transform =  "translateX(0)";
        }else{
          paper3.classList.add("flipped");
          paper3.style.zIndex = 3;
          book.style.transform =  "translateX(100%)";
          return;
        }
      }
      else{
        paper3.classList.add("flipped");
        paper3.style.zIndex = 3;
      }
      
      break;
      case 4:
        console.log("entro");
      if(mediaQuery.matches){
        if(paper4.classList.contains("flipped")){
          book.style.transform =  "translateX(0)";
        }else{
          paper4.classList.add("flipped");
          paper4.style.zIndex = 4;
          book.style.transform =  "translateX(100%)";
          return;
        }
      }
      else{
        paper4.classList.add("flipped");
        paper4.style.zIndex = 4;
      }
      
      break;
      case 5:
      if(mediaQuery.matches){
        if(paper5.classList.contains("flipped")){
          book.style.transform =  "translateX(0)";
        }else{
          paper5.classList.add("flipped");
          paper5.style.zIndex = 5;
          book.style.transform =  "translateX(100%)";
          return;
        }
      }
      else{
        paper5.classList.add("flipped");
        paper5.style.zIndex = 5;
      }
      
      break;
      case 6:
      if(mediaQuery.matches){
        if(paper6.classList.contains("flipped")){
          book.style.transform =  "translateX(0)";
        }else{
          paper6.classList.add("flipped");
          paper6.style.zIndex = 6;
          book.style.transform =  "translateX(100%)";
          return;
        }
      }
      else{
        paper6.classList.add("flipped");
        paper6.style.zIndex = 6;
      }
      
      break;
      case 7:
      if(mediaQuery.matches){
        if(paper7.classList.contains("flipped")){
          book.style.transform =  "translateX(0)";
        }else{
          paper7.classList.add("flipped");
          paper7.style.zIndex = 7;
          book.style.transform =  "translateX(100%)";
          return;
        }
      }
      else{
        paper7.classList.add("flipped");
        paper7.style.zIndex = 7;
      }
      
      break;
      case 8:
      if(mediaQuery.matches){
        if(paper8.classList.contains("flipped")){
          book.style.transform =  "translateX(0)";
        }else{
          paper8.classList.add("flipped");
          paper8.style.zIndex = 8;
          book.style.transform =  "translateX(100%)";
          return;
        }
      }
      else{
        paper8.classList.add("flipped");
        paper8.style.zIndex = 8;
      }
      
      break;
      case 9:
      if(mediaQuery.matches){
        if(paper9.classList.contains("flipped")){
          book.style.transform =  "translateX(0)";
        }else{
          paper9.classList.add("flipped");
          paper9.style.zIndex = 9;
          book.style.transform =  "translateX(100%)";
          return;
        }
      }
      else{
        paper9.classList.add("flipped");
        paper9.style.zIndex = 9;
      }
      
      break;
      case 10:
      if(mediaQuery.matches){
        if(paper10.classList.contains("flipped")){
          book.style.transform =  "translateX(0)";
        }else{
          paper10.classList.add("flipped");
          paper10.style.zIndex = 10;
          book.style.transform =  "translateX(100%)";
          return;
        }
      }
      else{
        paper10.classList.add("flipped");
        paper10.style.zIndex = 10;
      }
      
      break;
      case 11:
      if(mediaQuery.matches){
        if(paper11.classList.contains("flipped")){
          book.style.transform =  "translateX(0)";
        }else{
          paper11.classList.add("flipped");
          paper11.style.zIndex = 11;
          book.style.transform =  "translateX(100%)";
          return;
        }
      }
      else{
        paper11.classList.add("flipped");
        paper11.style.zIndex = 11;
      }
      
      break;
      case 12: paper12.classList.add("flipped");
      paper12.style.zIndex = 12;
      closeBook(false);
      break;
    }
    currentLocation++;
  }

}
function goPrevPage(){
  if(currentLocation > 1){
    switch(currentLocation){
      case 2: closeBook(true);
      paper1.classList.remove("flipped");
      paper1.style.zIndex = 12;
      break;
      case 3: 
      if(mediaQuery.matches){
        if(paper2.classList.contains("flipped")){
          paper2.classList.remove("flipped");
          paper2.style.zIndex = 11;
          book.style.transform =  "translateX(0)";
          return;
        }else{
          book.style.transform =  "translateX(100%)";
        }
      }
      else{
        paper2.classList.remove("flipped");
        paper2.style.zIndex = 11;
      }
      
      break;
      case 4:
        if(mediaQuery.matches){
          if(paper3.classList.contains("flipped")){
            paper3.classList.remove("flipped");
            paper3.style.zIndex = 10;
            book.style.transform =  "translateX(0)";
            return;
          }else{
            book.style.transform =  "translateX(100%)";
          }
          
        }
        else{
          paper3.classList.remove("flipped");
          paper3.style.zIndex = 10;
        }
      
      break;
      case 5:
        if(mediaQuery.matches){
          if(paper4.classList.contains("flipped")){
            paper4.classList.remove("flipped");
            paper4.style.zIndex = 9;
            book.style.transform =  "translateX(0)";
            return;
          }else{
            book.style.transform =  "translateX(100%)";
          }
          
        }
        else{
          paper4.classList.remove("flipped");
          paper4.style.zIndex = 9;
        }
      
      break;
      case 6:
        if(mediaQuery.matches){
          if(paper5.classList.contains("flipped")){
            paper5.classList.remove("flipped");
            paper5.style.zIndex = 8;
            book.style.transform =  "translateX(0)";
            return;
          }else{
            book.style.transform =  "translateX(100%)";
          }
          
        }
        else{
          paper5.classList.remove("flipped");
          paper5.style.zIndex = 8;
        }
      
      break;
      case 7:
        if(mediaQuery.matches){
          if(paper6.classList.contains("flipped")){
            paper6.classList.remove("flipped");
            paper6.style.zIndex = 7;
            book.style.transform =  "translateX(0)";
            return;
          }else{
            book.style.transform =  "translateX(100%)";
          }
          
        }
        else{
          paper6.classList.remove("flipped");
          paper6.style.zIndex = 7;
        }
      
      break;
      case 8:
        if(mediaQuery.matches){
          if(paper7.classList.contains("flipped")){
            paper7.classList.remove("flipped");
            paper7.style.zIndex = 6;
            book.style.transform =  "translateX(0)";
            return;
          }else{
            book.style.transform =  "translateX(100%)";
          }
          
        }
        else{
          paper7.classList.remove("flipped");
          paper7.style.zIndex = 6;
        }
      
      break;
      case 9:
        if(mediaQuery.matches){
          if(paper8.classList.contains("flipped")){
            paper8.classList.remove("flipped");
            paper8.style.zIndex = 5;
            book.style.transform =  "translateX(0)";
            return;
          }else{
            book.style.transform =  "translateX(100%)";
          }
          
        }
        else{
          paper8.classList.remove("flipped");
          paper8.style.zIndex = 5;
        }
      
      break;
      case 10:
        if(mediaQuery.matches){
          if(paper9.classList.contains("flipped")){
            paper9.classList.remove("flipped");
            paper9.style.zIndex = 4;
            book.style.transform =  "translateX(0)";
            return;
          }else{
            book.style.transform =  "translateX(100%)";
          }
          
        }
        else{
          paper9.classList.remove("flipped");
          paper9.style.zIndex = 4;
        }
      
      break;
      case 11:
        if(mediaQuery.matches){
          if(paper10.classList.contains("flipped")){
            paper10.classList.remove("flipped");
            paper10.style.zIndex = 3;
            book.style.transform =  "translateX(0)";
            return;
          }else{
            book.style.transform =  "translateX(100%)";
          }
          
        }
        else{
          paper10.classList.remove("flipped");
          paper10.style.zIndex = 3;
        }
      
      break;
      case 12:
        if(mediaQuery.matches){
          if(paper11.classList.contains("flipped")){
            paper11.classList.remove("flipped");
            paper11.style.zIndex = 2;
            book.style.transform =  "translateX(0)";
            return;
          }else{
            book.style.transform =  "translateX(100%)";
          }
          
        }
        else{
          paper11.classList.remove("flipped");
          paper11.style.zIndex = 2;
        }
      
      break;
      case 13:
        if(mediaQuery.matches){
          if(paper12.classList.contains("flipped")){
            openBook();
            paper12.classList.remove("flipped");
            paper12.style.zIndex = 1;
            book.style.transform =  "translateX(0)";
            return;
          }else{
            book.style.transform =  "translateX(100%)";
          }
          
        }
        else{
          openBook();
          paper12.classList.remove("flipped");
          paper12.style.zIndex = 1;
        }
      
      break;
    }
    currentLocation --;
  }
}

let actualSection = null;
let actualBlock = null;
let sectionsValid = new Set();
let sectionsValid2 = new Set();
//initialSection = document.querySelector("#section-partner");
//sectionsValid.add(initialSection.querySelector(".edit"));
function SaveContinue(sectionToHide, blockToDisplay, sectionToDisplay, blockToHide) {
  // Ocultar la sección y el bloque anteriores
  actualSection = document.querySelector("#" + sectionToHide);
  actualSection.style.display = "none";
  actualBlock = document.querySelector("#" + blockToDisplay);
  actualBlock.style.display = "block";

  // Mostrar la nueva sección y bloque
  document.querySelector("#" + sectionToDisplay).style.display = "block";
  document.querySelector("#" + blockToHide).style.display = "none";
  
  // Obtener los elementos con la clase 'edit' dentro de la sección oculta
  let elements = actualSection.querySelectorAll(".edit");
  let elements2 = actualSection.querySelectorAll("#info-section");
  
  // Agregar cada elemento al Set individualmente
  elements.forEach(element => sectionsValid.add(element));
  elements2.forEach(element => sectionsValid2.add(element));
  
  // Aplicar display block a todos los elementos en el Set
  for (let elemento of sectionsValid) {
    elemento.style.display = "block"; // Esto aplica solo si son elementos HTML individuales
  }
  for (let elemento of sectionsValid2) {
    elemento.style.display = "block"; // Esto aplica solo si son elementos HTML individuales
  }
  actualBlock.scrollIntoView({
    behavior: 'smooth',
    block: 'center' // Opcional, trata de centrar el bloque
  });
}

function EditSection (blockToDisplay, sectionToHide){
  if(actualSection != null && actualBlock != null){
    actualBlock.style.display = "none";
    actualSection.style.display = "block";
    actualBlock = document.querySelector("#" + blockToDisplay);
    actualBlock.style.display = "block";
    actualSection = document.querySelector("#" + sectionToHide);
    actualSection.style.display = "none";
    actualBlock.scrollIntoView({
      behavior: 'smooth',
      block: 'center' // Opcional, trata de centrar el bloque
    });
  }
}

function EditSection2 (z,previewIndex){
  console.log("jeje");
  var canvas = document.getElementById("canvasScreen3");
  var context = canvas.getContext("2d");
  var canvas2 = document.getElementById("canvasScreen4");
  var context2 = canvas2.getContext("2d");
  var canvas3 = document.getElementById("canvasScreen5");
  var context3 = canvas3.getContext("2d");

  // Activar el suavizado de imagen
  context.imageSmoothingEnabled = true;
  context2.imageSmoothingEnabled = true;
  context3.imageSmoothingEnabled = true;

  // Cargar la imagen de fondo desde una URL
  var img = new Image();
  img.src = z; // La URL o el recurso que pasas para la imagen de fondo
  
  // Esperar a que la imagen de fondo se cargue antes de dibujarla
  img.onload = function() {
    // Ajustar el tamaño del canvas al tamaño de la imagen de fondo
    canvas.width = img.width;
    canvas.height = img.height;

    canvas2.width = img.width;
    canvas2.height = img.height;
    canvas3.width = img.width;
    canvas3.height = img.height;

    // Limpiar el canvas antes de dibujar
    context.clearRect(0, 0, canvas.width, canvas.height);
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    context3.clearRect(0, 0, canvas3.width, canvas3.height);

    // Dibujar la imagen de fondo
    context.drawImage(img, 0, 0, img.width, img.height);
    context2.drawImage(img, 280, 0, img.width, img.height);
    context3.drawImage(img, -270, 0, img.width, img.height);
    
    // Crear las imágenes x e y a partir de los otros canvas
    var x = new Image();
    var y = new Image();

    // Asignar el contenido de otros canvas a las imágenes x y y
    x.src = canvasScreen.toDataURL("image/png"); // canvasScreen ya debe existir
    y.src = canvasScreen2.toDataURL("image/png"); // canvasScreen2 ya debe existir
    console.log("entro" + previewIndex);
    // Esperar a que las imágenes x e y se carguen antes de dibujarlas
    switch(previewIndex){
      case 0:
        x.onload = function() {
          context.drawImage(x, 250, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)
    
          y.onload = function() {
            context.drawImage(y, 150, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)
            
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 800, 50, 200, 30);
          };
        };
      break;
      case 1:
        x.onload = function() {
          context.drawImage(x, 900, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)
    
          y.onload = function() {
            context.drawImage(y, 650, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)
            
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 200, 50, 200, 30);
          };
        };
        break;
      case 2:
        x.onload = function() {
          context.drawImage(x, 950, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)
    
          y.onload = function() {
            context.drawImage(y, 700, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)
            
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 150, 100, 200, 30);
          };
        };
        break;
      case 3:
        x.onload = function() {
          context.drawImage(x, 750, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)
    
          y.onload = function() {
            context.drawImage(y, 900, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)
            
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 200, 50, 200, 30);
          };
        };
        break;
      case 4:
        x.onload = function() {
          context.drawImage(x, 200, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)
    
          y.onload = function() {
            context.drawImage(y, 400, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)
            
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 700, 50, 200, 30);
          };
        };
        break;
      case 5:
        x.onload = function() {
          context.drawImage(x, 200, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)
    
          y.onload = function() {
            context.drawImage(y, 400, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)
            
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 800, 100, 200, 30);
          };
        };
        break;
      case 6:
        x.onload = function() {
          context.drawImage(x, 100, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)
    
          y.onload = function() {
            context.drawImage(y, 950, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)
            
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 320, 60, 200, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 640, 90, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 380, 180, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea.", 640, 255, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 345, 300, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto .", 685, 360, 150, 25);
          };
        };
        break;
      case 7:
        x.onload = function() {
          context.drawImage(x, 100, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)
    
          y.onload = function() {
            context.drawImage(y, 950, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)
            
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 320, 60, 200, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 640, 90, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 380, 180, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea.", 640, 255, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 345, 300, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto .", 685, 360, 150, 25);
          };
        };
        break;
      case 8:
        x.onload = function() {
          context.drawImage(x, 100, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)
    
          y.onload = function() {
            context.drawImage(y, 950, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)
            
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 320, 60, 200, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 640, 90, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 380, 180, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea.", 640, 255, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 345, 300, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto .", 685, 360, 150, 25);
          };
        };
        break;
      case 9:
        x.onload = function() {
          context.drawImage(x, 100, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)
    
          y.onload = function() {
            context.drawImage(y, 950, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)
            
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 320, 60, 200, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 640, 90, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 380, 180, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea.", 640, 255, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 345, 300, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto .", 685, 360, 150, 25);
          };
        };
        break;
      case 10:
        x.onload = function() {
          context.drawImage(x, 100, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)
    
          y.onload = function() {
            context.drawImage(y, 950, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)
            
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 320, 60, 200, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 640, 90, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 380, 180, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea.", 640, 255, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 345, 300, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto .", 685, 360, 150, 25);
          };
        };
        break;

    }
    context2 = context;
    
  };
};
function ClearSection2 (){
  var canvas = document.getElementById("canvasScreen3");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
};

function insertTextWithLineBreaks(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(" ");
  var line = "";
  var lines = [];

  // Crear las líneas ajustando las palabras al ancho máximo
  for (var i = 0; i < words.length; i++) {
    var testLine = line + words[i] + " ";
    var testWidth = context.measureText(testLine).width;
    if (testWidth > maxWidth && i > 0) {
      lines.push(line);  // Empuja la línea completa al array de líneas
      line = words[i] + " ";  // Inicia una nueva línea
    } else {
      line = testLine;
    }
  }
  lines.push(line);  // Agregar la última línea restante

  // Dibujar cada línea en el canvas
  for (var j = 0; j < lines.length; j++) {
    context.fillText(lines[j], x, y + j * lineHeight);
  }
}



var char = new NewChar(charCtx);
var char2 = new NewChar(charCtx2,'female');
     
