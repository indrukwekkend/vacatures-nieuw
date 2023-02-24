import { AiOutlineFunction, AiOutlineLink, AiFillClockCircle, AiFillCalendar }  from 'react-icons/ai';
import { BiEuro } from 'react-icons/bi';
import parse from 'html-react-parser';
import classnames from 'classnames';


const VacaturesInfo = (props) => {

  const naam = props.item[0];
  const waarde = props.item[1];
  const selecties = props.selectie;
  const namen = props.namen;

  //Bepaal of dit item geplaatst moet worden op basis van de instellingen in de app.
  // dit zijn waarden in de API (metaVelden van de app)

  const plaatsen = Object.keys(selecties)
  .filter((key) => key === naam)
  .reduce((obj, key) => {
      // Als je het ooit als object terug wil geven, dan moet je dit doen:
      // return Object.assign(obj, {
      //   [key]: selecties[key]
      // });
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

  const classNames = classnames( 'item', naam );

  //Als aan alle voorwaarden is voldaan dan wordt het item geplaatst:
  return (
   <dl className={classNames}>
      
      <dt className="item__title">

        { naam === 'functie' &&
          <AiOutlineFunction alt={titel}/>
        }
        { naam === 'uren' &&
          <AiFillClockCircle alt={titel}/>
        }
        { naam === 'contract' &&
          <GiBriefcase alt={titel}/>
        }
        { naam === 'bedrag' &&
          <BiEuro alt={titel}/>
        }
        { naam === 'datum1' &&
          <AiFillCalendar alt={titel}/>
        }
        { naam === 'aanstelling' &&
          <AiOutlineLink alt={titel}/>
        }
        {/* Dit is de sluitingsdatum */}
        { naam === 'datum2' &&
          <>{parse(titel)}:</>
        }

      </dt>
      <dd className="item__value">{parse(waarde)}
        { naam === 'uren' &&
          ' uur'
        }
      </dd>
   </dl>
  )
}

export default VacaturesInfo;