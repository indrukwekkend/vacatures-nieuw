import ReactDOM from "react-dom"
import React, {useEffect} from "react";
import { useTotalStore, useSingleStore  } from "../_Store/vacatureStore";

const divsToUpdate = document.querySelectorAll(".vacature-aantal-update-me")
// //get state from store

divsToUpdate.forEach(div => {
  // haal alle dat op die in de div staat
	// render de react component in de div
  ReactDOM.render(<TellerAllVacatures	/>, div)
	// verwijder de class die de div heeft
  div.classList.remove("vacature-aantal-update-me")
	// add list of classes to div die uit de data komt
	div.classList.add("teller-totaal")

})


function TellerAllVacatures() {

   //state
   const { posts, getPost } = useTotalStore((state) => ({
    posts: state.posts,
    loading: state.loading,
    getPost: state.getPost,
  }))

  useEffect(() => {

    getPost(-1);

  }, [])

  return (

    <>{posts.length}</>
    
  )
}
