import React from 'react'
import parse from 'html-react-parser';
import classnames from 'classnames';
import FavButton from "./FavButton";

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
          } = props;

    const { title, permalink, meta, werkvelden, niveau, ervaring, id } = vacature;
    const { functie, vakgebied, locatie, locatie2, uren, datum2, schaal, bedrag } = meta;


    // console.log("vacature", locatie2);
    // console.log("meta", meta);

    // TODO: Combinatie maken van displayThunbnail en hasThumbnail, zie edit

    return (
      <li className={
          classnames(
            'card',
            { 'has-thumbnail': displayThumbnail },
          )
        }
      >
        <div className="card-content">

           <FavButton id = {id} />

          <div className="card-content__post-title">
            <h3>
            { displayLink &&
              <a href={permalink}> {title} </a>
            } 
            {!displayLink && 
              {title}
            }
            </h3>
          </div>

          { displayPostContent &&
            <div className="card-content__post-excerpt">
              <p>{vacature.excerpt}</p>
            </div>
          }

          {displayMeta && (
            <div className="card-content__post-meta">
              {displayFunctie && (
                <span className="functie">
                  <AiOutlineFunction alt={meta.functie}/>
                  {meta.functie}
                  </span>
              )}

              {displayVakgebied && (
                <span className="vakgebied">
                  <IoIosBookmark alt="vakgebied"/>
                  {
                  werkvelden.map((werkveld, index) => {
                    return (
                      //comma seperated list
                      <span key={index}>
                        
                        {parse(werkveld)}</span>
                    )
                  }
                  )
                }</span>
              )}
              {displayNiveau && (
                <span className="niveau">
                  <GiGraduateCap alt="niveau"/>
                  {
                  niveau.map((niveau, index) => {
                    return (
                      //comma seperated list
                      <span key={index}>
                        
                        {parse(niveau)}
                        </span>
                    )
                  }
                  )
                }</span>
              )}

              {displayErvaring && (
                <span className="ervaring">
                  <GiBriefcase alt={'ervaring'}/>
                  { ervaring.map((ervaring, index) => {
                    return (
                      //comma seperated list
                      <span key={index}>
                        
                        {parse(ervaring)}</span>
                    )
                  }
                  )
                }</span>
              )}
              {displayLocatie && meta.locatie != '' && (
                <span className="locatie">
                  <MdOutlineLocationOn alt={'locatie'}/>
                  {meta.locatie}</span>
              )}
              {displayLocatie2 && locatie2 && locatie2 != '' && (
                <span className="locatie2">
                  <MdOutlineLocationCity alt={'gebouw'}/>
                  {meta.locatie2}</span>
              )}
              {displayUren && (
                <span className="uren">
                  <AiFillClockCircle alt={meta.uren}/>
                  {meta.uren}</span>
              )}
              {displaySchaal && schaal != '' && (
                <span className="schaal">
                  <BiEuro alt={meta.schaal}/>
                  {meta.schaal}</span>
              )}
              {displayBedrag && bedrag && bedrag != '' && (
                <span className="bedrag">
                  <BiEuro alt={meta.bedrag}/>
                  {meta.bedrag}</span>
              )}
              {displayDatum2 && datum2 && datum2 != '' && (
                <span className="datum2">Sluitingsdatum: {meta.datum2}</span>
              )}
            </div>
          )}
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

