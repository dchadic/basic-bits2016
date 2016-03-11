"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const images = {}; // dict to contain images. add them using createImage()

const width = 640; // width of the game in pixels
const height = 480;
const framerate = 20; // # of frames per second
var imagesLoaded = 0; // # of images that are done loading
var imagesNeeded = 0; // # of images that still need to load
var currentView = "mainMenu";
var mouseX = 0;
var mouseY = 0;
//names of variables to be saved and loaded
const saveVars = ["reelsSpinning", "payoutRemaining", "coins", "slotOne", "slotTwo", "slotThree", "bet"];

function saveGame(){
  for(let v of saveVars){
    eval("localStorage."+v+"="+v);
  }
  localStorage.gameSaved = true;
}
function loadGame(){
  if(localStorage.gameSaved){
    for(let v of saveVars){
      eval(v+"=localStorage."+v);
    }
  }
}

// function to create image objects
// path: filename relative to the images/ directory
function createImage(path){
  let img = new Image();
  imagesNeeded++;
  img.onload = () => imagesLoaded++;
  img.src = "images/" + path;
  return img;
}

// called once when the game starts
function init(){
  canvas.addEventListener("click", event => viewFunctions[currentView].pressed(event));
  canvas.addEventListener("mousemove", event => {
    let rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
    viewFunctions[currentView].moved(event);
  });
  document.addEventListener("keyup", event => viewFunctions[currentView].keyup(event));
  canvas.width = width;
  canvas.height = height;
  ctx.font = "24px Lucida Console";
  ctx.textBaseline = "top";
  images.menubackground = [];
  for(var i =1;i < 9;i++){
    images.menubackground[i] = createImage("mainMenu/"+i+".png");
  }
  images.slotsbackground = createImage("background.png");
  images.spin = [];
  for(let i=0;i<15;i++){
    images.spin.push(createImage("spin/"+i+".png"));
  }
  images.five = createImage("5.png");
  images.ten = createImage("10.png");
  images.twentyfive = createImage("25.png")
  images.cats = [];
  for (var i = 0; i <9; i++) {
     images.cats[i] = [];
     for (var j = 1; j <= 4; j++) {
       images.cats[i][j-1] = createImage("cats/0"+i+"/sprite_"+j+".png");
     };
   };
   loadGame();
}
