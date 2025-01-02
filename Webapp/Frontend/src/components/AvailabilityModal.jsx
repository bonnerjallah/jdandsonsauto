
import { useEffect, useState } from "react"
import availabilitymodalstyle from "../styles/availabilitymodalstyle.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const backendUrl = import.meta.env.VITE_BACKEND_URL



const AvailabilityModal = ({ avaliData, closeAvilModal, carData}) => {

    const navigate = useNavigate()

    //handling form
    const [quoteAndAvail, setQuoteAndAvail] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        availability_email: '',
        availability_message: '',
        carData_id: (avaliData && avaliData._id) || (carData && carData.length > 0 && carData[0]._id) || null,
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

 
    //Handle error message to display to user
    const [errorMessage, setErrorMessage] = useState('')
    

    const handleFormSubmit = async (e) => {
        e.preventDefault();


        setQuoteAndAvail({
            first_name: "",
            last_name: "",
            phone_number: "",
            availability_email: "",
            availability_message: "",
            carData_id: "",
        });

        setTimeout(() => {
            navigate('/');
        }, 1000);
        

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
                        <img src={`${backendUrl}/carimages/${avaliData?.carimages?.[0] || carData?.carimages?.[0]}`} alt="CarData Image"  width='100%' height='100%'/>
                    </div>
                    <div>
                        <div style={{display: 'flex', columnGap: '1rem', marginBottom: '.5rem'}}>
                        <h2>{avaliData && avaliData.caryear ? avaliData.caryear : (carData && carData.caryear)}</h2>
                        <h2>{avaliData && avaliData.carname ? avaliData.carname : (carData && carData.carname)}</h2>

                        </div>
                        <p style={{ marginBottom: '.5rem'}}>{avaliData && avaliData.priceamount ? avaliData.priceamount : (carData && carData.priceamount)}</p>
                        <p style={{letterSpacing: '.2rem'}}>Stock# {avaliData && avaliData.stocknum ? avaliData.stocknum : (carData && carData.stocknum)}</p>                 
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