import React from "react";
import ContentLoader from "react-content-loader";

import "./Slider.scss";

import BtnSlider from "./BtnSlider";
import BtnBuy from "./BtnBuy";

import { AppContext } from "../../App";

export default function Slider({ loading = false }) {
  const { offers } = React.useContext(AppContext);

  const [slideIndex, setSlideIndex] = React.useState(1);

  const nextSlide = () => {
    slideIndex !== offers.length
      ? setSlideIndex(slideIndex + 1)
      : setSlideIndex(1);
  };

  const prevSlide = () => {
    slideIndex !== 1
      ? setSlideIndex(slideIndex - 1)
      : setSlideIndex(offers.length);
  };

  const buySneakers = (obj) => {
    console.log(obj);
  };
  return (
    <div className="container-slider">
      {loading ? (
        <ContentLoader
          speed={2}
          width={960}
          height={300}
          viewBox="0 0 960 300"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="20" ry="20" width="960" height="300" />
        </ContentLoader>
      ) : (
        offers.map((obj, index) => {
          return (
            <>
              <div
                key={index}
                className={
                  slideIndex === index + 1 ? "slide active-anim" : "slide"
                }
              >
                <img
                  src={
                    process.env.PUBLIC_URL +
                    `/img/slider/Imgs/img${index + 1}.jpg`
                  }
                  alt="Offer photo"
                />

                {/* <BtnBuy buy={obj => { buySneakers(obj) }} btnColor={obj.color} /> */}
              </div>

              <BtnSlider moveSlide={nextSlide} direction={"next"} />
              <BtnSlider moveSlide={prevSlide} direction={"prev"} />
            </>
          );
        })
      )}
    </div>
  );
}
