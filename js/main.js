const gameArea = document.getElementById("gameArea")
const progressBarFill = document.getElementById("progressBarFill");
const progressBarOutline = document.getElementById("progressBarOutline");
const balanceText = document.getElementById("balanceText");

var isInGame = false;
var balance = 0;

//renommer et "inverser" la fonction 
function countdown(seconds) {
    isInGame = true;
    balance++;
    let remainingTime = seconds;
    
    let interval = setInterval(() => {
        remainingTime--;
        let percentage = remainingTime * (100 / seconds);
        progressBarFill.style.width = percentage + "%";
        
        if (percentage <= 15) {
            progressBarOutline.style.boxShadow = "box-shadow: inset 0 0 0 0.5vh rgb(255, 105, 46), inset 0 0 0 0.65vh #000000, inset 0 0 0.5vh 0.65vh #000000";
        }
        if (remainingTime < 0) {
            clearInterval(interval);
            progressBarOutline.style.boxShadow = "box-shadow: inset 0 0 0 0.5vh #FFE62B, inset 0 0 0 0.65vh #000000, inset 0 0 0.5vh 0.65vh #000000";
            progressBarFill.style.width = "100%";
            balanceText.textContent = `${balance}`;
            isInGame = false;
        }
    }, 1000);
}

function frameClicked(event) {
    if (isInGame == false) {
        countdown(5);
    }
}
