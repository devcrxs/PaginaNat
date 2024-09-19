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
function NewChar(actualCharacter,gender, skin, hair, eyes) {
  if (gender == undefined) {
    gender = "male";
    skin = 1;
    hair = [[0], [4], [48, 246, 336]];
    hair[1] = 0;
    eyes = 0;
  }

  this.gender = gender;
  this.ethnicity = skin;
  this.hair = hair;
  this.eyes = eyes;

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

    actualCharacter.filter = "hue-rotate(" + this.eyes + "deg) brightness(1)  ";
    actualCharacter.drawImage(eyesPartner, 0 + 48, 0, 48, 48, 0, 0, 48, 48);

    actualCharacter.filter ="hue-rotate(" +this.hair[0] +"deg) brightness(" +Number(1 - this.hair[0] / 1000) +")";
    actualCharacter.drawImage(hairPartner,this.hair[2][this.hair[1]],0,48,48,0,0,48,48);
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
function SetOptionPersonalization (idElement,type) {
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
  SetOptionPersonalization('Gender','1');
  SetOptionPersonalization('Gender2','2');
};
var char = new NewChar(charCtx);
var char2 = new NewChar(charCtx2);
     
