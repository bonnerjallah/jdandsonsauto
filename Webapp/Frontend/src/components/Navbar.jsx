import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLocationDot, faPhoneVolume, faMagnifyingGlass, faBars} from '@fortawesome/free-solid-svg-icons'


import navbarstyle from "../styles/navbarstyle.module.css"

import WebNavBarModal from "./WebNavBarModal"

const Navbar = () => {


    const [openWebNavbarModal, setOpenWebNavbarModal] = useState(false)

    const handleNaveModal = () => {
        setOpenWebNavbarModal(true)
    }

    return (
        <div className={navbarstyle.container}>
            <div to="/" className={navbarstyle.logoAndContactWrapper}>
                <div className={navbarstyle.logoWrapper}>
                    <NavLink to="/">
                        <img src="/JD&SONSLOGO2.png" alt="" width={90} style={{cursor: "pointer"}} />
                    </NavLink>
                </div>

                <div className={navbarstyle.addressAndContactContainer}>
                    <div className={navbarstyle.addressWrapper}>
                        <FontAwesomeIcon icon={faLocationDot} style={{fontSize: "2rem", color: '#ec712e'}} />
                        <NavLink to="/ContactUs">
                        <p>4005 Wetherburn Way Ste D-61 <br /> Peachtree Corners, GA 30092</p>
                        </NavLink>
                    </div>
                    <div className={navbarstyle.contactWrapper}>
                        <FontAwesomeIcon icon={faPhoneVolume} style={{fontSize: "2rem", color: "#ec712e"}} />
                        <p><span style={{color: "#ec712e"}}>Phone:</span> 470-552-2433 <br /> <span style={{color: "#ec712e", letterSpacing: "2.5px"}}> Cell:</span> 404-513-4255 <br /><span style={{color: "#ec712e"}}>Email:</span> jdandsonsautobroker@gmail.com</p>
                    </div>
                </div>
            </div>

            <div className={navbarstyle.linksWrapper}>
                <NavLink>
                    <FontAwesomeIcon icon={faBars} className={navbarstyle.faBars} onClick={() => {handleNaveModal()}}/>
                </NavLink>

                {openWebNavbarModal && <WebNavBarModal closeNavBarModal={setOpenWebNavbarModal} />}

                <ul className={navbarstyle.links}>
                    <NavLink to='/'><li>Home</li></NavLink>
                    <NavLink to="InventoryPage"><li>Inventory</li></NavLink>
                    <NavLink to="CarFinder"><li>Car Finder</li></NavLink>
                    <NavLink to="/ApplyOnLine/:"><li>Apply Online</li></NavLink>
                    <NavLink to="AboutUs"><li>About Us</li></NavLink>
                    <NavLink to="ContactUs"><li>Contact Us</li></NavLink>
                </ul>

                

                <NavLink to='CarFinder'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={navbarstyle.magnifyingGlass} />
                </NavLink>

            </div>

            <Outlet />

        </div>
    )
}

export default Navbar