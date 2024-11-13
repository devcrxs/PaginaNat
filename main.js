const canvases = [
  { id: ".canvasBook1", src: "imgs/BookBackgrounds/01.webp" },
  { id: ".canvasBook2", src: "https://assets.hoorayheroes.com/books/loveyou-mf-v2/default/pages/C01/M/04_stories/Z19.webp?version=1689150760" },
  { id: ".canvasBook3", src: "https://assets.hoorayheroes.com/books/loveyou-mf-v2/default/pages/C01/M/04_stories/Z18.webp?version=1689150760" },
  { id: ".canvasBook4", src: "https://assets.hoorayheroes.com/books/loveyou-mf-v2/default/pages/C01/M/04_stories/Z03.webp?version=1689150760" },
  { id: ".canvasBook5", src: "https://assets.hoorayheroes.com/books/loveyou-mf-v2/default/pages/C01/M/04_stories/Z21.webp?version=1689150760" },
  { id: ".canvasBook6", src: "https://assets.hoorayheroes.com/books/loveyou-mf-v2/default/pages/C01/M/04_stories/Z02.webp?version=1689150760" },
  { id: ".canvasBook7", src: "https://assets.hoorayheroes.com/books/loveyou-mf-v2/default/pages/C01/M/04_stories/Z05.webp?version=1689150760" },
  { id: ".canvasBook8", src: "https://assets.hoorayheroes.com/books/loveyou-mf-v2/default/pages/C01/M/04_stories/Z05.webp?version=1689150760" },
  { id: ".canvasBook9", src: "https://assets.hoorayheroes.com/books/loveyou-mf-v2/default/pages/C01/M/04_stories/Z05.webp?version=1689150760" },
  { id: ".canvasBook10", src: "https://assets.hoorayheroes.com/books/loveyou-mf-v2/default/pages/C01/M/04_stories/Z05.webp?version=1689150760" },
  { id: ".canvasBook11", src: "https://assets.hoorayheroes.com/books/loveyou-mf-v2/default/pages/C01/M/04_stories/Z05.webp?version=1689150760" }
];


let nextCarouselHeader = document.querySelector(".next"); // carrusel de imagenes en el header
let prevCarouselHeader = document.querySelector(".prev");
let sliderCarouselHeader = document.querySelector(".slider");

nextCarouselHeader.addEventListener("click", function(){
    let slides = document.querySelectorAll(".slides");
    sliderCarouselHeader.appendChild(slides[0]);
});
prevCarouselHeader.addEventListener("click", function(){
    let slides = document.querySelectorAll(".slides");
    sliderCarouselHeader.prepend(slides[slides.length - 1]);
});


//personalization items
let bodyCharacter = document.getElementById("bodyCharacter");
let eyesCharacter = document.getElementById("eyesCharacter");
let hairCharacter = document.getElementById("hairCharacter");
let glassesCharacter = document.getElementById("glassesCharacter");


let canvasScreenPartner = document.getElementById("canvasScreenPartner");
let canvasScreenYourself = document.getElementById("canvasScreenYourself");

canvasScreenPartner.width = 50;
canvasScreenPartner.height = 50;
canvasScreenYourself.width = 50;
canvasScreenYourself.height = 50;

let contextPartner = canvasScreenPartner.getContext("2d");
let contextYourself = canvasScreenYourself.getContext("2d");
//new NewChar(gender,race,ethn,hair,eyes);
function NewChar(actualCharacter,gender, skin, hair, eyes, glasses) {
  if (gender === undefined) {
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

    if (this.gender === "male") {
      actualCharacter.drawImage(bodyCharacter, 48, 0, 48, 48, 0, 0, 48, 48);
    }
    else if (this.gender === "female") {
      actualCharacter.drawImage(bodyCharacter, 192, 0, 48, 48, 0, 0, 48, 48);
    }
    else {
        actualCharacter.drawImage(bodyCharacter, 48, 0, 48, 48, 0, 0, 48, 48);
    }

    actualCharacter.filter = "hue-rotate(" + this.eyes + "deg) brightness(1)";
    actualCharacter.drawImage(eyesCharacter, 48, 0, 48, 48, 0, 0, 48, 48);

    actualCharacter.filter ="hue-rotate(" +this.hair[0] +"deg) brightness(" +Number(1 - this.hair[0] / 1000) +")";
    actualCharacter.drawImage(hairCharacter,this.hair[2][this.hair[1]],0,48,48,0,0,48,48);


    actualCharacter.drawImage(glassesCharacter, this.glasses, 0, 48, 40, 0, 0, 48, 48);
  };

  this.drawMyChar();
}

let actualSectionPartner = "";
let actualSectionYourself = "";
function SetCategoryPersonalization (section,type) {
  switch(type){
    case '1':
      if (actualSectionPartner.trim().length === 0) {
        actualSectionPartner = String(section);
        document.getElementById(actualSectionPartner).style.display = "flex";
        return;
      }
      document.getElementById(actualSectionPartner).style.display = "none";
      actualSectionPartner = section;
      document.getElementById(actualSectionPartner).style.display = "flex";
    break;

    case '2':
      if (actualSectionYourself.trim().length === 0) {
        actualSectionYourself = String(section);
        document.getElementById(actualSectionYourself).style.display = "flex";
        return;
      }
      document.getElementById(actualSectionYourself).style.display = "none";
      actualSectionYourself = section;
      document.getElementById(actualSectionYourself).style.display = "flex";
    break;
  }

}
window.onload = function() {
  SetCategoryPersonalization('GenderPartner','1');
  SetCategoryPersonalization('GenderYourself','2');
};



let optionSingles = document.querySelectorAll('.contentOptions');

optionSingles.forEach(contenedor => {
  let buttons = contenedor.querySelectorAll('.buttonOption');

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      buttons.forEach(btn => btn.classList.remove('selected'));

      this.classList.add('selected');
    });
  });
  document.addEventListener('click', function(event) {
    if (!contenedor.contains(event.target)) {
      let selectedButton = contenedor.querySelector('.buttonOption.selected');
      if (selectedButton) {
        selectedButton.classList.add('selected');
      }
    }
  });
});




//TODO
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
        let button = document.getElementById("button-save-preview");
        button.disabled = false;
    }
}

let actualImageSrc;
let actualPreviewIndex;
function UpdatePreviewImages() {
    if (actualImageSrc != null) {
        CreatePreviewImage(actualImageSrc, actualPreviewIndex);
    }
}

function UpdateBook() {
  LoadDefaultImagesBook();
  setTimeout(() => {
    for (let i = 0; i < selectedCount; i++) {
      CreatePageBook("page" + (i + 1),canvases[i].src, i);
    }
}, 100);

}

