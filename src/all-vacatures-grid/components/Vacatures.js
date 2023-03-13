import React from "react";
import { useFavStore, useStore  } from "../../_Store/vacatureStore";
import VacatureItem from '../../_Components/VacatureItem';
import classnames from 'classnames';

const Vacatures = (props) => {

  //state
  const favorites = useFavStore((state) => state.favorites)
  //alle vacatures:
  const vacatures = useStore((state) => state.vacatures);
  const loading = useStore((state) => state.loading);
  const hasErrors = useStore((state) => state.hasErrors);
  
  //props
  const { text, postLayout, columns } = props;

  //return
  if (loading) {
    return <div class="spinner-holder"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>;
  }
  if (hasErrors) {
    return <p>cannot read data</p>;
  }

  //Geen error of loading, dus data is geladen
  return (
    
    <>
      <h2>{text} </h2>

      { vacatures.length === 1 &&
       <p>Er is {vacatures.length} vacature gevonden </p> 
      } { vacatures.length > 1 && 
        <p>Er zijn {vacatures.length} vacatures gevonden </p>
      } {
        vacatures.length === 0 &&
        <p>Er zijn geen vacatures gevonden, pas de filters aan. </p>
      }

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