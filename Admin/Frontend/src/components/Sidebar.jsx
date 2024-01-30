import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios'
import { NavLink, Outlet } from 'react-router-dom';

import Cookies from 'js-cookie';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBox, faCarSide, faMagnifyingGlassChart, faCalendarDays, faClipboardCheck} from '@fortawesome/free-solid-svg-icons';

import sidebarstyle from '../style/sidebarstyle.module.css'


const Sidebar = () => {

    const {user} = useAuth()

    // const StoredUserData = JSON.parse(window.localStorage.getItem('userData'))

    // const [member, setMember] = useState(StoredUserData || "")
    // const [profileImage, setProfileImage] = useState([])

    // useEffect(() => {
    //     if (StoredUserData) {
    //     setMember(StoredUserData);
    //     setProfileImage(StoredUserData.profilePic);
    //     }
    // }, []);

    const [member, setMember] = useState("")
    const [profileImage, setProfileImage] = useState([])

    axios.defaults.withCredentials = true
    useEffect(() => {
    if (user) {
        const token = Cookies.get('token'); // Retrieve the access token from the cookie

        axios.get('http://jdadmin.jdnsonsautobrokers.com/user', {
            headers: {
                'Authorization': `Bearer ${token}`, // Include the actual access token
            }
        })
        .then(res => {
            if (res.data.valid) {
                setMember(res.data.user);
            } else {
                console.error('Invalid response data:', res.data);
            }
        })
        .catch(err => {
            console.error('Error fetching user data:', err);
            if(err.response) {
                console.log("Response data", err.response.data)
            }
        });
    }
}, [user]);



    useEffect(() => {
        const fetchProfilePic = async () => {
            if (member && typeof member === 'object' && member.profilePic) {
                const imagePicPromises = [member.profilePic].map(async (elem) => {
                    if (elem) {
                        return `http://jdadmin.jdnsonsautobrokers.com/profilepic/${elem}`;
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