//suppr, faire un dictionnaire qui régie toutes les variables liées aux upgrade
//suppr, renommer certaines variables

//-------------------------------------------------------------
//                      GAME VARIABLES
//-------------------------------------------------------------

var isCooledDown = false;
var balance = 0;
var cooldownDuration = 3;
var unitFabricationDuration = 3;
var shape = 1;

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

const upgrade1Box = document.getElementById("upgrade1Box");
const upgrade2Box = document.getElementById("upgrade2Box");
const upgrade3Box = document.getElementById("upgrade3Box");
const upgrade4Box = document.getElementById("upgrade4Box");

var priceUpgrade1 = 1;
var priceUpgrade2 = 1;
var priceUpgrade3 = 1;
var priceUpgrade4 = 1;

var priceUpgrade1Text = document.getElementById("priceUpgrade1Text");
var priceUpgrade2Text = document.getElementById("priceUpgrade2Text");
var priceUpgrade3Text = document.getElementById("priceUpgrade3Text");
var priceUpgrade4Text = document.getElementById("priceUpgrade4Text");

var upgradeElements = {
    u1 : [upgrade1Box, priceUpgrade1, priceUpgrade1Text],
    u2 : [upgrade2Box, priceUpgrade2, priceUpgrade2Text],
    u3 : [upgrade3Box, priceUpgrade3, priceUpgrade3Text],
    u4 : [upgrade4Box, priceUpgrade4, priceUpgrade4Text]
}

//-------------------------------------------------------------
//                      INITIALISATION
//-------------------------------------------------------------

priceUpgrade1Text.textContent = `${priceUpgrade1}`; //suppr?
priceUpgrade2Text.textContent = `${priceUpgrade2}`;
priceUpgrade3Text.textContent = `${priceUpgrade3}`;
priceUpgrade4Text.textContent = `${priceUpgrade4}`;

//-------------------------------------------------------------
//                         FUNCTIONS
//-------------------------------------------------------------

function checkForAvailableUpgrade(amount) {
    for (let key in upgradeElements) {
        let [upgradeBox, priceUpgrade, priceUpgradeText] = upgradeElements[key];

        if (amount >= priceUpgrade) {
            if (upgradeBox.classList.contains("locked")) {
                upgradeBox.classList.remove('locked');
                upgradeBox.classList.add('unlocked');
                upgradeBox.addEventListener("click", buyUpgrade);
            }
        } else {
            if (upgradeBox.classList.contains("unlocked")) {
                upgradeBox.classList.remove('unlocked');
                upgradeBox.classList.add('locked');
                upgradeBox.removeEventListener("click", buyUpgrade);
            }
        }
    }
}

function buyUpgrade(event) {
    key = Object.keys(upgradeElements).find(k => upgradeElements[k].includes(event.target));
    balance -= upgradeElements[key][1];
    balanceText.textContent = `${balance}`;
    checkForAvailableUpgrade(balance)
    if (key === "u1") {
        fasterCooldownUpgrade()
    }
    if (key === "u2") {
        fasterUnitFabricationUpgrade()
    }
    if (key === "u3") {
        unitReshaperUpgrade()
    }
    //suppr, ajouter la derniere upgrade
}

function unitFabrication(seconds){
    var unit = document.createElement('img');
    unit.src = shapeAttribution();
    unit.className = "unit";
    unit.style.animation = `unitAnimation ${seconds}s linear`
    gameArea.appendChild(unit);

    unit.addEventListener('animationend', function() {
        balance++;
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
    unitFabrication(unitFabricationDuration);
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

//-------------------------------------------------------------
//                      UPGRADE FUNCTIONS
//-------------------------------------------------------------

function fasterCooldownUpgrade(){
    cooldownDuration --;
    updateUpgradePrice("u1", 3);
}

function fasterUnitFabricationUpgrade(){
    unitFabricationDuration /= 2;
    updateUpgradePrice("u2", 4);
}

function unitReshaperUpgrade(){
    shape += 1;
    
    updateUpgradePrice("u3", 2);
}

function shapeAttribution() {
    if (shape === 1){
        return '../assets/images/units/shape-1.png'
    } 
    if (shape === 2){
        return '../assets/images/units/shape-2.png'
    }
}

function updateUpgradePrice(upgrade, factor){
    upgradeElements[upgrade][1] *= factor;
    upgradeElements[upgrade][2].textContent = `${upgradeElements[upgrade][1]}`;
}