const btn = document.getElementById("boutonMagique");
const expl = document.getElementById("texteMagique");

btn.addEventListener('click', fonctionMagique);

function fonctionMagique(){
	expl.textContent = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

	expl.style.fontSize = "27pt";
	expl.style.color = "red";
	expl.style.backgroundColor = "yellow";
}