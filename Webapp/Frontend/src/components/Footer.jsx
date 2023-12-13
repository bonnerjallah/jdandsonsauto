import { NavLink } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons"


import homestyle from "../styles/homestyle.module.css"

const Footer = () => {
    return (
        <>
            <div className={homestyle.aboutAndHowToReachUsContainer}>
                <div className={homestyle.aboutUsWrapper}>
                    <h3>ABOUT US</h3>
                    <p>With a wealth of local experience, we're committed to providing our community with top-tier, previously-owned cars, ensuring customer satisfaction is our top priority.</p>
                </div>
                <div className={homestyle.howToReachUsWrapper}>
                    <h3>HOW TO REACH US</h3>
                    <div>
                        <span><FontAwesomeIcon icon={faLocationDot} /></span>
                        <p>4005 Wetherburn Way Ste D-61 <br /> Peachtree Corners, GA 30092 </p>
                    </div>
                </div>
                <div className={homestyle.businessHoursSecondWrapper}>
                    <h3>BUSSINESS HOURS</h3>
                    <div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <p>Mon - Fri:</p>
                            <p>Sat:</p>
                            <p>Sun:</p>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <p>10:00 AM - 06:00 PM</p>
                            <p>10:10 AM - 5:00 PM</p>
                            <p>By Appointment Only</p>
                        </div>
                    </div> 
                </div>
                <div className={homestyle.contactUs}>
                    <h3>CONTACT US</h3>
                    <div>
                        <span><FontAwesomeIcon icon={faPhone} /></span>
                        <p>470-552-2433</p>
                    </div>
                </div>
            </div>
            <div className={homestyle.footerWrapper}>
                <div className={homestyle.footerLinksWrapper}>
                    <ul>
                        <NavLink to='/'><li>HOME</li></NavLink>
                        <NavLink to='/InventoryPage'><li>PRE OWNED VEHICLES</li></NavLink>
                        <NavLink to='/ContactUs'><li>CONTACT US</li></NavLink>
                        <NavLink to='/AboutUs'><li>ABOUT US</li></NavLink>
                        <NavLink to='/PrivacyPolicy'><li>PRIVACY POLICY</li></NavLink>
                    </ul>
                </div>
                <div className={homestyle.copyrigtWrapper}>
                    <p>&copy; 2024 JD & SONS AUTO BROKERS</p>
                    <p>Developed by: BAJ-TECH SOLUTIONS</p>
                </div>
                
            </div>
        </>
    )
}

export default Footer