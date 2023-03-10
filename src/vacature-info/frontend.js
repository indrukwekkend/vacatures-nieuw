import ReactDOM from "react-dom"
import VacatureInfo from "./components/VacatureInfo"

//Wat er in de div staat, wordt in de data variabele gestopt
const divsToUpdate = document.querySelectorAll(".info-update-me")
let data = [];

divsToUpdate.forEach(div => {
  // haal alle dat op die in de div staat
	data = JSON.parse(div.querySelector("pre").innerText)

	// render de react component in de div
  ReactDOM.render(<OurComponent {...data} />, div)

	// verwijder de class die de div heeft
  div.classList.remove("info-update-me")

	//add list of classes to div die uit de data komt
	div.classList.add('wp-block-indrukwekkend-vacature-info')
	div.classList.add("align"+data.align)
})

function OurComponent(props) {
  return (
		<>
			<VacatureInfo {...props} />
		</>
  )
}


// Form snippet
// Path: src/vacature-info/frontend.js
// inladen van het sollicitatieformulier
//
// in de PHP CLASS wordt de JS ingeladen van Bullhorn.
// In de JS wordt de data uit de div gehaald en in de data variabele gestopt
// De bearertoken wordt uit de data gehaald en in de data variabele gestopt
// De data variabele wordt meegegeven aan de init functie van de CXSForm
//
// We moeten nog de juiste ID van het formulier hebben, die is afhankelijk van makkelijk of moeilijk vervulbaar. 

// on window.load
window.onload = function() {

	var column_afbeelding = document.querySelector('.wp-block-column.afbeelding-kolom');

	if (column_afbeelding) {
		var navigationHeight = column_afbeelding.offsetHeight;
		document.documentElement.style.setProperty('--column-height', navigationHeight +'px');
	}

	// console.log("window.onload");
	var thanks = document.getElementById("thanks");
	var form = document.getElementById("form-container");
	var button = document.getElementById("solliciteer");

	// Hide the success alert
	if (thanks)	{
		thanks.classList.add("hidden");
	}

	// console.log(data);
	// Gerichte sollicitatie moeilijk vervulbaar: 925c2d5c-9bdf-45ca-9311-884527be9baa 
	// Gerichte sollicitatie standaard: a6785e79-016c-4757-8c3f-94994b3d48f4 
	// Open sollicitatie: c6121838-e514-4412-9135-f51407f742dc

	if (form) {
		if (data.formsoort === "2") {
			data.formid = "925c2d5c-9bdf-45ca-9311-884527be9baa";
		} else {
			data.formid = "a6785e79-016c-4757-8c3f-94994b3d48f4";
		}
		
		// Initialize
		CXSForm
		// JWT bearer token, uit de "pre" van de app, zie index en .
		.bearer(data.bearertoken)
		// Form ID 
		.formId(data.formid)
		// Options
		.setOptions({
				locale: "nl",
				// Hide the container/buttons and show the success alert
				onSubmitSuccess: function() {
					
						//waarschijnlijk naar bedankt pagina later
						form.classList.add("hidden");
						button.classList.add("hidden");
						thanks.classList.remove("hidden");

				}
		})
		// Initialize CXSForm
		.init("#form-container");
	}
}

// onclick event op id readmore
var readmore = document.getElementById("read-more");

if	(readmore) {
	readmore.addEventListener("click", function() {

		var seeMore = this.firstChild;

		var column = document.getElementById("api-content");

		console.log(column);

		if (column.classList.contains("verborgen")) {
			column.classList.remove("verborgen");
			seeMore.innerText = "Lees minder";
		} else {
			column.classList.add("verborgen");
			seeMore.innerText = "Lees meer";
		}
	});
		
}

