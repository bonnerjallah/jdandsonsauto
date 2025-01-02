import { useState, useEffect } from "react"
import axios from "axios"
import { faChampagneGlasses } from "@fortawesome/free-solid-svg-icons";

import similarvehiclestyle from '../styles/similarvehiclestyle.module.css'

const backendUrl = import.meta.env.VITE_BACKEND_URL



const SimilarVehicle = ({car}) => {

    const [sameKindOfCar, setSameKindOfCar] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/getCarData`);
            const fetchedCar = response.data;

            if (fetchedCar && fetchedCar.length > 0 && car && car.length > 0) {
                const compareCars = fetchedCar.filter((elem) => 
                    elem.carname?.split?.(' ')[0] === car[0]?.carname?.split?.(' ')[0]
                );

                const formattedCars = compareCars.map((car) => ({
                    ...car,
                    formattedprice: parseFloat(car.priceamount).toLocaleString('en-us', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                    }),
                }));

                setSameKindOfCar(formattedCars);
            }
        } catch (error) {
            console.error("Error fetching car description from the database", error);
        }
    };

    if (car && car.length > 0) {
        fetchData();
    }
}, [car]);

    


    return (
        <div className={similarvehiclestyle.Container}>
            <div className={similarvehiclestyle.header}>
                <h3>Similar Vehicles</h3>
            </div>

            <div className={similarvehiclestyle.vehicleDataWrapper}>
            <div className={similarvehiclestyle.imageWrapperAndDetails}>
                {sameKindOfCar &&
                    sameKindOfCar.map((filteredCar, id) => (
                        <p key={id} className={similarvehiclestyle.vechileImageAndDetails}>
                            {filteredCar.carimages && filteredCar.carimages.length > 0 ? (
                                <img
                                    src={`${backendUrl}/carImages/${filteredCar.carimages[0]}`}
                                    alt="Car"
                                    width="80rem"
                                />
                            ) : (
                                <span>No Image Available</span>
                            )}
                            <span>
                                {filteredCar.caryear}
                                <br />
                                {filteredCar.carname}
                            </span>
                            <span>{filteredCar.formattedprice}</span>
                        </p>
                    ))}
            </div>

                
            </div>

            
        </div>
    )
}

export default SimilarVehicle