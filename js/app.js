const barreRemplissage = document.getElementById("barreRemplissage");
const curseurCentre = document.getElementById("curseurCentre");
const barreConbarreContourtenu = document.getElementById("barreContour");
const fenetreJeuMain = document.getElementById("fenetreJeuMain");
const texteMonnaie = document.getElementById("texteMonnaie");
const tableauResultats = document.getElementById("tableauResultats");

var enJeu = false;
var resultats = ["NAIcon.png","looseIcon.png","winIcon.png"];
var monnaie = 0;

function compteRebours(secondes){
	enJeu = true;
    texteMonnaie.textContent = `${monnaie+1}`;
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

            
            monnaie ++;
			enJeu = false;
        }
    }, 1000);
}

function posCurseur(event) {
    let rect = fenetreJeuMain.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    curseurCentre.style.left = `${x - curseurCentre.offsetWidth / 2}px`;
    curseurCentre.style.top = `${y - curseurCentre.offsetHeight / 2}px`;
}

function interactionCurseur(event){
    if (enJeu == false){
        compteRebours("5");
    }
}