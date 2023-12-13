import { useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faEnvelopeOpen, faLocationDot, faCircleQuestion  } from "@fortawesome/free-solid-svg-icons"

import MapComponent from "../components/Map"
import Footer from "../components/Footer"

import applyonline from "../styles/applyonlinestyle.module.css"

import contactusstyle from '../styles/contactusstyle.module.css'
import ScrollToTopOnMount from "../components/ScrollToTopOnMont"



const ContactUs = () => {

    const [contactMessage, setContactMessage] = useState({
        firstname: '',
        lastname: '',
        phonenumber: '',
        email: '',
        message: ''
    })

    const handleMessageInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
    
        setContactMessage((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3001/message", contactMessage, {
                headers: {"Content-Type": "application/json"}
            })

            if(response.status >= 200 && response.status < 300) {
                console.log("Message sent successfully")

                setContactMessage({
                    firstname: '',
                    lastname: '',
                    phonenumber: '',
                    email: '',
                    message: ''
                })
            } else {
                console.log('Error', response.data);
            }
            
        } catch (error) {
            console.log("Error sending customer message", error)

            if(error.response) {
                console.log("Error response:", error.response.data)
            }
        }
    }


    return (
        <div>
            <ScrollToTopOnMount />
            <div className={contactusstyle.header}>

            </div>
            <div className={contactusstyle.headerWrapper}>
                <h1>CONTACT US</h1>
            </div>

            <div className={contactusstyle.gridContainer}>
                <div className={contactusstyle.girdItemOne}>
                    <h2>JD AND SONS AUTO BROKERS</h2>


                    <p><FontAwesomeIcon icon={faEnvelopeOpen} /> jdandsonsautobroker@gmail.com</p>
                    <p><FontAwesomeIcon icon={faPhone}  /> 470-552-2433 </p>
                    <p><span style={{fontSize: '1.2rem'}}><FontAwesomeIcon icon={faLocationDot} /></span> 4005 Wetherburn Way Ste D-61 <br /> <span style={{marginLeft: '1rem'}}></span> Peachtree Corners, GA 30092</p>
                </div>
                <div className={contactusstyle.girdItemTwo}>
                    <h2 style={{marginBottom: '.6rem'}}>Bussiness Hours</h2>
                    <div className={contactusstyle.businessHoursWrapper}>
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

                    <h2>Send A Message</h2>
                    <div className={contactusstyle.messageContainer}>
                        <form  onSubmit={handleFormSubmit}>
                            <label htmlFor="sendmessagefirstname"></label>
                            <input type="text" name="firstname" id="sendmessagefirstname" placeholder="First Name" onChange={handleMessageInput} required />

                            <label htmlFor="sendmessagelastname"></label>
                            <input type="text" name="lastname" id="sendmessagelastname" placeholder="Last Name" required onChange={handleMessageInput} />

                            <label htmlFor="sendmessageemail"></label>
                            <input type="text" name="email" id="sendmessageemail" placeholder="Email" required onChange={handleMessageInput} />

                            <label htmlFor="sendmessagephonenumber"></label>
                            <input type="number" name="phonenumber" id="sendmessagephonenumber" placeholder="Phone" onChange={handleMessageInput} />

                            <label htmlFor="sendmessagemessage"></label>
                            <textarea name="message" id="sendmessagemessage" cols="30" rows="10" placeholder="Message" onChange={handleMessageInput}></textarea>

                            <p>By clicking "SUBMIT", I consent to be contacted by the dealer at any telephone number or Email I provide, including, without limitation, communications sent via text message to my cell phone or communications sent using an autodialer or prerecorded message. This acknowledgment constitutes my written consent to receive such communications. I have read and agree to the Privacy Policy of this dealer.</p>

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
                <div className={contactusstyle.girdItemThree}>
                    <MapComponent  />

                </div>
            </div>

            <div className={applyonline.callUsWrapper}>
                <div className={applyonline.callUsIconWrapper}>
                    <FontAwesomeIcon icon={faCircleQuestion} /> <p>Have Questions? Call Today!</p>
                </div>
                <div className={applyonline.callUsPhoneNumberWrapper}>
                    <FontAwesomeIcon icon={faPhone} /> <p>470-552-2433</p>
                </div>
            </div>
            <div>
                <Footer />
            </div>

        </div>
    )
}

export default ContactUs