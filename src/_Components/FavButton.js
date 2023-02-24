import { useFavStore } from "../_Store/vacatureStore";
import { AiOutlineHeart, AiFillHeart }  from 'react-icons/ai';
import classnames from 'classnames';

const FavButton = (props) => {

  const { id } = props;

  const {favorites, toggleFavorites } = useFavStore((state) => ({
    favorites: state.favorites,
    toggleFavorites: state.toggleFavorites
  }))

  let buttonActive = favorites.includes(id) ? true : false;

     //handlechange voor de button
     const handleClick = () => {
      toggleFavorites(id);
      // getVacatures(-1);
      //verandering in de class van het huidige element (button)
      let button = document.getElementById("button-" + id);
      button.classList.toggle("button--heart-active");
    }

  const classNames = classnames( 
    "button", 
    "button--heart",
    buttonActive && 
      "button--heart-active"
   );

  return (
    <button
        className={classNames}
        id= {'button-'+ id }
        onClick= { handleClick }
        aria-label="Maak de vacature favoriet"
      >
        {/* <label for={'button-'+ id }>Button go outside the label</label> */}
      { buttonActive &&
        <AiFillHeart
        alt='Verwijder de vacature uit je favorieten'
        aria-label="Verwijder de vacature uit je favorieten"
        />
      } 
      { !buttonActive &&
        <AiOutlineHeart 
        alt='Maak de vacature favoriet'
        aria-label="Maak de vacature favoriet"
        />
      } 

    </button>
  );

};

export default FavButton;

