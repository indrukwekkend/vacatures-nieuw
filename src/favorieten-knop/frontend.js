import ReactDOM from "react-dom"
import React from "react";
import { useFavStore  } from "../_Store/vacatureStore";

/**
 * Deze app regelt de navigatie van de vacature onderdelen
 * Search, Favorites, Job Allert
 * 
 * 2 functies voor de header buttons op de site:
 * 
 * 1. update de favorites button
 * 2. on click search button, show search form
 * 3. Job alert button
 * 
 */

////////////////////////////////////////////
//
// 1. update the favorites button
//
////////////////////////////////////////////

const divsToUpdate = document.querySelectorAll(".favorieten-knop-update-me")
// //get state from store

divsToUpdate.forEach(div => {
	// verwijder de class die de div heeft
  div.classList.remove("favorieten-knop-update-me")
	// add list of classes to div die uit de data komt
	div.classList.add("teller")

  // haal alle dat op die in de div staat
	// render de react component in de div
  ReactDOM.render(<OurComponent	/>, div)

})


function OurComponent() {
  // const favorites = useFavStore((state) => state.favorites)

  const favorites = useFavStore((state) => state.favorites)

  if (document.querySelector(".teller") !== null) {
    favorites.length > 0 ? document.querySelector(".teller").classList.add("show") : document.querySelector(".teller").classList.remove("show")
  }

  
  return (
    favorites.length > 0 &&
    <>{favorites.length}</>
  )
}

////////////////////////////////////////////
//
// 2. on click search button, show search form
//
////////////////////////////////////////////

const searchButton = document.querySelector(".search-button")
const searchForm = document.querySelector("#search")

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  searchForm.classList.toggle("show");
  searchButton.classList.toggle("open");
});

////////////////////////////////////////////
//
// 3. Job alert button
//
////////////////////////////////////////////

const jobAlertButton = document.querySelector("#jobalert")
const jobAlertCloseButton = document.querySelector("#jobalert-close")
const jobAlertForm = document.querySelector("#jobalert-holder")

jobAlertButton.addEventListener("click", (e) => {
  e.preventDefault();
  jobAlertForm.classList.toggle("show");
  // When the modal is shown, we want a fixed body
  document.body.style.position = 'fixed';
  document.body.style.top = `-${window.scrollY}px`;
});

jobAlertCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  jobAlertForm.classList.toggle("show");
  // When the modal is hidden, we want to remain at the top of the scroll position
  const scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);

});

