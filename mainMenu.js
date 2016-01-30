"use strict";

// called once per frame for main main
function mainMenuUpdate(){
  ctx.drawImage(images.menubackground, 0, 0);
}

// called when the mouse is moved
function mainMenuMouseMoved(event){

}

// called when the mouse is clicked
// position: mouseX, mouseY
function mainMenuMousePressed(event){
  currentView = "slots";
}
