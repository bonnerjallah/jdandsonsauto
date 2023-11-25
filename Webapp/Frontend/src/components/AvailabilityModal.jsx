
import { useEffect, useState } from "react"
import availabilitymodalstyle from "../styles/availabilitymodalstyle.module.css"
import axios from "axios"

const AvailabilityModal = ({ avaliData, closeAvilModal}) => {

    console.log("data", avaliData)

    const [modalVehicleImage, setModalVehicleImage] = useState(' ');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get('http://localhost:3001/carImages');
                if (res.status === 200) {
                    const filteredImage = avaliData.images.find((image, index) => index === 3);
                    if (filteredImage) {
                        setModalVehicleImage(filteredImage.image_url);
                    }
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [avaliData]); 


    return (
        <div className={availabilitymodalstyle.mainContainer}>
            <div className={availabilitymodalstyle.header}>
                <h4 style={{color: '#ec712e'}}>CONFIRM AVAILABILITY / REQUEST A QUOTE</h4>
                <p onClick={() => closeAvilModal(false)}>X</p>
            </div>
            <div className={availabilitymodalstyle.vehicleInfo}> 
                <h4 style={{color: '#ec712e'}}>INTERESTED VEHICLE</h4>
                <div className={availabilitymodalstyle.imageAndDiscriptionContainer}>
                    <div className={availabilitymodalstyle.imageWrapper}>
                        <img src={`http://localhost:3001/carImages/${modalVehicleImage}`} alt="Car Image"  width='100%' height='100%'/>
                    </div>
                    <div>
                        <div style={{display: 'flex', columnGap: '1rem', marginBottom: '.5rem'}}>
                            <h2>{avaliData.caryear}</h2>
                            <h2>{avaliData.carname}</h2>
                        </div>
                        <p style={{ marginBottom: '.5rem'}}>{avaliData.priceamount}</p>
                        <p style={{letterSpacing: '.2rem'}}>Stock# {avaliData.stocknum}</p>                 
                    </div>
                </div>
            </div>
            <div className={availabilitymodalstyle.formContainer}>
                <h4 style={{color: '#ec712e'}}>HOW CAN WE REACH YOU</h4>
                <form>
                    <fieldset className={availabilitymodalstyle.firstSection} >
                        <label htmlFor="firstname"></label>
                        <input type="text" name="firstName" id="firstname" placeholder="First Name" />
                        <label htmlFor="lastname"></label>
                        <input type="text" name="lastName" id="lastname" placeholder="Last Name" />
                        <label htmlFor="phonenumber"></label>
                        <input type="number" name="phoneNumber" id="phonenumber" placeholder="Phone Number" />
                    </fieldset>
                    <br />
                    <fieldset className={availabilitymodalstyle.secondSection}>
                        <label htmlFor="custemail"></label>
                        <input type="text" name="email" id="custemail" placeholder="Email" style={{width: '15rem', height: '2rem', padding: '.5rem'}}/>
                        <p>Contact Preference:</p>
                        <label htmlFor="byemail">Email: <input type="checkbox" name="byEmail" id="byemail" style={{cursor:'pointer'}}/> </label>
                        <label htmlFor="byphone"> Phone: <input type="checkbox" name="byPhone" id="byphone" style={{cursor:'pointer'}} /></label>
                        <label htmlFor="bytext"> Text SMS: <input type="checkbox" name="SMS" id="bytext" style={{cursor:'pointer'}} /></label>
                    </fieldset>
                    <br />
                    <textarea name="" id="" cols="30" rows="10" placeholder="Comments" style={{width: '100%', marginBottom: '.5rem'}}></textarea>
                    <p>By clicking "SUBMIT", I consent to be contacted by the dealer at any telephone number or Email I provide, including, without limitation, communications sent via text message to my cell phone or communications sent using an autodialer or prerecorded message. This acknowledgment constitutes my written consent to receive such communications. I have read and agree to the Privacy Policy of this dealer.</p>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AvailabilityModal