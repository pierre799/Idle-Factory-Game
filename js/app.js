const btnCommencer = document.getElementById("btnCommencer");
const barreRemplissage = document.getElementById("barreRemplissage");
const curseurCentre = document.getElementById("curseurCentre");
const barreConbarreContourtenu = document.getElementById("barreContour");
const fenetreJeuMain = document.getElementById("fenetreJeuMain")

btnCommencer.addEventListener('click', () => compteRebours("3"));

function compteRebours(secondes){
	btnCommencer.disabled = true;

    let tempsRestant = secondes;
    
    let intervalle = setInterval(() => {
		tempsRestant--;
        let pourcentage = tempsRestant * (100 / secondes);
		barreRemplissage.style.width = pourcentage + "%";
		
        if (pourcentage <= 15) {
            barreContour.style.boxShadow = "inset 0 0 0px 3px rgb(255, 105, 46), inset 0 0 0px 4px #000000,  inset 0 0 4px 4px #000000";
        }
        console.log(pourcentage);
        if (tempsRestant < 0) {
            clearInterval(intervalle);
            barreContour.style.boxShadow = "inset 0 0 0px 3px #FFE62B, inset 0 0 0px 4px #000000,  inset 0 0 4px 4px #000000";
			barreRemplissage.style.width = "100%";
			btnCommencer.disabled = false;
        }
    }, 1000);
}

function posCurseur(event) {
    let rect = fenetreJeuMain.getBoundingClientRect(); // Get container position
    let x = event.clientX - rect.left; // Get x relative to the container
    let y = event.clientY - rect.top;  // Get y relative to the container

    curseurCentre.style.left = `${x - 800}px`;
    curseurCentre.style.top = `${y - 800}px`;
}