import { useState, useEffect } from "react"
import axios from "axios"
import { faChampagneGlasses } from "@fortawesome/free-solid-svg-icons";

import similarvehiclestyle from '../styles/similarvehiclestyle.module.css'



const SimilarVehicle = ({car}) => {

    const [sameKindOfCar, setSameKindOfCar] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://jdnsonsautobrokers.com/cardiscrip');
                const fetchedCar = response.data;
        
                let compareCars = [];
    
                if (fetchedCar && fetchedCar.length > 0 && car && car.length > 0) {
                    compareCars = fetchedCar.filter((elem) => {
                        // Add checks to ensure properties are defined
                        return (
                            elem.carname &&
                            elem.carname.split &&
                            car[0].carname &&
                            car[0].carname.split &&
                            elem.carname.split(' ')[0] === car[0].carname.split(' ')[0]
                        );
                    });
                }
    
                const imageResponse = await axios.get('http://jdnsonsautobrokers.com/carImages');
                const carImages = imageResponse.data;
    
                const combinedData = compareCars.map((compareCarsElem) => {
                    const imagesForCar = carImages.filter((imageElem) => imageElem.car_id === compareCarsElem.id);
                    compareCarsElem.images = imagesForCar;
                
                    // Use compareCarsElem.priceamount instead of compareCars.priceamount
                    compareCarsElem.formattedprice = parseFloat(compareCarsElem.priceamount).toLocaleString('en-us', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2
                    });
                
                    return compareCarsElem; // Return the modified elem
                });
                
                setSameKindOfCar(combinedData);
                
    
            } catch (error) {
                console.error("Error fetching car description from the database", error);
            }
        };
    
        // Only fetch data if car is defined
        if (car) {
            fetchData();
        }
    }, [car]);
    
    
    

    console.log("sameKindOfCars", sameKindOfCar)


    return (
        <div className={similarvehiclestyle.Container}>
            <div className={similarvehiclestyle.header}>
                <h3>Similar Vehicles</h3>
            </div>

            <div className={similarvehiclestyle.vehicleDataWrapper}>
                <div className={similarvehiclestyle.imageWrapperAndDetails}>
                    {sameKindOfCar &&
                        sameKindOfCar
                            .map((filteredCar, id) => (
                                <p key={id} className={similarvehiclestyle.vechileImageAndDetails} >
                                        <img src={`https://jdnsonsautobrokers.com/carImages/${filteredCar.images[3]?.image_url}`} width='80rem' />
                                        <span>
                                            {filteredCar.caryear}
                                            <br />
                                            {filteredCar.carname}
                                        </span>
                                        <span>
                                            {filteredCar.formattedprice}
                                        </span>
                                </p>
                                
                    ))}

                </div>
                
            </div>

            
        </div>
    )
}

export default SimilarVehicle