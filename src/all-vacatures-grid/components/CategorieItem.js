import React from 'react'
import parse from 'html-react-parser';
import { useStore } from '../../_Store/vacatureStore'

const CategorieItem = (item) => {

  item = item.item
  const {id, name, taxonomy, count} = item

  //dit is voor de update van de vacatures
  const {vacatures, getVacatures} = useStore((state) => ({
    vacatures: state.vacatures,
    getVacatures: state.getVacatures
  }))
  //hier de andere variabelen uit de states halen, bijv:
  const loading = useStore((state) => state.loading);

  //get the functions from the store
  const toggleFilterErvaringen = useStore( (state) => state.toggleFilterErvaringen)
  const toggleFilterWerkvelden = useStore( (state) => state.toggleFilterWerkvelden)
  const toggleFilterNiveaus = useStore( (state) => state.toggleFilterNiveaus)
  
  //get the states from the store
  const filterNiveaus = useStore( (state) => state.filterNiveaus)
  const filterWerkvelden = useStore( (state) => state.filterWerkvelden)
  const filterErvaringen = useStore( (state) => state.filterErvaringen)

  let isChecked = false

  //set the checkboxes based upon state
  // if is in array then checked
  if (taxonomy == 'ervaring') {
    isChecked = filterErvaringen.includes(id.toString()) ? true : false
  } else if (taxonomy == 'werkveld') {
    isChecked = filterWerkvelden.includes(id.toString()) ? true : false
  } else if (taxonomy == 'niveau') {
    isChecked = filterNiveaus.includes(id.toString()) ? true : false
  }


  //handlechange nog maken
  const handleChange = (e) => {

    isChecked = e.target.checked;  
    var id = e.target.value;  
    var taxonomy = e.target.dataset.taxonomy;

    // uitzoeken: voor alle checkboxes op de pagina: aan of uit?
    // Van alle actieve checkboxes doorgeven aan de functie getVacatures
    // als niets is geactiveerd: haal ze allemaal op
    // deze check moet anders
    //set de state van de checkbox
    if (taxonomy == 'ervaring') {
      toggleFilterErvaringen(id)
    }
    if (taxonomy == 'werkveld') {

      toggleFilterWerkvelden(id)
    }
    if (taxonomy == 'niveau') {
      toggleFilterNiveaus(id)
    }

    getVacatures(-1);

    let button = document.getElementById('checkbox-'+taxonomy+'-'+id);
    button.checked = isChecked;
 
  }
 
    return (
      <li>  
        <label>  
          <input 
            id= {'checkbox-'+taxonomy+"-"+id }
            type="checkbox"
            value={id}
            checked={isChecked}
            data-taxonomy={taxonomy}
            onChange={handleChange}  
          /> {parse(name)+" ("+count+")"}  
          
        </label>  
      </li> 
    )
  }

export default CategorieItem
