
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faEnvelopeOpen, faLocationDot, faCircleQuestion  } from "@fortawesome/free-solid-svg-icons"

import MapComponent from "../components/Map"
import Footer from "../components/Footer"

import applyonline from "../styles/applyonlinestyle.module.css"





import contactusstyle from '../styles/contactusstyle.module.css'

const ContactUs = () => {
    return (
        <div>
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
                        <form action="">
                            <label htmlFor="sendmessagefirstname"></label>
                            <input type="text" name="sendmsgfirstname" id="sendmessagefirstname" placeholder="First Name" required />

                            <label htmlFor="sendmessagelastname"></label>
                            <input type="text" name="sendmsglastname" id="sendmessagelastname" placeholder="Last Name" required />

                            <label htmlFor="sendmessageemail"></label>
                            <input type="text" name="sendmsgemail" id="sendmessageemail" placeholder="Email" required />

                            <label htmlFor="sendmessagephonenumber"></label>
                            <input type="number" name="sendmsgphonenumber" id="sendmessagephonenumber" placeholder="Phone" />

                            <label htmlFor="sendmessagemessage"></label>
                            <textarea name="sendmsg" id="sedmessagemessage" cols="30" rows="10" placeholder="Message"></textarea>

                            <p>By clicking "SUBMIT", I consent to be contacted by the dealer at any telephone number or Email I provide, including, without limitation, communications sent via text message to my cell phone or communications sent using an autodialer or prerecorded message. This acknowledgment constitutes my written consent to receive such communications. I have read and agree to the Privacy Policy of this dealer.</p>

                            <button>Submit</button>
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