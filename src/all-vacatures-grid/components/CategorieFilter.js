import React, {useEffect} from 'react'
// import useStore from '../../_Store/vacatureStore'
import CategorieItem from './CategorieItem'
import { useStore, useCategorieStore } from '../../_Store/vacatureStore'


// import ItemDetails from './ItemDetails'

function CategorieFilter() {
  //Zustand States van de vacatures
  const {vacatures, getVacatures} = useStore((state) => ({
    vacatures: state.vacatures,
    getVacatures: state.getVacatures
  }))
  const {werkvelden, getWerkvelden} = useCategorieStore((state) => ({
    werkvelden: state.werkvelden,
    getWerkvelden: state.getWerkvelden
  }))
  const {ervaringen, getErvaringen} = useCategorieStore((state) => ({
    ervaringen: state.ervaringen,
    getErvaringen: state.getErvaringen
  }))
  const {niveaus, getNiveaus} = useCategorieStore((state) => ({
    niveaus: state.niveaus,
    getNiveaus: state.getNiveaus
  }))

  //UseEffect om de vacatures op te halen, in de categorieItem wordt de functie getVacatures opnieuw aangeroepen
  useEffect(() => {
    getVacatures();
    getWerkvelden();
    getErvaringen();
    getNiveaus();
  }, []) 

  return (
    <>
      <h2>Filter</h2>

      <h3>Werkveld</h3>
      {werkvelden.map(werkveld => (
        <CategorieItem
          key={werkveld.id} 
          item={werkveld}
        />
      ))}

      <h3>Ervaring</h3>
      {ervaringen.map(ervaring => (
         <CategorieItem
         key={ervaring.id} 
         item={ervaring}
       />
      ))}

      <h3>Niveau</h3>
      {niveaus.map(niveau => (
        // hier een component maken met een checkbox en een label
        <CategorieItem
          key={niveau.id} 
          item={niveau}
        />
      ))}

    </>
  )
}

export default CategorieFilter