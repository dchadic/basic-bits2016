"use strict";

var reelsSpinning = 0; // # of reels currently spinning
var payoutRemaining = 0; // amount of coins that are being paid
var coins = 100;

// called each frame in the slots view
function slotsUpdate(){
  ctx.drawImage(images.background, 0, 0);
  if(payoutRemaining > 0){
    payoutRemaining--;
    coins++;
  }
  let x = payoutRemaining % 10;
  if(!(x==3 || x==4 || x==5)) ctx.fillText("Coins: " + coins, 4, 4); //blink coins text if there is still payout remaining
}

// called when the mouse is moved
function slotsMouseMoved(event){

}

// called when the mouse is clicked
// position: mouseX, mouseY
function slotsMousePressed(event){
  reelsSpinning = (reelsSpinning - 1) % 4 // stop a reel, or spin them all
}
