"use strict";
var frameCount = 0;
// called once per frame for main main
function mainMenuUpdate(){
  frameCount++;
  frameCount = frameCount % 40;
  ctx.drawImage(images.menubackground[Math.floor(frameCount/5+1)], 0, 0);
}

// called when the mouse is moved
function mainMenuMouseMoved(event){

}

// called when the mouse is clicked
// position: mouseX, mouseY
function mainMenuMousePressed(event){
  currentView = "slots";
}
