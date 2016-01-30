// called once per frame for main main
function mainMenuUpdate(){
  ctx.drawImage(images.background, 0, 0);
}

function mainMenuMouseMoved(event){

}

//doesnt work yet!!!!
function mainMenuMousePressed(event){
  console.log("changing to slots");
  currentView = "slots";
}
