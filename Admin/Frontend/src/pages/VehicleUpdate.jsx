import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import vehicleupdatestyle from '../style/vehicleupdatestyle.module.css';
import Sidebar from "../components/Sidebar";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Image Slider Component
const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const previousImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className={vehicleupdatestyle.imageWrapper}>
            <button onClick={previousImage} disabled={currentIndex === 0}>Previous</button>
            <img src={images[currentIndex]} alt={`Image ${currentIndex}`} />
            <button onClick={nextImage} disabled={currentIndex === images.length - 1}>Next</button>
        </div>
    );
};

const VehicleUpdate = () => {
    const { _id } = useParams();
    const navigate = useNavigate();

    const [selectedCarData, SetSelectedCarData] = useState({
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
        carimages: []
    });
    const [carDataImage, setCarDataImage] = useState([]);


    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/getSelectedCarData/${_id}`);
                if (response.status === 200) {
                    SetSelectedCarData({
                        carname: response.data.carname || '',
                        caryear: response.data.caryear || '',
                        condi: response.data.condi || '',
                        doors: response.data.doors || '',
                        drivetrain: response.data.drivetrain || '',
                        engine: response.data.engine || '',
                        extcolor: response.data.extcolor || '',
                        fueltype: response.data.fueltype || '',
                        intecolor: response.data.intecolor || '',
                        miles: response.data.miles || '',
                        priceamount: response.data.priceamount || '',
                        stocknum: response.data.stocknum || '',
                        transmiss: response.data.transmiss || '',
                        trim: response.data.trim || '',
                        vinnum: response.data.vinnum || '',
                        carimages: response.data.carimage || []
                    });
                    

                    if (response.data.carimages && response.data.carimages.length > 0) {
                        const carImages = response.data.carimages;
                        const carImagesArray = carImages.map((image) => `${backendUrl}/carimages/${image}`);
                        setCarDataImage(carImagesArray);
                    }
    
                }
            } catch (error) {
                console.log("Error fetching car data", error);
            }
        };

        fetchCarData();
    }, [_id]);




    const handleImageChange = (e) => {
        const files = e.target.files;
        setCarDataImage(files);  
    };
    

    const handleUpdatedInput = (e) => {
        const { name, value } = e.target;
        setCarData(prevData => ({ ...prevData, [name]: value }));
    };

   
    const handleSubmitEditedInput = async (e) => {
        e.preventDefault();
    
        const userConfirmed = window.confirm("Are you sure you want to update this record?");
        if (!userConfirmed) return;
    
        if (!_id) {
            console.log("No _id found");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('_id', _id);
    
            // Append car data fields
            Object.entries(selectedCarData).forEach(([key, value]) => {
                formData.append(key, value);
            });
    
            // Append the selected images as actual files
            for (let i = 0; i < carDataImage.length; i++) {
                formData.append('editCarImages', carDataImage[i]); // Append directly as File object
            }
    
            const response = await axios.put(`${backendUrl}/updatedescription`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            if (response.status === 200) {
                console.log("Update was successful");
                navigate('/InventoryManagement');
            } else {
                console.log("Error updating car description", response.data.message);
            }
        } catch (error) {
            console.log("Error submitting edited data", error);
        }
    };
    

    const handleDelete = async (e) => {
        e.preventDefault();

        const userConfirmed = window.confirm("Are you sure you want to delete this record?");
        if (!userConfirmed) return;

        try {
            const response = await axios.delete(`${backendUrl}/deletecar/${_id}`, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200) {
                console.log("Deleted car data successfully");
                
                navigate('/InventoryManagement');
            } else {
                console.log("Error deleting car data", response.data.message);
            }
        } catch (error) {
            console.log("Error deleting data", error);
        }
    };



    return (
        <div className={vehicleupdatestyle.container}>
            <div>
                <Sidebar />
            </div>
            <div className={vehicleupdatestyle.vehicleupdateMainWrapper}>
                <div className={vehicleupdatestyle.header}>
                    <h1>Vehicle Update</h1>
                </div>
                <div className={vehicleupdatestyle.imageSliderWrapper}>
                    {carDataImage.length > 0 && <ImageSlider images={carDataImage} />}
                </div>
                <div className={vehicleupdatestyle.updateformwrapper}>
                    {Object.keys(selectedCarData).length > 0 ? (
                        <form onSubmit={handleSubmitEditedInput} encType="multipart/form-data" method="POST">
                            {Object.keys(selectedCarData).map((key) => (
                                key !== 'carimages' && (
                                    <label htmlFor={key} key={key}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                                        <input 
                                            type="text" 
                                            name={key} 
                                            id={key} 
                                            value={selectedCarData[key]} 
                                            onChange={handleUpdatedInput} 
                                        />
                                    </label>
                                )
                            ))}
                            {/* Image upload handling */}
                            <label htmlFor="Images">
                                Upload Images:
                                <input 
                                    type="file" 
                                    name="editCarImages" 
                                    id="Images" 
                                    multiple 
                                    accept="image/*" 
                                    onChange={handleImageChange} 
                                />
                            </label>

                            <div className={vehicleupdatestyle.vehicleUpdateBttnWrapper}>
                                <button className={vehicleupdatestyle.vehUpdateBttnEdit} type="submit">
                                    Edit Vehicle
                                </button>
                                <button className={vehicleupdatestyle.vehUpdateBttnDelete} type="button" onClick={handleDelete}>
                                    Delete Vehicle
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VehicleUpdate;
