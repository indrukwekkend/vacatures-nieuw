import React, {useEffect} from "react";
import ListItem from './ListItem';
import CatItem from './CatItem';
import { useSingleStore } from "../../_Store/vacatureStore";
import FavButton from "../../_Components/FavButton";
import ShareButton from "../../_Components/ShareButtons";

// TODO:
// 1. ophalen van de waarden van de ingestelde categorieen en die hier ook tonen

const VacaturesInfo = (props) => {
  const { id } = props;
  //state
  const {post, getPost, loading, metaVelden, getMetaVelden} = useSingleStore((state) => ({
    post: state.post,
    loading: state.loading,
    getPost: state.getPost,
    metaVelden: state.metaVelden,
    getMetaVelden: state.getMetaVelden
  }))

  useEffect(() => {
    // console.log('useEffect');
    // De metaVelden zijn de velden en veldnamen die getoond moeten worden;
    // de post geeft de waarden die hiervoor zijn ingevuld (door de redacteur of de API)
    // 
    // maar de volgorde is hier belangrijk, omdat de "loading" state anders niet goed werkt
    // De metavelden zijn dan nog niet geladen en dan krijg je een leeg resultaat terug. 
    getMetaVelden();
    getPost(id);

  }, []) 

  //return
  if (loading) {
    return <p>Loading</p>;
  }

  // if (hasErrors) {
  //   return <p>cannot read data</p>;
  // }

  //how to convert an object to an array
  //https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-in-javascript
 var meta = post.meta;
 var result = Object.keys(meta).map((key) => [(key), meta[key]]);

const sluitdatum = result[5];

  // console.log(getMetaVelden);
  // console.log(metaVelden);
 const velden = JSON.parse(metaVelden);
 const namen = velden.namen;
 const selectie = velden.selectie;

  return (
    <>
      <div className="button-wrapper">
        <FavButton id = {id} />
        <ShareButton />
      </div>
      <div className="data-wrapper">
        <h3>In het kort</h3>
        <CatItem
          naam = 'vakgebied'
          waarde = {post.werkvelden}
          namen = {namen}
          selectie = {selectie}
        />
        { result.map(item => (
          // filter de sluitdatum uit de lijst
          item[0] != 'datum2' &&
          <ListItem 
            item = {item}
            namen = {namen}
            selectie = {selectie}
          />

        ))}
        <CatItem
          naam = 'ervaring'
          waarde = {post.ervaring}
          namen = {namen}
          selectie = {selectie}
        />
        <CatItem
          naam = 'niveau'
          waarde = {post.niveau}
          namen = {namen}
          selectie = {selectie}
        />
      </div>
      {/* Hier de knop naar het formulier: */}
      <div class="wp-block-button is-style-cta solliciteer">
        <a class="wp-block-button__link wp-element-button" href="#form-holder">Solliciteer</a>
      </div>
      {/* Sluitingsdatum onderaan het blok */}
      <ListItem 
            item = {sluitdatum}
            namen = {namen}
            selectie = {selectie}
      />
    </>
  );
}

export default VacaturesInfo;