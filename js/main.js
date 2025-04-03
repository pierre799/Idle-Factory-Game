const barFill = document.getElementById("barFill");
const barOutline = document.getElementById("barOutline");
const balanceText = document.getElementById("balanceText");

var isInGame = false;
var balance = 0;

//renommer et "inverser" la fonction 
function countdown(seconds) {
    isInGame = true;
    balanceText.textContent = `${balance + 1}`;
    let remainingTime = seconds;
    
    let interval = setInterval(() => {
        remainingTime--;
        let percentage = remainingTime * (100 / seconds);
        barFill.style.width = percentage + "%";
        
        if (percentage <= 15) {
            barOutline.style.boxShadow = "box-shadow: inset 0 0 0 0.5vh rgb(255, 105, 46), inset 0 0 0 0.65vh #000000, inset 0 0 0.5vh 0.65vh #000000";
        }
        if (remainingTime < 0) {
            clearInterval(interval);
            barOutline.style.boxShadow = "box-shadow: inset 0 0 0 0.5vh #FFE62B, inset 0 0 0 0.65vh #000000, inset 0 0 0.5vh 0.65vh #000000";
            barFill.style.width = "100%";
            balance++;
            isInGame = false;
        }
    }, 1000);
}

function cursorInteraction(event) {
    if (isInGame == false) {
        countdown(5);
    }
}
