"use strict";

var reelsSpinning = 0; // # of reels currently spinning
var payoutRemaining = 0; // amount of coins that are being paid
var coins = 100;
var spinFrame = 0;
var winMaybe = 0;
var whichPic = parseInt(Math.random()*9);
var slotOne = 0;
var slotTwo = 0;
var slotThree = 0;
var frameCount = 0;
var bet = 0;

// called each frame in the slots view
function slotsUpdate(){
  frameCount++;
  frameCount = frameCount % 20;
  ctx.drawImage(images.slotsbackground, 0, 0);
  spinFrame = (spinFrame + 1) % 15;
  if(payoutRemaining > 0){
    payoutRemaining--;
    coins++;
  }
  let x = payoutRemaining % 10;
  if(!(x==3 || x==4 || x==5)) ctx.fillText("Coins: " + coins, 4, 4); //blink coins text if there is still payout remaining
  if(reelsSpinning > 2) ctx.drawImage(images.spin[spinFrame], 96, 180);
  else ctx.drawImage(images.cats[slotOne][Math.floor(frameCount/5)], 96, 180);
  if(reelsSpinning > 1) ctx.drawImage(images.spin[(spinFrame+4)%15], 256, 180);
  else ctx.drawImage(images.cats[slotTwo][Math.floor(frameCount/5)], 256, 180);
  if(reelsSpinning > 0) ctx.drawImage(images.spin[(spinFrame+8)%15], 416, 180);
  else ctx.drawImage(images.cats[slotThree][Math.floor(frameCount/5)], 416, 180);

  ctx.drawImage(images.five, 144, 380);
  ctx.drawImage(images.ten, 304, 380);
  ctx.drawImage(images.twentyfive, 464, 380);
}

// called when the mouse is moved
function slotsMouseMoved(event){

}

// called when the mouse is clicked
// position: mouseX, mouseY
function slotsMousePressed(event){
  whichPic = parseInt(Math.random()*9);
  if(reelsSpinning == 0){ //if this is a new spin
    if(mouseY >= 380 && mouseY <= 402){
      if(mouseX >= 144 && mouseX <= 176){
        if(coins >= 5){
          coins -= 5;
          bet = 5;
        } else return;
      } else if(mouseX >= 256 && mouseX <= 388){
        if(coins >= 10){
          coins -= 10;
          bet = 10;
        } else return;
      } else if(mouseX >= 464 && mouseX <= 496){
        if(coins >= 25){
          coins -= 25;
          bet = 25;
        } else return;
      } else return;
    }
    else return;
  }
  reelsSpinning = (reelsSpinning + 3) % 4 // stop a reel, or spin them all
  if(reelsSpinning == 3) slotOne = whichPic;
  if(reelsSpinning == 2) slotTwo = whichPic;
  if(reelsSpinning == 1) slotThree = whichPic;
  if(reelsSpinning == 0) payoutRemaining += 20; // once all reels stop, payout
}
