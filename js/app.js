const fenetreJeu = document.getElementById("fenetreJeu");
const btnCommencer = document.getElementById("btnCommencer");
const barreRemplissage = document.getElementById("barreRemplissage");
const barreContenu = document.getElementById("barreContenu");
const curseurCentre = document.getElementById("curseurCentre");

const evenement = document.event;

btnCommencer.addEventListener('click', () => compteRebours("30"));

function compteRebours(secondes){
	btnCommencer.disabled = true;

    let tempsRestant = secondes;
    
    let intervalle = setInterval(() => {
		tempsRestant--;
        let pourcentage = tempsRestant*(100/secondes);
		barreRemplissage.style.width = pourcentage + "%";
		
        if (pourcentage <= 10) {
            barreContenu.style.backgroundColor = "rgb(121, 38, 38)";
        }

        if (tempsRestant < 0) {
            clearInterval(intervalle);
            barreRemplissage.style.width = "100%"
            barreContenu.style.backgroundColor = "rgb(60, 55, 50)";
			btnCommencer.disabled = false;
        }
    }, 1000);
}

/// tests

function posCurseur(event) {
    let x = event.pageX; //fenetreJeu.offsetLeft
    let y = event.pageY; //fenetreJeu.offsetTop
    curseurCentre.style.left=`${x-25}px`; //changer à - la moitié de la largeur
    curseurCentre.style.top=`${y-25}px`;
}
