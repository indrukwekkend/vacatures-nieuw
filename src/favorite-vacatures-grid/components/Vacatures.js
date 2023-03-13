import React, {useEffect} from "react";
import { useFavStore } from "../../_Store/vacatureStore";
import VacatureItem from '../../_Components/VacatureItem';
import classnames from 'classnames';

const Vacatures = (props) => {

  //state
  const favorites = useFavStore((state) => state.favorites)
  //alle vacatures:
  // de vacatures staan in localstorage, Die moet vervangen worden door een store die de data ophaalt uit de API
  // Of hier direct een axios call maken, op basis van de favorieten.

  const {vacatures, getVacatures} = useFavStore((state) => ({
    vacatures: state.vacatures,
    getVacatures: state.getVacatures
  }))

  const loading = useFavStore((state) => state.loading);
  const hasErrors = useFavStore((state) => state.hasErrors);
  const empty = useFavStore((state) => state.hasErrors);

  useEffect(() => {
    getVacatures();
  }, []) 
  
  //props
  const { text, postLayout, columns } = props;

  //return
  if (loading) {
    return <div class="spinner-holder"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>;
  }
  if (hasErrors) {
    return <p>cannot read data</p>;
  }
  if (vacatures == null || vacatures.length === 0 || vacatures == undefined) {
    return <p>Je hebt nog geen vacatures opgeslagen</p>;
  }

  //Geen error of loading, dus data is geladen
  return (
    
    <>
      <ul className={
          classnames(
            'vacatures-grid',
            {
              'vacatures-grid--list': postLayout === 'list',
              'vacatures-grid--grid': postLayout === 'grid',
            },
            "columns-"+columns
          )
      }>
        {vacatures.map(vacature => (
          <VacatureItem  
            { ...props } 
            key={vacature.id} 
            vacature={vacature}
          />
        ))}
      </ul>
    </>
  );
};

export default Vacatures;