function CreatePageBook(canvasPage,srcImage,indexPage){

  let canvas = document.getElementById(canvasPage);
  let context = canvas.getContext("2d");

  context.imageSmoothingEnabled = true;

  let img = new Image();
  img.src = srcImage;

  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(img, 0, 0, img.width, img.height);

    let contextPartner = new Image();
    let contextYourself = new Image();

    contextPartner.src = canvasScreenPartner.toDataURL("image/png");
    contextYourself.src = canvasScreenYourself.toDataURL("image/png");

    switch(indexPage){
      case 0:
        contextPartner.onload = function() {
          context.drawImage(contextPartner, 250, 200, 100, 100);

          contextYourself.onload = function() {
            context.drawImage(contextYourself, 150, 200, 100, 100);

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 800, 50, 200, 30);
            LoadPageInBook(".canvasBook1", img, canvas);
          };
        };

      break;
      case 1:
        contextPartner.onload = function() {
          context.drawImage(contextPartner, 900, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          contextYourself.onload = function() {
            context.drawImage(contextYourself, 650, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 200, 50, 200, 30);
            LoadPageInBook(".canvasBook2", img, canvas);
          };
        };

        break;
      case 2:
        contextPartner.onload = function() {
          context.drawImage(contextPartner, 950, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          contextYourself.onload = function() {
            context.drawImage(contextYourself, 700, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 150, 100, 200, 30);

            LoadPageInBook(".canvasBook3", img, canvas);
          };
        };

        break;
      case 3:
        contextPartner.onload = function() {
          context.drawImage(contextPartner, 750, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          contextYourself.onload = function() {
            context.drawImage(contextYourself, 900, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 200, 50, 200, 30);

            LoadPageInBook(".canvasBook4", img, canvas);
          };
        };
        break;
      case 4:
        contextPartner.onload = function() {
          context.drawImage(contextPartner, 200, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          contextYourself.onload = function() {
            context.drawImage(contextYourself, 400, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 700, 50, 200, 30);
            LoadPageInBook(".canvasBook5", img, canvas);
          };
        };
        break;
      case 5:
        contextPartner.onload = function() {
          context.drawImage(contextPartner, 200, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          contextYourself.onload = function() {
            context.drawImage(contextYourself, 400, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 800, 100, 200, 30);
            LoadPageInBook(".canvasBook6", img, canvas);
          };
        };
        break;
      case 6:
        contextPartner.onload = function() {
          context.drawImage(contextPartner, 100, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          contextYourself.onload = function() {
            context.drawImage(contextYourself, 950, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 320, 60, 200, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 640, 90, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 380, 180, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea.", 640, 255, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 345, 300, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto .", 685, 360, 150, 25);

            LoadPageInBook(".canvasBook7", img, canvas);

          };
        };
        break;
      case 7:
        contextPartner.onload = function() {
          context.drawImage(contextPartner, 100, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          contextYourself.onload = function() {
            context.drawImage(contextYourself, 950, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 320, 60, 200, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 640, 90, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 380, 180, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea.", 640, 255, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 345, 300, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto .", 685, 360, 150, 25);
            LoadPageInBook(".canvasBook8", img, canvas);
          };
        };
        break;
      case 8:
        contextPartner.onload = function() {
          context.drawImage(contextPartner, 100, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          contextYourself.onload = function() {
            context.drawImage(contextYourself, 950, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 320, 60, 200, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 640, 90, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 380, 180, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea.", 640, 255, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 345, 300, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto .", 685, 360, 150, 25);
            LoadPageInBook(".canvasBook9", img, canvas);
          };
        };
        break;
      case 9:
        contextPartner.onload = function() {
          context.drawImage(contextPartner, 100, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          contextYourself.onload = function() {
            context.drawImage(contextYourself, 950, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 320, 60, 200, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 640, 90, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 380, 180, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea.", 640, 255, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 345, 300, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto .", 685, 360, 150, 25);
            LoadPageInBook(".canvasBook10", img, canvas);
          };
        };
        break;
      case 10:
        contextPartner.onload = function() {
          context.drawImage(contextPartner, 100, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          contextYourself.onload = function() {
            context.drawImage(contextYourself, 950, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 320, 60, 200, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 640, 90, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 380, 180, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea.", 640, 255, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 345, 300, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto .", 685, 360, 150, 25);

            LoadPageInBook(".canvasBook11", img, canvas);
          };
        };
        break;
    }
  };
}

// Función para previsualizar imagen
function previewImage(imageSrc, previewIndex) {
    CreatePreviewImage(imageSrc, previewIndex);
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
            let button = document.getElementById("button-save-preview");
            button.disabled = true;
            UpdateBook();
        }

        if (selectedCount === 0) {
            clearPreview();
        }
    }
}

// Función para limpiar el área de previsualización
function clearPreview() {
    document.querySelector("#preview-text").style.display = "flex";
    let canvas = document.getElementById("canvasPreviewPage");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
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


LoadImagesStaticBooks("https://assets.hoorayheroes.com/books/loveyou-mf-v2/default/pages/C01/M/01.webp?version=1729054851",".canvasBookDedication");
LoadImagesStaticBooks("https://assets.hoorayheroes.com/books/loveyou-mf-v2/default/pages/C01/M/02.webp?version=1729054851",".canvasBookStart");
LoadImagesStaticBooks("https://assets.hoorayheroes.com/books/loveyou-mf-v2/default/pages/C01/M/03.webp?version=1729054851",".canvasBookStart2");
LoadImagesStaticBooks("https://assets.hoorayheroes.com/books/loveyou-mf-v2/default/pages/C01/M/06.webp?version=1729054851",".canvasBookEnd");
LoadImagesStaticBooks("https://assets.hoorayheroes.com/books/loveyou-mf-v2/default/pages/C01/M/05.webp?version=1729054851",".canvasBookEnd2");

function LoadImagesStaticBooks(url, id) {//TODO refactor
  let img = new Image();
  img.src = url; // La URL o el recurso que pasas para la imagen de fondo

  // Esperar a que la imagen de fondo se cargue antes de dibujarla
  img.onload = function () {
      let canvasprueba = document.querySelectorAll(id);
      let contextprueba3 = [];
      canvasprueba.forEach((canvas5) => {
          let context2 = canvas5.getContext("2d");
          context2.imageSmoothingEnabled = true;
      context2.clearRect(0, 0, canvas5.width, canvas5.height);
      canvas5.width = img.width;
      canvas5.height = img.height;
      contextprueba3.push(context2);
    });
      let toggelprueba = true; // Variable para alternar entre -270 y 280

    contextprueba3.forEach((context3) => {
      if (toggelprueba) {
        context3.drawImage(img, 280, 0, img.width, img.height);
      } else {
        context3.drawImage(img, -270, 0, img.width, img.height);
      }
      toggelprueba = !toggelprueba; // Cambia el valor de toggle en cada iteración
    });
  };
}


function LoadDefaultImagesBook() {
  canvases.forEach(canvasInfo => {
      let allCanvas = document.querySelectorAll(canvasInfo.id);
      let contentContextCanvas = [];
      let img = new Image();
      img.src = canvasInfo.src;
      img.onload = function() {
          allCanvas.forEach((canvas) => {
            let context = canvas.getContext("2d");
            context.imageSmoothingEnabled = true;
            context.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = img.width;
            canvas.height = img.height;
            contentContextCanvas.push(context);
            context.drawImage(img, 280, 0, img.width, img.height);

          });
          let toggle = true;

          contentContextCanvas.forEach((context) => {
            if (toggle) {
              context.drawImage(img, 280, 0, img.width, img.height);
            } else {
              context.drawImage(img, -270, 0, img.width, img.height);
            }
            toggle = !toggle;
          });
          contentContextCanvas.splice(0, contentContextCanvas.length);
        };
        contentContextCanvas.splice(0, contentContextCanvas.length);
  });
}
LoadDefaultImagesBook();



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
const paper13 = document.querySelector("#p13");
const paper14 = document.querySelector("#p14");
const paper15 = document.querySelector("#p15");
const paper16 = document.querySelector("#p16");
const paper17 = document.querySelector("#p17");


prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

let currentLocation = 1;
let numOfPapers = 17;
let maxLocation = numOfPapers + 1;

function openBook(){
  book.style.transform = "translateX(50%)";
    let x = window.matchMedia("(max-width: 600px)");
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
    let x = window.matchMedia("(max-width: 600px)");
    if(x.matches){
    return;
  }
  prevBtn.style.transform = "translateX(0px)";
  nextBtn.style.transform = "translateX(0px)";
}
window.matchMedia("(max-width: 500px)");
function goNextPage(){
  if(currentLocation < maxLocation){
    switch(currentLocation){
      case 1:
      openBook();
        paper1.classList.add("flipped");
        paper1.style.zIndex = 1;


      break;
      case 2:


        paper2.classList.add("flipped");
        setTimeout(() => {
          paper2.style.zIndex = 1;
      }, 100);

      break;
      case 3:

        paper3.classList.add("flipped");

        setTimeout(() => {
          paper3.style.zIndex = 1;
      }, 100);


      break;
      case 4:

        paper4.classList.add("flipped");
        setTimeout(() => {
          paper4.style.zIndex = 1;
      }, 100);


      break;
      case 5:

        paper5.classList.add("flipped");
        setTimeout(() => {
          paper5.style.zIndex = 1;
      }, 100);


      break;
      case 6:

        paper6.classList.add("flipped");
        setTimeout(() => {
          paper6.style.zIndex = 1;
      }, 100);


      break;
      case 7:

        paper7.classList.add("flipped");
        setTimeout(() => {
          paper7.style.zIndex = 1;
      }, 100);


      break;
      case 8:

        paper8.classList.add("flipped");
        setTimeout(() => {
          paper8.style.zIndex = 1;
      }, 100);


      break;
      case 9:

          paper9.classList.add("flipped");
          setTimeout(() => {
            paper9.style.zIndex = 1;
        }, 100);


        break;
      case 10:


        paper10.classList.add("flipped");
        setTimeout(() => {
          paper10.style.zIndex = 1;
      }, 100);


      break;
      case 11:

        paper11.classList.add("flipped");
        setTimeout(() => {
          paper11.style.zIndex = 1;
      }, 100);


      break;
      case 12:
        paper12.classList.add("flipped");
        setTimeout(() => {
          paper12.style.zIndex = 1;
      }, 100);

      break;

      case 13:
        paper13.classList.add("flipped");
        setTimeout(() => {
          paper13.style.zIndex = 1;
      }, 100);

      break;
      case 14:
        paper14.classList.add("flipped");
        setTimeout(() => {
          paper14.style.zIndex = 1;
      }, 100);

      break;
      case 15:
        paper15.classList.add("flipped");
        setTimeout(() => {
          paper15.style.zIndex = 1;
      }, 100);

      break;
      case 16:
        paper16.classList.add("flipped");
        setTimeout(() => {
          paper16.style.zIndex = 1;
      }, 100);

      break;

      case 17: paper17.classList.add("flipped");
      paper17.style.zIndex = 1;
      closeBook(false);
      break;
    }
    currentLocation++;
  }

}
function goPrevPage(){
  console.log(currentLocation);
  if(currentLocation > 1){
    switch(currentLocation){
      case 2: closeBook(true);
      console.log("entro 2");
      paper1.classList.remove("flipped");
      paper1.style.zIndex = 17;
      break;
      case 3:
      console.log("entro 2");

        paper2.classList.remove("flipped");
        paper2.style.zIndex = 16;


      break;
      case 4:

          paper3.classList.remove("flipped");
          paper3.style.zIndex = 15;


      break;
      case 5:

          paper4.classList.remove("flipped");
          paper4.style.zIndex = 14;


      break;
      case 6:

          paper5.classList.remove("flipped");
          paper5.style.zIndex = 13;


      break;
      case 7:

          paper6.classList.remove("flipped");
          paper6.style.zIndex = 12;


      break;
      case 8:

          paper7.classList.remove("flipped");
          paper7.style.zIndex = 11;


      break;
      case 9:

          paper8.classList.remove("flipped");
          setTimeout(() => {
            paper8.style.zIndex = 10;
        }, 100);


      break;
      case 10:

          paper9.classList.remove("flipped");
          setTimeout(() => {
            paper9.style.zIndex = 9;
        }, 100);


      break;
      case 11:

          paper10.classList.remove("flipped");
          setTimeout(() => {
            paper10.style.zIndex = 8;
        }, 100);


      break;
      case 12:

          paper11.classList.remove("flipped");
          setTimeout(() => {
            paper11.style.zIndex = 7;
        }, 100);


      break;
      case 13:

          paper12.classList.remove("flipped");
          setTimeout(() => {
            paper12.style.zIndex = 6;
        }, 100);


      break;
      case 14:

          paper13.classList.remove("flipped");
          setTimeout(() => {
            paper13.style.zIndex = 5;
        }, 100);


      break;
      case 15:

          paper14.classList.remove("flipped");
          setTimeout(() => {
            paper14.style.zIndex = 4;
        }, 100);


      break;
      case 16:

          paper15.classList.remove("flipped");
          setTimeout(() => {
            paper15.style.zIndex = 3;
        }, 100);


      break;
      case 17:

          paper16.classList.remove("flipped");
          setTimeout(() => {
            paper16.style.zIndex = 2;
        }, 100);


      break;
      case 18:

          openBook();
          paper17.classList.remove("flipped");
          setTimeout(() => {
            paper17.style.zIndex = 1;
        }, 100);


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
  let elements2 = actualSection.querySelectorAll(".info-section");

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

function CreatePreviewImage (urlImage,previewIndex){
    let canvas = document.getElementById("canvasPreviewPage");
    let context = canvas.getContext("2d");

    context.imageSmoothingEnabled = true;
    let img = new Image();
    img.src = urlImage;

  img.onload = function() {

    canvas.width = img.width;
    canvas.height = img.height;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(img, 0, 0, img.width, img.height);

      let imagePartner = new Image();
      let imageYourself = new Image();

      imagePartner.src = canvasScreenPartner.toDataURL("image/png");
    imageYourself.src = canvasScreenYourself.toDataURL("image/png");

    switch(previewIndex){
      case 0:
        imagePartner.onload = function () {
          context.drawImage(imagePartner, 250, 200, 100, 100);

          imageYourself.onload = function () {
            context.drawImage(imageYourself, 150, 200, 100, 100);

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 800, 50, 200, 30);

            LoadPageInBook(".canvasBook1", img, canvas);
          };
        };

      break;
      case 1:
        imagePartner.onload = function() {
          context.drawImage(imagePartner, 900, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          imageYourself.onload = function() {
            context.drawImage(imageYourself, 650, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 200, 50, 200, 30);

            LoadPageInBook(".canvasBook2", img, canvas);

          };
        };

        break;
      case 2:
        imagePartner.onload = function() {
          context.drawImage(imagePartner, 950, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          imageYourself.onload = function() {
            context.drawImage(imageYourself, 700, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 150, 100, 200, 30);

            LoadPageInBook(".canvasBook3", img, canvas);
          };
        };

        break;
      case 3:
        imagePartner.onload = function() {
          context.drawImage(imagePartner, 750, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          imageYourself.onload = function() {
            context.drawImage(imageYourself, 900, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 200, 50, 200, 30);

            LoadPageInBook(".canvasBook4", img, canvas);
          };
        };
        break;
      case 4:
        imagePartner.onload = function() {
          context.drawImage(imagePartner, 200, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          imageYourself.onload = function() {
            context.drawImage(imageYourself, 400, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 700, 50, 200, 30);
            LoadPageInBook(".canvasBook5", img, canvas);

          };
        };
        break;
      case 5:
        imagePartner.onload = function() {
          context.drawImage(imagePartner, 200, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          imageYourself.onload = function() {
            context.drawImage(imageYourself, 400, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 800, 100, 200, 30);


            LoadPageInBook(".canvasBook6", img, canvas);
          };
        };
        break;
      case 6:
        imagePartner.onload = function() {
          context.drawImage(imagePartner, 100, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          imageYourself.onload = function() {
            context.drawImage(imageYourself, 950, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 320, 60, 200, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 640, 90, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 380, 180, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea.", 640, 255, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 345, 300, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto .", 685, 360, 150, 25);

            LoadPageInBook(".canvasBook7", img, canvas);

          };
        };
        break;
      case 7:
        imagePartner.onload = function() {
          context.drawImage(imagePartner, 100, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          imageYourself.onload = function() {
            context.drawImage(imageYourself, 950, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 320, 60, 200, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 640, 90, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 380, 180, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea.", 640, 255, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 345, 300, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto .", 685, 360, 150, 25);
            LoadPageInBook(".canvasBook8", img, canvas);


          };
        };
        break;
      case 8:
        imagePartner.onload = function() {
          context.drawImage(imagePartner, 100, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          imageYourself.onload = function() {
            context.drawImage(imageYourself, 950, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 320, 60, 200, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 640, 90, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 380, 180, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea.", 640, 255, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 345, 300, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto .", 685, 360, 150, 25);

            LoadPageInBook(".canvasBook9", img, canvas);
          };
        };
        break;
      case 9:
        imagePartner.onload = function() {
          context.drawImage(imagePartner, 100, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          imageYourself.onload = function() {
            context.drawImage(imageYourself, 950, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 320, 60, 200, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 640, 90, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 380, 180, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea.", 640, 255, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 345, 300, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto .", 685, 360, 150, 25);
            LoadPageInBook(".canvasBook10", img, canvas);
          };
        };
        break;
      case 10:
        imagePartner.onload = function() {
          context.drawImage(imagePartner, 100, 200, 100, 100); // Dibujar imagen x (ajustar la posición y tamaño según necesites)

          imageYourself.onload = function() {
            context.drawImage(imageYourself, 950, 200, 100, 100); // Dibujar imagen y (ajustar la posición y tamaño según necesites)

            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 320, 60, 200, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos automáticos.", 640, 90, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 380, 180, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea.", 640, 255, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto largo que necesita un salto de línea. Aquí es donde se aplicarán los saltos.", 345, 300, 150, 25);
            insertTextWithLineBreaks(context, "Este es un texto .", 685, 360, 150, 25);

            LoadPageInBook(".canvasBook11", img, canvas);
          };
        };
        break;

    }
  };
}

function LoadPageInBook(idCanvas, img, canvasPreview) {
    let allCanvasPage = document.querySelectorAll(idCanvas);

    let contextList = [];
    allCanvasPage.forEach((canva) => {
        let context = canva.getContext("2d");
        context.imageSmoothingEnabled = true;
    context.clearRect(0, 0, canva.width, canva.height);
    canva.width = img.width;
    canva.height = img.height;
    contextList.push(context);
  });
    let toggle = true;
    contextList.forEach((context) => {
    if (toggle) {
      context.drawImage(canvasPreview, 280, 0, img.width, img.height);
    } else {
      context.drawImage(canvasPreview, -270, 0, img.width, img.height);
    }
    toggle = !toggle;
  });
}
function insertTextWithLineBreaks(context, text, x, y, maxWidth, lineHeight) {
    let words = text.split(" ");
    let line = "";
    let lines = [];

    // Crear las líneas ajustando las palabras al ancho máximo
  for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + " ";
      let testWidth = context.measureText(testLine).width;
      if (testWidth > maxWidth && i > 0) {
      lines.push(line);  // Empuja la línea completa al array de líneas
      line = words[i] + " ";  // Inicia una nueva línea
    } else {
      line = testLine;
    }
  }
  lines.push(line);  // Agregar la última línea restante

  // Dibujar cada línea en el canvas
  for (let j = 0; j < lines.length; j++) {
    context.fillText(lines[j], x, y + j * lineHeight);
  }
}

function SetDedicationBook(){
    let currentDedication = document.querySelector("#textAreaDedication").value;
    let dedicationTextBook = document.querySelector("#dedicationTextBook");
  if(currentDedication.length !== 0){
    dedicationTextBook.textContent = currentDedication;

  }
}

let characterPartner = new NewChar(contextPartner);
let characterYourself = new NewChar(contextYourself, 'female');

