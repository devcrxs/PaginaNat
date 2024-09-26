hamburger = document.querySelector(".hamburger");
hamburger.onclick = function(){
  navBar = document.querySelector(".nav-bar");
  navBar.classList.toggle("active");
}


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
function previewOrSelect(imgElement, imageSrc) {
    const wrapper = imgElement.parentNode;

    if (wrapper.getAttribute("data-selected") === "true") {
        previewImage(imageSrc);
        return;
    }

    if (selectedCount >= maxSelected) {
        previewImage(imageSrc);
        return;
    }

    wrapper.setAttribute("data-selected", "true");
    selectedCount++;
    updateCounter();
    previewImage(imageSrc);

    if (selectedCount >= maxSelected) {
        disableUnselectedImages();
    }
}

// Función para previsualizar imagen
function previewImage(imageSrc) {
    const preview = document.getElementById("preview");
    preview.src = imageSrc;
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
        }

        if (selectedCount === 0) {
            clearPreview();
        }
    }
}

// Función para limpiar el área de previsualización
function clearPreview() {
    const preview = document.getElementById("preview");
    preview.src = "";
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
    const counterText = document.getElementById("counter");
    counterText.textContent = `${selectedCount} / ${maxSelected} imágenes seleccionadas`;
}

// Función para mover el carrusel a izquierda o derecha
function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const scrollAmount = 150; // Cantidad de desplazamiento
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
      images[0].src = 'https://placehold.co/300x200?text=Hard+Cover+Image+1';
      images[0].alt = 'Close-up of a hard cover book showing its durability';
      images[1].src = 'https://placehold.co/300x200?text=Hard+Cover+Image+2';
      images[1].alt = 'Open hard cover book showing the quality of the materials';
  } else {
      infoBox.textContent = 'The soft cover versions of our books have soft, pliable covers made from thick, high-quality paper meant to withstand endless bending.';
      images[0].src = 'https://placehold.co/300x200?text=Soft+Cover+Image+1';
      images[0].alt = 'Close-up of a soft cover book showing its flexibility';
      images[1].src = 'https://placehold.co/300x200?text=Soft+Cover+Image+2';
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


prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

let currentLocation = 1;
let numOfPapers = 3;
let maxLocation = numOfPapers + 1;

function openBook(){
  book.style.transform = "translateX(50%)";
  var x = window.matchMedia("(max-width: 600px)")
  if(x.matches){
    return;
  }
  prevBtn.style.transform = "translateX(-180px)";
  nextBtn.style.transform = "translateX(180px)";
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
function goNextPage(){
  if(currentLocation < maxLocation){
    switch(currentLocation){
      case 1: openBook();
      paper1.classList.add("flipped");
      paper1.style.zIndex = 1;
      break;
      case 2: paper2.classList.add("flipped");
      paper2.style.zIndex = 2;
      break;
      case 3: paper3.classList.add("flipped");
      paper3.style.zIndex = 3;
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
      paper1.style.zIndex = 3;
      break;
      case 3: paper2.classList.remove("flipped");
      paper2.style.zIndex = 2;
      break;
      case 4: openBook();
      paper3.classList.remove("flipped");
      paper3.style.zIndex = 1;
      break;
    }
    currentLocation --;
  }
}

var char = new NewChar(charCtx);
var char2 = new NewChar(charCtx2,'female');
     
