import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import axios from "axios"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator } from '@fortawesome/free-solid-svg-icons'

import AvailabilityModal from "../components/AvailabilityModal"
import Footer from "../components/Footer"
import ImageSlider from "../components/ImageSlider"

import viewdetailsstyle from '../styles/viewdetailsstyle.module.css'







const ViewDetails = () => {
    const {id} = useParams()

    const [car, setCar] = useState(' ')

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch car data
                const carResponse = await axios.get('http://localhost:3001/cardiscrip');
                const carinfo = carResponse.data;
    
                // Compare car data to the id in the params
                const filtercar = carinfo.filter((elem) => elem.id === parseInt(id));
    
                // Fetch images
                const imagesResponse = await axios.get('http://localhost:3001/carImages');
                const carImage = imagesResponse.data;
    
                // Fetch vehicle features (equip)
                const equipWithResponse = await axios.get('http://localhost:3001/equip');
                const vehicleFeatures = equipWithResponse.data;
    
                // Combine car data with corresponding image
                const combinedData = filtercar.map((carElem) => {
                    const imagesForCar = carImage.filter((imageElem) => imageElem.car_id === carElem.id);
                    carElem.images = imagesForCar;
    
                    // Find vehicle features for the car
                    const featuresForCar = vehicleFeatures.filter((featureElem) => featureElem.car_id === carElem.id);
                    carElem.vehicleFeatures = featuresForCar;
    
                    return carElem;
                });
    
                setCar(combinedData);
            } catch (error) {
                console.log('Error fetching data', error);
            }
        };
    
        fetchData();
    }, [id]);
    

    console.log("car", car)

    //Image slider urls
    const carImagesUrls = car && car[0] && car[0].images
    ? car[0].images
        .filter((elem) => elem.image_url)
        .map((filtercarelem) => `http://localhost:3001/carImages/${filtercarelem.image_url}`)
    : [];

    //Modal logic
    const [openAvalModal, setOpenAvalModal] = useState(false)
    const [carData, setCarData] = useState()

    const handleAvailabilityModal = (car) => {
        setOpenAvalModal(true)
        setCarData(car)
    }

    return (
        <>
            <div>
                <NavLink to="/InventoryPage">
                    <h4 style={{color: '#ec712e', margin: "1rem"}}>Back to listing</h4>
                </NavLink>
            </div>
            {car && car.length === 1 && (
                <div className={viewdetailsstyle.mainContainer}>
                    <div className={viewdetailsstyle.headerContainer}>
                        <div className={viewdetailsstyle.vehicleYearMakeAndModalWrapper}>
                            <p>{car[0].caryear}</p>
                            <p>{car[0].carname}</p>
                        </div>
                        <div className={viewdetailsstyle.vehiclePriceWrapper}>
                            <p>$ {parseInt(car[0].priceamount).toLocaleString("en-us", {minimumFractionDigits:2, maximumFractionDigits:2})}</p>
                        </div>
                    </div>


                        <div className={viewdetailsstyle.discripImageAndCalContainer}>
                                    <div className={viewdetailsstyle.dispriptionWrapper}>
                                        <p>Year: <span>{car[0].caryear}</span></p>
                                        <p>Make: <span>{car[0]?.carname?.split(' ')[0] || ' '}</span></p>
                                        <p>Modal: <span>{car[0]?.carname?.split(' ')[1] || ' '}</span></p>
                                        <p>Trim: <span>{car[0].trim}</span></p>
                                        <p>Drivetrain: <span>{car[0].drivetrain}</span></p>
                                        <p>Transmission: <span>{car[0].transmiss}</span></p>
                                        <p>Engine: <span>{car[0].engine}</span></p>
                                        <p>Mileage: <span>{parseInt(car[0]?.miles).toLocaleString()}</span></p>
                                        <p>Doors: <span>{car[0].doors}</span></p>
                                        <p>Exterior Color: <span>{car[0].extcolor}</span></p>
                                        <p>Interior Color: <span>{car[0].intecolor}</span></p>
                                        <p>VIN: <span>{car[0].vinnum}</span></p>
                                        <p>Stock No: <span>{car[0].stocknum }</span></p>
                                    </div>
                                    <div className={viewdetailsstyle.imageWrapper}>
                                        
                                        <div className={viewdetailsstyle.largerImageWrapper}>
                                            <ImageSlider carImagesUrls={carImagesUrls} />
                                        </div>
                                    </div>
                                
                            
                            <div className={viewdetailsstyle.calWrapper}>
                                <form action="">
                                    <h2 style={{backgroundColor: "#ec712e", padding: '.5rem'}}>Payment Calculator</h2>
                                    <hr />

                                    <h4>Vehicle Price</h4>
                                    <div className={viewdetailsstyle.inputWrapper}>
                                        <label htmlFor="vehiclePrice">$ </label><input type="text" name="vehiprice" value={parseFloat(car[0].priceamount).toLocaleString("en-us", {minimumFractionDigits: 2, maximumFractionDigits: 2})} id="vehiclePrice" />
                                    </div>

                                    <h4>Down Payment</h4>
                                    <div className={viewdetailsstyle.inputWrapper}>
                                        <label htmlFor="downpaymnt">$ </label><input type="number" name='vehidownpayment' id='downpaymnt' />
                                    </div>

                                    <div>
                                        <h4>Term</h4>
                                        <label htmlFor="term"></label> <input type="number" name="paymntterm" id="term" />
                                    </div>
                                    

                                    <h4>APR</h4>
                                    <div className={viewdetailsstyle.inputWrapper}>
                                        <input type="number" name="aprnum" id="apr" /><label htmlFor="apr">%</label>
                                    </div>

                                    <button> <FontAwesomeIcon icon={faCalculator} /> CALCULATE PAYMENT</button>
                                </form>
                            </div>
                        </div>

                        {openAvalModal && ( <AvailabilityModal car={car} closeAvilModal={setOpenAvalModal} />)}

                    <div className={viewdetailsstyle.buttonAndEquipContainer}>
                        <div className={viewdetailsstyle.buttonWrapper}>
                            <button onClick={() => handleAvailabilityModal(car)}>REQUEST A QUOTE</button>
                            <button onClick={() => handleAvailabilityModal(car)}>CONFIRM AVAILABILITY</button>
                            <button onClick={() => handleAvailabilityModal(car)}>SCHEDULE A TEST DRIVE</button>
                            <NavLink to={`/ApplyOnLine/${car[0].id}`}>
                                <button>APPLY ONLINE</button>
                            </NavLink>
                        </div>


                        <div className={viewdetailsstyle.equipAndSimilarContainer}>
                            <div className={viewdetailsstyle.equipmentListWrapper}>
                                <h2>Vehicle Equipment List</h2>
                                <div className={viewdetailsstyle.featuresList}>
                                    <ul >{car && car[0] && car[0].vehicleFeatures && car[0].vehicleFeatures.map((elem) => (
                                            <li key={elem.id}>{elem.features}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className={viewdetailsstyle.similarVehicleWrapper}>
                                <h3>Similar Vehicle</h3>
                                <div className={viewdetailsstyle.simiVehicleImageWrapper}>
                                    images goes here
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )} 

            <div>
                <Footer />
            </div>
        </>
    )
}

export default ViewDetails