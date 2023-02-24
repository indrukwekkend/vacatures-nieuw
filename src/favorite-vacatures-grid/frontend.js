import ReactDOM from "react-dom"
import Vacatures from "./components/Vacatures"


//Wat er in de div staat, wordt in de data variabele gestopt
const divsToUpdate = document.querySelectorAll(".favorieten-update-me")

if (divsToUpdate.length != 0) {

	console.log("divsToUpdate", divsToUpdate)

	divsToUpdate.forEach(div => {
		// haal alle dat op die in de div staat
		const data = JSON.parse(div.querySelector("pre").innerText)

		// render de react component in de div
		ReactDOM.render(<OurComponent {...data} />, div)

		// verwijder de class die de div heeft
		div.classList.remove("favorieten-update-me")

		//add list of classes to div die uit de data komt
		div.classList.add("wp-block-indrukwekkend-favorieten-vacatures-grid")
		div.classList.add("align"+data.align)
		div.classList.add("columns-"+data.columns)
	})
}

function OurComponent(props) {
  return (
		<>
			<main className="vacatures">
				<Vacatures {...props} />
			</main>
		</>
  )
}
