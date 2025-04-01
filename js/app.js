const btnCommencer = document.getElementById("btnCommencer");
const barreRemplissage = document.getElementById("barreRemplissage");
const barreContenu = document.getElementById("barreContenu");

btnCommencer.addEventListener('click', () => compteRebours("10"));

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
			barreRemplissage.style.width = "0%";
			btnCommencer.disabled = false;
        }
    }, 1000);
}
