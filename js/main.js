//-------------------------------------------------------------
//                      GAME VARIABLES
//-------------------------------------------------------------

var isCooledDown = false;
var balance = 0;
var cooldownDuration = 10;
var unitFabricationDuration = 18;
var valueMultiplication = 1;

//-------------------------------------------------------------
//                      ELEMENT SELECTION
//-------------------------------------------------------------

const gameArea = document.getElementById("gameArea")
const progressBarFill = document.getElementById("progressBarFill");
const progressBarOutline = document.getElementById("progressBarOutline");
const balanceText = document.getElementById("balanceText");
const playerStats = document.getElementById("playerStats");

//-------------------------------------------------------------
//                      UPGRADE VARIABLES
//-------------------------------------------------------------

var upgradeElements = {
    u1: {
        box: document.getElementById("upgrade1Box"),
        price: 20,
        priceText: document.getElementById("priceUpgrade1Text")
    },
    u2: {
        box: document.getElementById("upgrade2Box"),
        price: 50,
        priceText: document.getElementById("priceUpgrade2Text")
    }
};

//-------------------------------------------------------------
//                      INITIALISATION
//-------------------------------------------------------------

for (let key in upgradeElements) {
    upgradeElements[key].priceText.textContent = `${upgradeElements[key].price}`;
}

//-------------------------------------------------------------
//                         FUNCTIONS
//-------------------------------------------------------------

function checkForAvailableUpgrade(amount) {
    for (let key in upgradeElements) {
        let { box, price } = upgradeElements[key];

        if (amount >= price) {
            if (box.classList.contains("locked")) {
                box.classList.remove('locked');
                box.classList.add('unlocked');
                box.addEventListener("click", buyUpgrade);
            }
        } else {
            if (box.classList.contains("unlocked")) {
                box.classList.remove('unlocked');
                box.classList.add('locked');
                box.removeEventListener("click", buyUpgrade);
            }
        }
    }
}

function buyUpgrade(event) {
    let clickedBox = event.currentTarget;
    let key = Object.keys(upgradeElements).find(k => upgradeElements[k].box === clickedBox);
    
    if (!key) return;
    if (balance < upgradeElements[key].price) return;

    balance -= upgradeElements[key].price;
    balanceText.textContent = `${balance}`;
    checkForAvailableUpgrade(balance);
    if (key === "u1") {
        fasterCooldownUpgrade();
    }
    if (key === "u2") {
        valueMultiplicationUpgrade();
    }
}

function unitFabrication(){
    var unit = document.createElement('img');
    unit.src = "../assets/images/units/shape.png";
    unit.className = "unit";
    unit.style.animation = `unitAnimation ${unitFabricationDuration}s linear`
    gameArea.appendChild(unit);

    unit.addEventListener('animationend', function() {
        balance += valueMultiplication;
        balanceText.textContent = `${balance}`;
        checkForAvailableUpgrade(balance)
        unit.remove()

        playerStats.style.animation = `gainBlinkingAnimation 1s`;
        playerStats.addEventListener('animationend', function() {
            playerStats.style.animation = '';
        }, { once: true });
    });
}

function activateCooldown(seconds) {
    isCooledDown = true;
    unitFabrication();
    progressBarFill.style.width = '0%';
    progressBarFill.style.background = "repeating-linear-gradient(45deg, #24CEFB, #24CEFB 2.5vh, #00A0EA 2.5vh, #00A0EA 5vh)";
    progressBarFill.style.animation = `fillingAnimation ${cooldownDuration}s linear 1 forwards`;
    progressBarFill.addEventListener('animationend', function() {
        isCooledDown = false;
        progressBarFill.style.width = '100%';
        progressBarFill.style.background = "repeating-linear-gradient(45deg,rgb(86, 251, 36), rgb(86, 251, 36) 2.5vh,rgb(24, 163, 54) 2.5vh, rgb(24, 163, 54) 5vh)";
        progressBarFill.style.animation = '';
        progressBarOutline.style.animation = `barBlinkingAnimation 1s`;
        progressBarOutline.addEventListener('animationend', function() {
            progressBarOutline.style.animation = '';
        }, { once: true });
    });
}

function frameClicked(event) {
    if (!isCooledDown) {
        progressBarFill.style.width = '0%';
        activateCooldown(cooldownDuration);
    }
}

function fasterCooldownUpgrade(){
    cooldownDuration = (cooldownDuration/2);
    updateUpgradePrice("u1", 10, "add");
}

function valueMultiplicationUpgrade(){
    valueMultiplication *= 2;
    updateUpgradePrice("u2", 30, "add");
}

function updateUpgradePrice(upgrade, value, operation){
    if (operation === "add") {
        upgradeElements[upgrade].price += value;
    }
    else if (operation === "mul") {
        upgradeElements[upgrade].price *= value;
    }

    upgradeElements[upgrade].priceText.textContent = `${upgradeElements[upgrade].price}`;
}
