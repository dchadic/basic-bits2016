const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const images = {}; // dict to contain images. add them using createImage()

const width = 640; // width of the game in pixels
const height = 480;
const framerate = 20; // # of frames per second
var imagesLoaded = 0; // # of images that are done loading
var imagesNeeded = 0; // # of images that still need to load

// function to create image objects
// path: filename relative to the images/ directory
function createImage(path){
  let img = new Image();
  imagesNeeded++;
  img.onload = () => imagesLoaded++;
  img.src = "images/" + path;
}

// called once when the game starts
function init(){
  images.background = createImage("filler_background.png");
}

// called once per frame. use it to update game variables
function update(){}

// called once per frame after update. use it to draw graphics.
function draw(){
  ctx.drawImage(images.background, 0, 0);
}

//execute game
init();
setInterval(()=>{
  if(imagesLoaded < imagesNeeded) return;
  update();
  draw();
}, 1000/framerate);
