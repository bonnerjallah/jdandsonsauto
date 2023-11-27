import React, { useState } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleLeft, faArrowCircleRight} from "@fortawesome/free-solid-svg-icons"

import homestyle from "../styles/homestyle.module.css"


const ImageSlider = ({carImagesUrls}) => {

    // console.log("car images url", carImagesUrls )


    const [currentIndex, setCurrentIndex] = useState(0)

    const showPrevImage = () => {
        setCurrentIndex(index => {
            if(index === 0) return carImagesUrls.length - 1
            return index - 1
        })
    }

    const showNextImage = () => {
        setCurrentIndex(index => {
            if(index === carImagesUrls.length - 1) return 0
            return index + 1
        })
    }


    return (

        <div style={{ width: "100%", height: "30rem", position: "relative" }}>
            <div style={{width: "100%", height: "100%", display: "flex", overflow: 'hidden'}}>
                {carImagesUrls.map((elemUrl, index) => (
                    <img key={index} src={elemUrl} 
                    className={homestyle.imageSliderImages}
                    style={{ transform: `translateX(${-100 * currentIndex}%)` }}
                    />
                ))}
            </div>
            <button className={homestyle.sliderbttn} style={{ left: 0 }} onClick={showPrevImage}>
                <FontAwesomeIcon icon={faArrowCircleLeft} style={{ fontSize: "2rem" }} />
            </button>
            <button className={homestyle.sliderbttn} style={{ right: 0 }} onClick={showNextImage}>
                <FontAwesomeIcon icon={faArrowCircleRight} style={{ fontSize: "2rem" }} />
            </button>

            <div className={homestyle.smallImagesWrapper}>
                {carImagesUrls.map((elemUrl, index) => (
                    <button key={index} onClick={() => setCurrentIndex(index)}>
                        <img
                        src={elemUrl}
                        alt={`Image ${index}`}
                        className={homestyle.smallImages}
                        />
                        {/* Other button content if needed */}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ImageSlider