import React, {useEffect} from "react";
import { useFavStore, useTotalStore  } from "../../_Store/vacatureStore";
import VacatureItem from '../../_Components/VacatureItem';
import Slider from "react-slick";

const VacatureSlider = (props) => {

  //state
  const favorites = useFavStore((state) => state.favorites)
  //alle vacatures:
   //state
   const { vacatures, getSlides, loading, hasErrors} = useTotalStore((state) => ({
    vacatures: state.slides,
    loading: state.loading,
    getSlides: state.getSlides,
  }))
  
  //props
  const { text, postLayout, postsToShow, columns, slidesToScroll, scrollSpeed, autoScroll,  } = props;

  useEffect(() => {

    // if postToShow < colums, set postToShow = columns, anders gaat het fout met de slider
    if (postsToShow < columns) {
      postsToShow = columns;
    }
    getSlides(postsToShow);

  }, [])

  //return
  if (loading) {
    return <p>Loading</p>;
  }
  if (hasErrors) {
    return <p>cannot read data</p>;
  }

  // TODO: settings uit de props halen
  const settings = {
		dots: true,
    className: "center",
    centerMode: false,
    infinite: true,
		speed: scrollSpeed,
		slidesToShow: columns,
		slidesToScroll: slidesToScroll,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
	};

  //Geen error of loading, dus data is geladen
  return (
  
    <Slider {...settings}>
        {vacatures.map(vacature => (
          <VacatureItem  
            { ...props } 
            key={vacature.id} 
            vacature={vacature}
          />
        ))}
    </Slider>
  );
};

export default VacatureSlider;