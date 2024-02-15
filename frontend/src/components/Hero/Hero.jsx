import React, { useState } from 'react'
import "./Hero.css";

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 1 ? prevIndex - 1 : 5));
      };
    
      const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex < 5 ? prevIndex + 1 : 1));
      };

      const goToLink = (event) => {
          if(currentIndex == 2){
            window.location.replace("/men");
          } else if(currentIndex == 5){
            window.location.replace("/kid");
          } else {
            window.location.replace("/women");
          }
      }

  return (
    <div className='slider-container'>
        <div className='gallery'>
            <div className="gallery-container">
                <img className={`gallery-item gallery-item-1 ${currentIndex === 1 ? 'gallery-item-selected' : ''}`} src={require(`../Assets/Slider/${currentIndex}.png`)} data-index="1"/>
                <img className={`gallery-item gallery-item-2 ${currentIndex === 2 ? 'gallery-item-selected' : ''}`} src={require(`../Assets/Slider/${currentIndex}.png`)} data-index="2"/>
                <img onClick={goToLink} className={`gallery-item gallery-item-3 ${currentIndex === 3 ? 'gallery-item-selected' : ''}`} src={require(`../Assets/Slider/${currentIndex}.png`)} data-index="3"/>
                <img className={`gallery-item gallery-item-4 ${currentIndex === 4 ? 'gallery-item-selected' : ''}`} src={require(`../Assets/Slider/${currentIndex}.png`)} data-index="4"/>
                <img className={`gallery-item gallery-item-5 ${currentIndex === 5 ? 'gallery-item-selected' : ''}`} src={require(`../Assets/Slider/${currentIndex}.png`)} data-index="5"/>
            </div>
            <div className="gallery-controls">
                <button className="gallery-controls-previous" onClick={handlePrevClick}></button>
                <button className="gallery-controls-next" onClick={handleNextClick}></button>
            </div>
        </div>
    </div>
  )
}

export default Hero
