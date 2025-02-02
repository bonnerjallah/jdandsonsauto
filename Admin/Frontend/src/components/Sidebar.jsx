import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios'
import { NavLink, Outlet } from 'react-router-dom';

import Cookies from 'js-cookie';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBox, faCarSide, faMagnifyingGlassChart, faCalendarDays, faClipboardCheck} from '@fortawesome/free-solid-svg-icons';

import sidebarstyle from '../style/sidebarstyle.module.css'

const backendUrl = import.meta.env.VITE_BACKEND_URL


const Sidebar = () => {

    const {user} = useAuth()

    const [member, setMember] = useState("")
    const [profileImage, setProfileImage] = useState([])

    axios.defaults.withCredentials = true
    useEffect(() => {
        if(!user) return
        const fetchMember = async () => {
            try {
                const response = await axios.get(`${backendUrl}/getadminmember`)

                response.data.valid ? setMember(response.data) : console.error("Invalid user session", response.data)
            } catch (error) {
                console.log("Error fetching user data", error)
            }
        }

        fetchMember()
    }, [user]);



    useEffect(() => {
        const fetchProfilePic = async () => {
            if (member && typeof member === 'object' && member.profilePic) {
                const imagePicPromises = [member.profilePic].map(async (elem) => {
                    if (elem) {
                        return `${backendUrl}/profilepic/${elem}`;
                    }
                    return null;
                });
                
                const imagePic = await Promise.all(imagePicPromises);
                setProfileImage(imagePic);
            }
        }
    
        fetchProfilePic();
    }, [member]);
    
    return (
        <div className={sidebarstyle.mainContainer}>
            <div className={sidebarstyle.sideBarHeader}>
                <h2>ADMIN</h2>
            </div>
            <div className={sidebarstyle.sideBar}>
                
                <div className={sidebarstyle.profileWrapper}>
                    <div className={sidebarstyle.imageWrapper}>
                        {user && member ? (
                            profileImage.length > 0 ? (
                                profileImage.map((url, index) => (
                                <NavLink key={index} to='/uploadprofilepic'>
                                    <img src={url} alt="Profile picture" width={70} height={70} />
                                </NavLink>
                                ))
                            ) : (
                                // Render a default image when profileImage is empty
                                <NavLink to='/uploadprofilepic'>
                                    <img src="/gweagon.webp" alt="Profile picture" width={70} height={70} />
                                </NavLink>
                            )
                        ) : null}
                    </div>


                    <div className={sidebarstyle.username}>
                        {user && member ? (
                            <div>
                                <h2>
                                    {member.firstName}
                                </h2>
                            </div>
                        ): (<h2>Welcome</h2>)}
                    </div>
                </div>
                <NavLink to="/Dashboard">
                    <div className={sidebarstyle.dashHome}>
                        <FontAwesomeIcon icon={faHouse} />
                        <h2>Dashboard</h2>
                    </div>
                </NavLink>
                
                <div className={sidebarstyle.sideBarMainWrapper}>
                    <div className={sidebarstyle.data}>
                        <h3>Inventory</h3>
                        <ul>
                            <NavLink to="/InventoryManagement">
                                <li><FontAwesomeIcon icon={faBox}/>  Total Vehicles</li>
                            </NavLink>
                            <NavLink to="/InventoryManagement">
                                <li><FontAwesomeIcon icon={faBox}/> Low Stock Vehicles</li>
                            </NavLink>
                            <NavLink to="/InventoryManagement">
                                <li><FontAwesomeIcon icon={faBox}/> Out of Stock Vehicles</li>
                            </NavLink>
                            <NavLink to="/InventoryManagement">
                                <li><FontAwesomeIcon icon={faBox}/> Most Stock Vehicles</li>
                            </NavLink>

                        </ul>
                    </div>
                    <div className={sidebarstyle.pages}>
                        <h3>Pages</h3>
                        <ul>
                            <NavLink to='/AddNewVehicle'>
                                <li><FontAwesomeIcon icon={faCarSide}/> Add New Vehicle</li>
                            </NavLink>
                            
                            <NavLink to="/ApptCalendar">
                                <li><FontAwesomeIcon icon={faCalendarDays}/> Appointment Calander</li>
                            </NavLink>
                            <NavLink to='/ServiceMaintenance'>
                                <li><FontAwesomeIcon icon={faClipboardCheck}/> Maintenance Record</li>
                            </NavLink>

                        </ul>
                    </div>
                    <div className={sidebarstyle.chart}>
                        <h3>Charts</h3>
                        <ul>  
                            <NavLink to='/SalesAnalytics'>
                                <li><FontAwesomeIcon icon={faMagnifyingGlassChart}/> Sales Analytics</li>
                            </NavLink>
                        </ul>
                        
                    </div>
                </div>

            </div>

            <Outlet />
        </div>
    )
}

export default Sidebar