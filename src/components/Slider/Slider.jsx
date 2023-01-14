import React from 'react'
import './Slider.scss'
import BtnSlider from './BtnSlider'
import BtnBuy from './BtnBuy'

import dataSlider from './dataslider'

export default function Slider() {

    const [slideIndex, setSlideIndex] = React.useState(1);

    const nextSlide = () => {
        slideIndex !== dataSlider.length ? setSlideIndex(slideIndex + 1) : setSlideIndex(1)
    }

    const prevSlide = () => {
        slideIndex !== 1 ? setSlideIndex(slideIndex - 1) : setSlideIndex(dataSlider.length)
    }

    const buySneakers = (obj) => {
        console.log(obj)
    }
  return (
    <div className='container-slider'>
        {dataSlider.map((obj, index) => {
            
            return (
                <>
                <div 
                key={obj.id}
                className={slideIndex === index + 1 ? "slide active-anim" : "slide"}>
                    <img src={process.env.PUBLIC_URL + `/img/slider/Imgs/img${index + 1}.jpg`} alt="Offer photo" />
                
                    <BtnBuy buy={obj => {buySneakers(obj)}} btnColor={obj.color} />
                </div>
                
                </>
            )
        })}
        <BtnSlider moveSlide={nextSlide} direction={"next"} />
        <BtnSlider moveSlide={prevSlide} direction={"prev"}/>
        
    </div>
  )
}
