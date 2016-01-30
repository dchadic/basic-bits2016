"use strict";

var reelsSpinning = 0; // # of reels currently spinning
var payoutRemaining = 0; // amount of coins that are being paid
var coins = 100;

// called each frame in the slots view
function slotsUpdate(){
  ctx.drawImage(images.slotsbackground, 0, 0);
  if(payoutRemaining > 0){
    payoutRemaining--;
    coins++;
  }
  let x = payoutRemaining % 10;
  if(!(x==3 || x==4 || x==5)) ctx.fillText("Coins: " + coins, 4, 4); //blink coins text if there is still payout remaining
  if(reelsSpinning > 2) ctx.drawImage(images.spinning, 70, 160);
  else ctx.drawImage(images.symbol, 70, 160);
  if(reelsSpinning > 1) ctx.drawImage(images.spinning, 240, 160);
  else ctx.drawImage(images.symbol, 240, 160);
  if(reelsSpinning > 0) ctx.drawImage(images.spinning, 410, 160);
  else ctx.drawImage(images.symbol, 410, 160);
}

// called when the mouse is moved
function slotsMouseMoved(event){

}

// called when the mouse is clicked
// position: mouseX, mouseY
function slotsMousePressed(event){
  if(reelsSpinning == 0){ //if this is a new spin
    if(coins >= 10) coins -= 10;
    else return;
  }
  reelsSpinning = (reelsSpinning + 3) % 4 // stop a reel, or spin them all
  if(reelsSpinning == 0) payoutRemaining += 20; // once all reels stop, payout
}
