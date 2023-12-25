import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"


import MapComponent from "../components/Map"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleLeft, faArrowCircleRight, faCar, faLocationDot, faHandshakeAngle, faUserTie, faPhone } from "@fortawesome/free-solid-svg-icons"

import Footer from "../components/Footer"
import ScrollToTopOnMount from "../components/ScrollToTopOnMont"

import homestyle from "../styles/homestyle.module.css"



import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img5.jpg'
import img6 from '../assets/img6.jpg'


const Images = [img1, img2, img3, img4, img5, img6]


//Image slider
const ImageSlider = ({imageUrls}) => {
    const [currentIndex, setCurrentIndex] = useState(0)


    const showPrevImage = () => {
        setCurrentIndex(index => {
            if(index === 0) return imageUrls.length - 1
            return index - 1
        })
    }

    const showNextImage = () => {
        setCurrentIndex( index => {
            if(index === imageUrls.length - 1 ) return 0
            return index + 1
        })
    }

    //Function to automatically advance the slider
    const autoAdvanceSlider = () => {
        showNextImage()
    }

    useEffect(() => {
        // Set an interval to auto-advance the slider every 10 seconds
        const intervalId = setInterval(autoAdvanceSlider, 10000);

        // Clear the interval when the component unmounts
        return () => {
            clearInterval(intervalId)
        }
    }, [])


    return (
        <div style={{ width: "100%", height: "500px", position: "relative" }}>
            <div style={{width: "100%", height: "100%", display: "flex", overflow: 'hidden'}}>
                {imageUrls.map((url, index) => (
                    <img key={url} 
                    src={url} 
                    className={homestyle.imageSliderImages} 
                    style={{translate: `${-100 * currentIndex}%`}} />
                ))}
            </div>
            <button className={homestyle.sliderbttn} style={{ left: 0 }} onClick={showPrevImage}>
                <FontAwesomeIcon icon={faArrowCircleLeft} style={{ fontSize: "2rem" }} />
            </button>
            <button className={homestyle.sliderbttn} style={{ right: 0 }} onClick={showNextImage}>
                <FontAwesomeIcon icon={faArrowCircleRight} style={{ fontSize: "2rem" }} />
            </button>
        </div>
    );
    
}


const Home = () => {

    return (
        <div>

            <ScrollToTopOnMount />

            <div>
                <ImageSlider imageUrls = {Images} />
            </div>
            <div className={homestyle.welcome}>
                <h1>WELCOME TO JD & SONS AUTO BROKERS</h1>
            </div>
            <div className={homestyle.browserVisitContainer}>

                <div className={homestyle.browserWrapper}>
                    <div className={homestyle.faCarWraper}>
                        <FontAwesomeIcon icon={faCar} />
                    </div>
                    <NavLink to="InventoryPage"><h2>BROWSE INVENTORY</h2></NavLink>
                </div>
                <div className={homestyle.locationWrapper}>
                    <div className={homestyle.faLocationDotWrapper}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <NavLink to="ContactUs"><h2>VISIT DEALER</h2></NavLink>
                </div>
            </div>

            <div className={homestyle.vehicleUnder}>
                <p>Vehicles <span>UNDER $5k</span></p>
                <p>Vehicles <span>UNDER $10K</span></p>
                <p>Vehicles <span>UNDER $15K</span></p>
                <p>Vehicles <span>UNDER $20K</span></p>
            </div>

            <div className={homestyle.helpHealthyCarContainer}>
                <div className={homestyle.helpWrapper}>
                    <div>
                        <FontAwesomeIcon className={homestyle.fontIcons} icon={faHandshakeAngle} style={{ position: 'absolute', top: '30'}}  />
                    </div>
                    <p><span>WE ARE HERE TO HELP!</span> <br /><br /> JD and Sons Auto Broker, your top choice for premium, previously-owned vehicles in Atlanta! Our dedicated team is committed to delivering an outstanding car-buying experience. Leveraging our exclusive connections in the dealer community, we acquire a diverse selection of lease returns and new car trades at remarkable prices, which we gladly pass on to you. Additionally, we ensuring you can drive home your dream car, regardless of your financial situation. Explore our online inventory of used cars, set up a test drive, or make an offer now.</p>
                </div>
                <div className={homestyle.HealthyCarWrapper}>
                    <div>
                        <FontAwesomeIcon className={homestyle.fontIcons} icon={faUserTie} style={{ position: 'absolute', top: '30'}} />
                    </div>
                    <p><span>JD & SONS AUTO BROKER</span> <br /> <br />
                    Our Sales team are available to help you with all your automobile needs. Feel free to come by the store any time to meet us in person. We invite you to take a tour of our facility and enjoy a pressure free car buying experience.
                    </p>
                </div>
            </div>

            <div className={homestyle.mapAndLocationWrapper}>
                <div className={homestyle.businessHoursAndLocationContainer}>
                    <h2 style={{marginBottom: '.6rem'}}>Location</h2>
                    <div className={homestyle.localIconsWrapper}>
                        <p style={{fontSize: '1.2rem'}}><FontAwesomeIcon icon={faPhone} /> 470-552-2433</p>
                        <p><span style={{fontSize: '1.2rem'}}><FontAwesomeIcon icon={faLocationDot} /></span> 4005 Wetherburn Way Ste D-61 <br /> <span style={{marginLeft: '1rem'}}></span> Peachtree Corners, GA 30092</p>
                    </div>

                    <div className={homestyle.businessHoursContainer}>
                        <h2 style={{marginBottom: '.6rem'}}>Bussiness Hours</h2>
                        <div className={homestyle.businessHoursWrapper}>
                            <div style={{fontWeight: 'bold'}}>
                                <div>Monday</div>
                                <div>Tuesday</div>
                                <div>Wednesday</div>
                                <div>Thursday</div>
                                <div>Friday</div>
                                <div>Saturday</div>
                                <div>Sunday</div>
                            </div>
                            <div >
                                <div>10:00 AM - 06:00 PM</div>
                                <div>10:00 AM - 06:00 PM</div>
                                <div>10:00 AM - 06:00 PM</div>
                                <div>10:00 AM - 06:00 PM</div>
                                <div>10:00 AM - 06:00 PM</div>
                                <div>10:00 AM - 05:00 PM</div>
                                <div>By Appointment Only</div>
                            </div>
                        </div>
                    </div>
                </div>
                <MapComponent />
            </div>

            <div>
                <Footer />
            </div>
            
        </div>
    )
}

export default Home