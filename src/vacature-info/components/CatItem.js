import { GiGraduateCap, GiBriefcase }  from 'react-icons/gi';
import {IoIosBookmark} from 'react-icons/io';
import parse from 'html-react-parser';
import classnames from 'classnames';

const VacaturesInfo = (props) => {

  // console.dir(props);
  
  const naam = props.naam;
  const arr = props.waarde;

  //js make comma separated string from array
  //https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  const waarde = arr.map((item) => item).join(", ");

  const selecties = props.selectie;
  const namen = props.namen;

  //Bepaal of dit item geplaatst moet worden op basis van de instellingen in de app.
  // dit zijn waarden in de API (metaVelden van de app)

  const plaatsen = Object.keys(selecties)
  .filter((key) => key === naam)
  .reduce((obj, key) => {
      return selecties[key];
  }, {});

  // Als het een object is, dan is het niet geplaatst
  if (typeof plaatsen == "object" ) {
    return null;
  }
  // Als het een lege string is, dan wordt het niet geplaatst
  // Als het een plaasten False is, dan wordt het niet geplaatst
  if (waarde == null || waarde == undefined || waarde == "" || plaatsen == false) {
    return null;
  }

  //
  // Bepaal de titel van dit item, op basis van de instellingen in de app.
  //
  const titel = Object.keys(namen)
    .filter((key) => key === naam)
    .reduce((obj, key) => {
        return namen[key];
  }, {});

  //shorthand if statement let jaar = waarde > 1 ? "jaren" : "jaar";
  const jaar = naam === 'ervaring' ? "jaar" : "";
 
  const classNames = classnames( 'item', naam );

  //Als aan alle voorwaarden is voldaan dan wordt het item geplaatst:
  return (
   <dl className={classNames}>
      <dt className="item__title">

        { naam === 'niveau' &&
          <GiGraduateCap alt={titel}/>
        }
        { naam === 'vakgebied' &&
          <IoIosBookmark alt={titel}/>
        }
        { naam === 'ervaring' &&
          <GiBriefcase alt={titel}/>
        }

        </dt>
      <dd className="item__value">{parse(waarde)} {jaar}</dd>
   </dl>
  )
}

export default VacaturesInfo;