import React, {useEffect} from 'react'
import { useStore } from '../../_Store/vacatureStore'


// import ItemDetails from './ItemDetails'

// op basis van het veranderen van het zoekveld moet de functie getVacatures worden aangeroepen
// de functie getVacatures moet de state van de vacatures updaten

const SearchFilter = () => {

  //Zustand States van de vacatures
  const {vacatures, getVacatures} = useStore((state) => ({
    vacatures: state.vacatures,
    getVacatures: state.getVacatures
  }))

  //get the functions from the store
  const updateSearchText = useStore( (state) => state.updateSearchText)

  //get the states from the store
  const searchText = useStore( (state) => state.searchText)

  const handleSubmit = (e) => {
    e.preventDefault();
    var searchText = e.target[0].value; 
    updateSearchText(searchText)
    getVacatures(-1);
  }

  const handleChange = (e) => {
    var searchText = e.value; 
    updateSearchText(searchText)

    //werkt niet maar zoiets moet er komen:
    // if (searchText == '') {
    //   getVacatures(-1);
    // }
  }

  //Zustand States van de filters

  return (
    <>
      <p>Zoek vacatures op trefwoord</p>
      <form onSubmit={handleSubmit}>
        <input 
          className="zoekveld" 
          type="text" 
          value={searchText} 
          placeholder="Zoek op trefwoord" 
          onChange={handleChange}  
        />
        <button 
          type="submit"
          title="Zoek in vacatures op trefwoord"
        >Zoek vacatures</button>
        {/* <button 
          title=""
          onClick={() => {
            updateSearchText('')
            resetFilters()
            getVacatures(-1);
          }}
        >Reset filter</button> */}
      </form>
      
    </>
  )
}

export default SearchFilter