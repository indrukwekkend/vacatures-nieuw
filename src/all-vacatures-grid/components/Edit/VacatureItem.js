import classnames from 'classnames';
import parse from 'html-react-parser';

import { AiOutlineFunction, AiOutlineLink, AiFillClockCircle, AiFillCalendar }  from 'react-icons/ai';
import { BiEuro } from 'react-icons/bi';
import { GiGraduateCap, GiBriefcase }  from 'react-icons/gi';
import {IoIosBookmark} from 'react-icons/io';
import {MdOutlineLocationCity, MdOutlineLocationOn} from 'react-icons/md';


const VacatureItem = (props) => {
 
    const { vacature, 
            displayMeta,
            displayFunctie,
            displayLocatie,
            displayLocatie2,
            displayUren,
            displayDatum2,
            displayNiveau,
            displayVakgebied,
            displayErvaring,
            displaySchaal,
            displayBedrag,
            excerptLength,
            displayLink,
            displayPostContentRadio,
            displayThumbnail,
            displayDatum1,
            displayPostContent,
            postLayout,
            displayPijltje,
            textLink,
            displayButtonContentRadio,
            categories,
            episodeURL,
            post,
          } = props;

          const titleTrimmed = post.title.rendered.trim();

    const { title, permalink, meta, werkvelden, niveau, ervaring, id } = post;
    // const { functie, vakgebied, locatie, locatie2, uren, datum2, schaal, bedrag } = meta;


    // TODO: Combinatie maken van displayThunbnail en hasThumbnail, zie edit

    return (
      <li className={
          classnames(
            'card',
            // { 'has-thumbnail': displayThumbnail },
          )
        }
      >
        <div className="card-content">
          <div className="card-content__post-title">
              { titleTrimmed ? (
                <h3>
                 {  parse( titleTrimmed ) }
                </h3>
              ) :
                __( '(no title)' )
              }
          </div>

          {/* { displayPostContent &&
            <div className="card-content__post-excerpt">
              <p>{vacature.excerpt}</p>
            </div>
          } */}

          {displayMeta &&
            <div className="card-content__post-meta">
              
              { displayFunctie &&
                <span className="card-content__post-meta-functie">
                   <AiOutlineFunction alt={meta.functie}/>
                  {meta.vacatures_functie} 
                </span>
              }
              {displayLocatie && (
                <span className="locatie">
                  <MdOutlineLocationOn alt={'locatie'}/>
                  {meta.locatie}</span>
              )}
              { displayLocatie2 &&
                <span className="card-content__post-meta-uren">
                  <MdOutlineLocationCity alt={'gebouw'}/>
                  {post.meta.vacatures_locatie2} 
                </span>
              }

              { displayUren &&
                <span className="card-content__post-meta-uren">
                  {post.meta.vacatures_uren} 
                </span>
              }

              { displayDatum1 &&
                <span className="card-content__post-meta-datum1">
                  {post.meta.vacatures_datum1} 
                </span>
              }

             

              { displaySchaal &&
                <span className="card-content__post-meta-schaal">
                  {post.meta.vacatures_schaal} 
                </span>
              }
              { displayBedrag &&
                <span className="card-content__post-meta-bedrag">
                  {post.meta.vacatures_bedrag} 
                </span>
              }

              {displayDatum2 && (
                <span className="datum2">Sluitingsdatum: {meta.datum2}</span>
              )}

            </div>
					}
        </div>
      
        <div className="footer">
          { displayPijltje &&
            <span className="footer__text cta">
              {textLink}
            </span>
          } 
        </div>

      </li>
    )
  }


export default VacatureItem

