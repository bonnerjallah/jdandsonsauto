
import { useEffect, useState } from "react"
import availabilitymodalstyle from "../styles/availabilitymodalstyle.module.css"
import axios from "axios"

const AvailabilityModal = ({ avaliData, closeAvilModal}) => {

    console.log("data", avaliData)

    //image fetch
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

    //handling form
    const [quoteAndAvail, setQuoteAndAvail] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        availability_email: '',
        availability_message: '',
        car_id: avaliData.id,
    })

    const [contactType, setContactType] = useState({
        byEmail: false,
        byPhone: false,
        SMS: false
    })

    const handleFormInput = (e, discription) => {
    
        const { type, name, value, checked } = e.target;
    
        if (type === "checkbox") {
            setContactType((prevData) => ({
                ...prevData,
                [name]: checked,
                [name + '_discription']: checked ? discription : '',
            }));
        } else {
            setQuoteAndAvail((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    console.log(quoteAndAvail)
    console.log(contactType)

    const [errorMessage, setErrorMessage] = useState('')
    

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                "http://localhost:3001/availabilityAndQuote",
                { ...quoteAndAvail, ...contactType }, // Combine quoteAndAvail and contactType into a single object
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
    
            if (response.status >= 200 && response.status < 300) {
                console.log("Message sent successfully");
    
                setQuoteAndAvail({
                    first_name: "",
                    last_name: "",
                    phone_number: "",
                    availability_email: "",
                    availability_message: "",
                    car_id: "",
                });
                
                setContactType({
                    byEmail: false,
                    byPhone: false,
                    SMS: false,
                });
            } else {
                console.log("Error sending message", response.data);
            }
        } catch (error) {    
            if (error.response) {
                setErrorMessage(error.response.data.error)
            }
        }
    };
    


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
                <form onSubmit={handleFormSubmit}>
                    <fieldset className={availabilitymodalstyle.firstSection} >
                        <label htmlFor="availfirstname"></label>
                        <input type="text" name="first_name" id="availfirstname" placeholder="First Name" onChange={handleFormInput} />

                        <label htmlFor="availlastname"></label>
                        <input type="text" name="last_name" id="availlastname" placeholder="Last Name" onChange={handleFormInput} />

                        <label htmlFor="availphonenumber"></label>
                        <input type="number" name="phone_number" id="availphonenumber" placeholder="Phone Number" onChange={handleFormInput}/>

                    </fieldset>
                    <br />
                    <fieldset className={availabilitymodalstyle.secondSection}>
                        <label htmlFor="availcustemail"></label>
                        <input type="text" name="availability_email" id="availcustemail" placeholder="Email" style={{width: '15rem', height: '2rem', padding: '.5rem'}} onChange={handleFormInput}/>

                        <p>Contact Preference:</p>
                        <label htmlFor="byemail">Email: <input type="checkbox" name="byEmail" id="byemail" checked={contactType.byEmail} onChange={(e) => handleFormInput(e, 'By Email')} style={{cursor:'pointer'}} /> </label>

                        <label htmlFor="byphone"> Phone: <input type="checkbox" name="byPhone" id="byphone" checked={contactType.byPhone} onChange={(e) => handleFormInput(e, 'By Phone')} style={{cursor:'pointer'}} /></label>

                        <label htmlFor="bytext"> Text SMS: <input type="checkbox" name="SMS" id="bytext" checked={contactType.SMS} onChange={(e) => handleFormInput(e, 'SMS Text')} style={{cursor:'pointer'}} /></label>
                    </fieldset>
                    <br />
                    <label htmlFor="availabilitymessagemessage"></label>
                    <textarea name="availability_message" id="availabilitymessagemessage" cols="30" rows="10" placeholder="Comments" onChange={handleFormInput} style={{width: '100%', marginBottom: '.5rem'}}></textarea>
                    <p>By clicking "SUBMIT", I consent to be contacted by the dealer at any telephone number or Email I provide, including, without limitation, communications sent via text message to my cell phone or communications sent using an autodialer or prerecorded message. This acknowledgment constitutes my written consent to receive such communications. I have read and agree to the Privacy Policy of this dealer.</p>

                    {errorMessage && <p className={availabilitymodalstyle.errorMessage}>{errorMessage}</p>}

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AvailabilityModal