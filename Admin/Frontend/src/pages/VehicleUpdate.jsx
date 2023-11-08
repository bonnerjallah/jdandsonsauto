import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import vehicleupdatestyle from '../style/vehicleupdatestyle.module.css'
import Sidebar from "../components/Sidebar"


//Image Slider
const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const previousImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    return (
        <div className={vehicleupdatestyle.imageWrapper}>
            <button onClick={previousImage} disabled={currentIndex === 0}>Previous</button>
            <img src={`http://localhost:3001/carimages/${images[currentIndex].image_url}`} alt={`Image ${currentIndex}`} />
            <button onClick={nextImage} disabled={currentIndex === images.length - 1}>Next</button>
        </div>
    );
}



const VehicleUpdate = () => {
    const { id } = useParams();

    const navigate = useNavigate()

    const [carDataImage, setCarDataImage] = useState(null);

    const [carData, setCarData] = useState(null);

    useEffect(() => {
        const carInformation = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/cardiscrip/${id}`);
                if (response.status === 200) {
                    setCarData(response.data[0]);
                }

                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const imageParam = urlParams.get("images");

                if (imageParam) {
                    const parsedImages = JSON.parse(imageParam);
                    setCarDataImage(parsedImages);
                } else {
                    console.log("No image found in the URL parameter");
                }
            } catch (error) {
                console.log("Error fetching car data", error);
            }
        }

        carInformation();
    }, [id]);


    const handleUpdatedInput = (e) => {
        const {name, value} = e.target  
        setCarData((prevData) => ({...prevData, [name]: value,}))
    }

    const handleSubmitEditedInput = async (e, action) => {
        e.preventDefault()

        const userConfirmed = window.confirm("Are you sure you want to update this record")

        if(!userConfirmed) {
            return;
        }

        try {
            if(action === 'edit') {
                const response = await axios.put('http://localhost:3001/cardiscripupdate', carData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                if(response.status === 200) {
                    console.log("Update was successful")

                    setCarData({
                        carname: '',
                        caryear: '',
                        condi: '',
                        doors: '',
                        drivetrain: '',
                        engine: '',
                        extcolor: '',
                        fueltype: '',
                        intecolor: '',
                        miles: '',
                        priceamount: '',
                        stocknum: '',
                        transmiss: '',
                        trim: '',
                        vinnum: '',
                        id: '',
                    })

                    navigate('/InventoryManagement')

                } else {
                    console.log("Error updating car discription", response.data.message)
                }
            } else if (action === 'delete') {

                const requestData = {
                    id: carData.id,
                };

                console.log("data being sent to the server", requestData)

                const response = await axios.delete(`http://localhost:3001/deletecardata/${id}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {id: id}
                })

                if (response.status === 200) {
                    console.log("deleted car data successfully")

                    setCarData({
                        carname: '',
                        caryear: '',
                        condi: '',
                        doors: '',
                        drivetrain: '',
                        engine: '',
                        extcolor: '',
                        fueltype: '',
                        intecolor: '',
                        miles: '',
                        priceamount: '',
                        stocknum: '',
                        transmiss: '',
                        trim: '',
                        vinnum: '',
                        id: '',
                    })

                    navigate('/InventoryManagement')

                } else {
                    console.log("Error deleting car data", response.data.message)
                }
            }
            
        } catch (error) {
            console.log("Error submiting edited data", error) 
        }
    }


    return(
        <div className={vehicleupdatestyle.container}>
            <div>
                <Sidebar />
            </div>
            <div className={vehicleupdatestyle.vehicleupdateMainWrapper}>
                <div className={vehicleupdatestyle.header}>
                    <h1>Vehicle Update</h1>
                </div>
                <div className={vehicleupdatestyle.imageSliderWrapper}>
                    {carDataImage && <ImageSlider images={carDataImage} />}
                </div>

                
                <div className={vehicleupdatestyle.updateformwrapper}>
                    {carData && Object.keys(carData).length > 0 ? (
                        <form onSubmit={handleSubmitEditedInput}>
                            <label htmlFor="carName">
                                Car Name:
                                <input type="text" name="carname" id="carName" value={carData.carname} onChange={handleUpdatedInput} />
                            </label>
                            <label htmlFor="carYear">
                                Car Year:
                                <input type="text" name="caryear" id="carYear" value={carData.caryear}  onChange={handleUpdatedInput} />
                            </label>
                            <label htmlFor="condition">
                                Condition: 
                                <input type="text" name="condi" id="condition" value={carData.condi} onChange={handleUpdatedInput} />
                            </label>
                            <label htmlFor="doorsNumber">
                                Doors:
                                <input type="text" name="doors" id="doorsNumber" value={carData.doors} onChange={handleUpdatedInput} />
                            </label>
                            <label htmlFor="drive">
                                Drivetrain:
                                <input type="text" name="drivetrain" id="drive" value={carData.drivetrain} onChange={handleUpdatedInput} />
                            </label>
                            <label htmlFor="carEngine">
                                Engine: 
                                <input type="text" name="engine" id="carEngine" value={carData.engine} onChange={handleUpdatedInput} />
                            </label>
                            <br />
                            <label htmlFor="carExtColor">
                                Exterior Color:
                                <input type="text" name="extcolor" id="carExtColor" value={carData.extcolor} onChange={handleUpdatedInput} />
                            </label>
                            <label htmlFor="fuelType">
                                Fule Type:
                                <input type="text" name="fueltype" id="fuelType" value={carData.fueltype} onChange={handleUpdatedInput} />
                            </label>
                            <br />
                            <label htmlFor="inteColor">
                                Interior Color:
                                <input type="text" name="intecolor" id="inteColor" value={carData.intecolor} onChange={handleUpdatedInput} />
                            </label>
                            <label htmlFor="carMiles">
                                Miles:
                                <input type="text" name="miles" id="carMiles" value={carData.miles} onChange={handleUpdatedInput} />
                            </label>
                            <label htmlFor="carPriceAmount">
                                Price Amount:
                                <input type="text" name="priceamount" id="carPriceAmount" value={carData.priceamount} onChange={handleUpdatedInput} />
                            </label>
                            <label htmlFor="carStockNumber">
                                Stock Number:
                                <input type="text" name="stocknum" id="carStockNumber" value={carData.stocknum} onChange={handleUpdatedInput} />
                            </label>
                            <label htmlFor="carTransmiss">
                                Trasmission:
                                <input type="text" name="transmiss" id="carTransmiss" value={carData.transmiss} onChange={handleUpdatedInput} />
                            </label>
                            <label htmlFor="carTrim">
                                Trim:
                                <input type="text" name="trim" id="carTrim" value={carData.trim} onChange={handleUpdatedInput} />
                            </label>
                            <label htmlFor="carVinNum">
                                Vin Number:
                                <input type="text" name="vinnum" id="carVinNum" value={carData.vinnum} onChange={handleUpdatedInput} />
                            </label>
                            <div className={vehicleupdatestyle.vehicleUpdateBttnWrapper}>
                                <button className={vehicleupdatestyle.vehUpdateBttnEdit} onClick={(e)=> {handleSubmitEditedInput(e, 'edit')}} type="button">Edit Vehicle</button>
                                <button className={vehicleupdatestyle.vehUpdateBttnDelete} onClick={(e) => {handleSubmitEditedInput(e, 'delete')}} type="button">Delete Vehicle</button>
                            </div>

                        </form>
                    ) : (
                        <p>loading...</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VehicleUpdate