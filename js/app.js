const barreRemplissage = document.getElementById("barreRemplissage");
const curseurCentre = document.getElementById("curseurCentre");
const barreConbarreContourtenu = document.getElementById("barreContour");
const fenetreJeuMain = document.getElementById("fenetreJeuMain");
const texteRound = document.getElementById("texteRound");
const tableauResultats = document.getElementById("tableauResultats");

var enJeu = false;
var resultats = ["NAIcon.png","looseIcon.png","winIcon.png"];
var round = 0;

//const firstTh = tableauResultats.getElementsByTagName("th")[round];
//const img = firstTh.querySelector("img");
//img.src = "ressources/images/icones/winIcon.png";

function compteRebours(secondes){
	enJeu = true;
    texteRound.textContent = `Round ${round+1}/5`;
    let tempsRestant = secondes;
    
    let intervalle = setInterval(() => {
		tempsRestant--;
        let pourcentage = tempsRestant * (100 / secondes);
		barreRemplissage.style.width = pourcentage + "%";
		
        if (pourcentage <= 15) {
            barreContour.style.boxShadow = "box-shadow: inset 0 0 0 0.5vh rgb(255, 105, 46), inset 0 0 0 0.65vh #000000, inset 0 0 0.5vh 0.65vh #000000";
        }
        if (tempsRestant < 0) {
            clearInterval(intervalle);
            barreContour.style.boxShadow = "box-shadow: inset 0 0 0 0.5vh #FFE62B, inset 0 0 0 0.65vh #000000, inset 0 0 0.5vh 0.65vh #000000";
			barreRemplissage.style.width = "100%";

            
            round ++;
			enJeu = false;
        }
    }, 1000);
}

function posCurseur(event) {
    let rect = fenetreJeuMain.getBoundingClientRect(); // Get container position
    let x = event.clientX - rect.left; // Get x relative to the container
    let y = event.clientY - rect.top;  // Get y relative to the container

    curseurCentre.style.left = `${x - curseurCentre.offsetWidth / 2}px`;
    curseurCentre.style.top = `${y - curseurCentre.offsetHeight / 2}px`;
}

function interactionCurseur(event){
    //verifier les etats pour savoir si en jeu ou non, si pas en jeu, on en lance un
    if (enJeu == false){
        compteRebours("10");
    }
}