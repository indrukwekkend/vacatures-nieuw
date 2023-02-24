import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import ReactDOM from "react-dom"

import CategorieFilter from "./components/CategorieFilter"
import SearchFilter from "./components/SearchFilter"
import Vacatures from "./components/Vacatures"
import VacatureSlider from "./components/Vacature-slider"

const divsToUpdate = document.querySelectorAll(".boilerplate-update-me")

divsToUpdate.forEach(div => {
  // haal alle dat op die in de div staat
	const data = JSON.parse(div.querySelector("pre").innerText)

	// render de react component in de div
  ReactDOM.render(<OurComponent {...data}	/>, div)

	// verwijder de class die de div heeft
  div.classList.remove("boilerplate-update-me")

	// add list of classes to div die uit de data komt
	div.classList.add("wp-block-indrukwekkend-all-vacatures-grid")
	div.classList.add("align"+data.align)
	div.classList.add("columns-"+data.columns)
	div.classList.add(data.postLayout)
	div.setAttribute('role', 'section')
	div.setAttribute('aria-label', 'Vacatures')

	console.log(data.postLayout)
	data.displayFilter &&
	div.classList.add("has-filter")
})

function OurComponent(props) {
	const { displayFilter, postLayout, displaySearch } = props;
  return (
		<>
			{ displaySearch && (
				<div className="searchbar">
					<SearchFilter />
				</div>
			) }

			<div className={postLayout}>
				{ displayFilter && (
				<aside className="filter">
					<CategorieFilter />
				</aside>
				) }
				<main className="vacatures">
					{postLayout === "slides" && (
						<VacatureSlider {...props} />
					)}
					{postLayout != "slides" && (
						<Vacatures {...props} />
					)}
				</main>
			</div>

		</>
  )
}
