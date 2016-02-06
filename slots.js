"use strict";

var reelsSpinning = 3; // # of reels currently spinning
var payoutRemaining = 0; // amount of coins that are being paid
var coins = 100;
var spinFrame = 0;
var whichPic = parseInt(Math.random()*9);
var slotOne = 0;
var slotTwo = 0;
var slotThree = 0;
var frameCount = 0;
var bet = 5;
const payouts = [[5, 20], [6, 25], [6, 20], [8, 30]]; // payouts 2 and 3 respectively of cats 0-3
//               cookies  nice     sassy    follow ur <3

// called each frame in the slots view
function slotsUpdate(){
  frameCount++;
  frameCount = frameCount % 20;
  ctx.drawImage(images.slotsbackground, 0, 0);
  spinFrame = (spinFrame + 1) % 15;

  // give payout at rate according to amount
  if(payoutRemaining < -100){
    payoutRemaining += 10;
    coins -= 10;
  }else if(payoutRemaining < -40){
    payoutRemaining += 6;
    coins -= 6;
  }else if(payoutRemaining < -10){
    payoutRemaining += 3;
    coins -= 3;
  }else if(payoutRemaining < 0){
    payoutRemaining++;
    coins--;
  }else if(payoutRemaining > 1500){
    payoutRemaining -= 120;
    coins += 120;
  }else if(payoutRemaining > 400){
    payoutRemaining -= 30;
    coins += 30;
  }else if(payoutRemaining > 100){
    payoutRemaining -= 10;
    coins += 10;
  }else if(payoutRemaining > 40){
    payoutRemaining -= 6;
    coins += 6;
  }else if(payoutRemaining > 10){
    payoutRemaining -= 3;
    coins += 3;
  }else if(payoutRemaining > 0){
    payoutRemaining--;
    coins++;
  }

  ctx.fillStyle = (payoutRemaining < 0) ? "#FF0000" : "#000000"; // font color
  if(payoutRemaining == 0 || frameCount > 3) ctx.fillText("Coins: " + coins, 4, 4); //blink coins text if there is still payout remaining

  if(reelsSpinning > 2) ctx.drawImage(images.spin[spinFrame], 96, 180);
  else ctx.drawImage(images.cats[slotOne][Math.floor(frameCount/5)], 96, 180);
  if(reelsSpinning > 1) ctx.drawImage(images.spin[(spinFrame+4)%15], 256, 180);
  else ctx.drawImage(images.cats[slotTwo][Math.floor(frameCount/5)], 256, 180);
  if(reelsSpinning > 0) ctx.drawImage(images.spin[(spinFrame+8)%15], 416, 180);
  else ctx.drawImage(images.cats[slotThree][Math.floor(frameCount/5)], 416, 180);

  // buttons for bets
  ctx.drawImage(images.five, 144, 380);
  ctx.drawImage(images.ten, 304, 380);
  ctx.drawImage(images.twentyfive, 464, 380);
}

// called when the mouse is moved
function slotsMouseMoved(event){

}

function calcPayout(event){
  // nums: array for counting cats
  let nums = [];
  nums[slotOne] = nums[slotOne] || 0;
  nums[slotTwo] = nums[slotTwo] || 0;
  nums[slotThree] = nums[slotThree] || 0;
  nums[slotOne] += 1;
  nums[slotTwo] += 1;
  nums[slotThree] += 1;

  if(nums[5]) return; // bathroom break: good day sir

  // check cats 0 - 3
  for(let i=0;i<4;i++){
    if(nums[i]==2){
      payoutRemaining = payouts[i][0]*bet;
      return;
    }
    if(nums[i]==3){
      payoutRemaining = payouts[i][1]*bet;
      return;
    }
  }

  // risk it all?
  if(nums[4]==2){
    payoutRemaining -= bet*bet;
    return;
  }
  if(nums[4]==3){
    payoutRemaining -= 3*bet*bet;
    return;
  }

  // expensive taste: meh when betting 5 but great when betting 25
  if(nums[6]==2){
    payoutRemaining = bet*bet;
    return;
  }
  if(nums[6]==3){
    payoutRemaining = 4*bet*bet;
    return;
  }

  // pay day: best linear payout
  if(nums[7]==2){
    payoutRemaining = 10*bet;
    return;
  }
  if(nums[7]==3){
    payoutRemaining = 40*bet;
    return;
  }

  // pookie: jackpot!!!!!!
  if(nums[8]==3){
    payoutRemaining = 10*bet*bet;
  }
}

// called when the mouse is clicked
// position: mouseX, mouseY
function slotsMousePressed(event){
  whichPic = parseInt(Math.random()*9);
  if(reelsSpinning == 0){ //if this is a new spin
    // check which button pressed
    if(mouseY >= 380 && mouseY <= 402){
      if(mouseX >= 144 && mouseX <= 176){
        if(coins >= 5 && coins + payoutRemaining >= 5){
          coins -= 5;
          bet = 5;
        } else return;
      } else if(mouseX >= 256 && mouseX <= 388){
        if(coins >= 10 && coins + payoutRemaining >= 10){
          coins -= 10;
          bet = 10;
        } else return;
      } else if(mouseX >= 464 && mouseX <= 496){
        if(coins >= 25 && coins + payoutRemaining >= 25){
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
  if(reelsSpinning == 0) calcPayout();
  console.log("hello");
}
//called when keys are pressed
function slotsKeyUp(event){
  console.log(event.keyCode);
  if(event.keyCode >48 && event.keyCode < 58){
    reelsSpinning = (reelsSpinning + 3) % 4 // stop a reel, or spin them all
    if(reelsSpinning == 3) slotOne = event.keyCode - 49;
    if(reelsSpinning == 2) slotTwo = event.keyCode - 49;
    if(reelsSpinning == 1) slotThree = event.keyCode - 49;
    if(reelsSpinning == 0) calcPayout();
  }
}
