import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

import NavbarModal from "./NavbarModal";

import navbarstyle from '../style/navbarstyle.module.css'
import { useState } from "react";


const Navbar = () => {

    const {loggedIn, logOut} = useAuth()

    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            const res = axios.post("http://localhost:3001/logout", {}, {
                withCredential: true
            })
        } catch (error) {
            console.log("Error loging out user", error)
        }

        logOut()
        
        navigate('/')

    }

    const [openNavbarModal, setOpenNavbarModal] = useState(false)

    const handleNaveModal = () => {
        setOpenNavbarModal(true)
    }

    return (
        <div className={navbarstyle.navBarMainContainer}>
            <div className={navbarstyle.navbarlogo}>
                <NavLink to='/'>
                    <img src="../../public/JD&SONSLOGO2.PNG" alt="" width={100} />
                </NavLink>
            </div>
            

            <ul className={navbarstyle.links}>
                <div>
                    <FontAwesomeIcon icon={faBars} className={navbarstyle.fabars} onClick={() => {handleNaveModal()}}/>
                </div>
                {openNavbarModal && <NavbarModal closeNavBarModal={setOpenNavbarModal} />}

                <NavLink to="Dashboard"><li>DASHBOARD</li></NavLink>
                <NavLink to="InventoryManagement"><li>INVENTORY</li></NavLink>
                <NavLink to="SalesTransactions"><li>SALES & TRANSACTIONS</li></NavLink>
                <NavLink to="CustomerManagement"><li>CUSTOMER MANAGEMENT</li></NavLink>
                <NavLink to="ServiceMaintenance"><li>SERVICE & MAINTENANCE</li></NavLink>
                
                <div className={navbarstyle.userWrapper}>
                    {!loggedIn ? (
                        <NavLink to='Login'>
                            <FontAwesomeIcon icon={faUser} className={navbarstyle.fauser} />
                            
                        </NavLink>
                    ) : (
                        <div>
                            <FontAwesomeIcon icon={faUser} className={navbarstyle.fauser} />
                            <button className={navbarstyle.logOutBttn} type="button" onClick={handleLogOut}>Log Out</button>
                        </div>
                    ) }
                </div>
            </ul>

            <Outlet />
        </div>
    )
}

export default Navbar