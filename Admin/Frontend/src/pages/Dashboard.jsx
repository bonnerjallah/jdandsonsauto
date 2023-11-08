import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import axios from 'axios'
import { NavLink } from "react-router-dom"

import Cookies from 'js-cookie';


import Sidebar from "../components/Sidebar"
import LineGraph from "../components/LineGraph"
import RecentTransactions from "../components/RecentTransactions"
import FinancialGains from "../components/FinancialGains"
import ApptModal from '../components/ApptModal';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBox } from "@fortawesome/free-solid-svg-icons"


import dashboardstyletwo from '../style/dashboardstyletwo.module.css';


const Dashboard = () => {

    const {user} = useAuth()


    const [member, setMember] = useState("")

    axios.defaults.withCredentials = true
    useEffect(() => {
        if (user) {
            const token = Cookies.get('token')

            axios.get('http://localhost:3001/user', {
                headers: {
                    "Content-Type": 'application/json',  'Authorization': `Bearer ${token}`
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
            });
        }
    }, [user]);


    const [inventoryData, setInventoryData] = useState('')

    useEffect(() => {
        axios.get("http://localhost:3001/cardiscrip")
            .then((res) => {
                if(res.status === 200) {
                    const data = res.data
                    const totalCount = {
                        sedan : 0,
                        sport : 0,
                        truck: 0,
                        suv: 0,
                        van: 0
                    }

                    data.forEach((elem) => {
                        if(elem.trim && typeof elem.trim === 'string') {
                            const lowerTrim = elem.trim.toLowerCase()
                            if (lowerTrim.includes('sedan')) {
                                totalCount.sedan++
                            } else if (lowerTrim.includes('truck' ) || (lowerTrim.includes('pickup'))) {
                                totalCount.truck++
                            } else if (lowerTrim.includes('sport')) {
                                totalCount.sport++
                            } else if (lowerTrim.includes('suv')) {
                                totalCount.suv++
                            } else if (lowerTrim.includes('van')) {
                                totalCount.van++
                            }
                        }
                    })

                    setInventoryData(totalCount)
                }
            })
            .catch((error) => {
                console.error("Error fetching inventory data", error);
            });
    }, []);

    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/calander")
            .then((res) => {
                if (res.status === 200) {
                    const formattedData = res.data.map((elem) => ({
                        ...elem,
                        start: new Date(elem.start).toISOString().split('T')[0],
                        end: new Date(elem.end).toISOString().split('T')[0],
                        startTime: new Date(elem.start).toLocaleTimeString(),
                        endTime: new Date (elem.end).toLocaleTimeString()
                    }));
    
                    setAllEvents(formattedData);
                } else {
                    console.error("Invalid response data", res.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching appointment data", error);
            });
    }, []);
    

    const [openApptModal, setOpenApptModal] = useState(false)
    const [apptData, setApptData] = useState()

    const handleApptModal = (elem) => {
        
        setOpenApptModal(true)
        setApptData(elem)

    }

    return (
        <div className={dashboardstyletwo.mainContainer}>
            <div>
                <Sidebar />
            </div>
            <div className={dashboardstyletwo.mainWrapper}>
                <div className={dashboardstyletwo.header}>
                    <div>
                        <h2>DASHBOARD</h2>
                        <p>Welcome {member.firstName}</p>
                    </div>
                </div>
                <div className={dashboardstyletwo.dataBosexWrapper}>
                    <div className={`${dashboardstyletwo.databoxes} ${ dashboardstyletwo.box1}`}>
                        <NavLink to="/InventoryManagement">
                            <FontAwesomeIcon icon={faBox} />
                            <h3>Total Products</h3>
                            <span>Sedans</span> <br />
                            <small>{inventoryData.sedan}</small>
                        </NavLink>
                        
                    </div>
                    <div className={`${dashboardstyletwo.databoxes} ${dashboardstyletwo.box2}`}>
                        <NavLink to="/InventoryManagement">
                            <FontAwesomeIcon icon={faBox} />
                            <h3>Total Products</h3>
                            <span>Sports</span> <br />
                            <small>{inventoryData.sport}</small>
                        </NavLink>
                    </div>
                    <div className={`${dashboardstyletwo.databoxes} ${dashboardstyletwo.box3} `}>
                        <NavLink to="/InventoryManagement">
                            <FontAwesomeIcon icon={faBox} />
                            <h3>Total Products</h3>
                            <span>Trucks</span> <br />
                            <small>{inventoryData.truck}</small>
                        </NavLink>
                    </div>
                    <div className={`${dashboardstyletwo.databoxes} ${dashboardstyletwo.box4}`}>
                        <NavLink to="/InventoryManagement">
                            <FontAwesomeIcon icon={faBox} />
                            <h3>Total Products</h3>
                            <span>SUVs / Vans</span> <br />
                            <small>{inventoryData.suv || inventoryData.van}</small>
                        </NavLink>
                    </div>
                </div>

                <div className={dashboardstyletwo.middleWrapper}>
                    <div className={dashboardstyletwo.middleFirstDiv}>
                        <LineGraph />
                    </div>
                    <div className={dashboardstyletwo.middleSecondDiv}>
                        <RecentTransactions />
                    </div>

                </div>

                <div className={dashboardstyletwo.bottomWrapper}>
                    <div className={dashboardstyletwo.financialGainsWrapper}>
                        <FinancialGains />
                    </div>

                    <div className={dashboardstyletwo.upComingAppt}>
                        <h2>Up Coming Appointments</h2>

                        <div className={dashboardstyletwo.apptlistwrapper}>
                            <table className={dashboardstyletwo.apptListTable}>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {allEvents && allEvents.length > 0 ? (
                                        allEvents.map((elem) => (
                                                <tr key={elem.id} className={dashboardstyletwo.appteditordelete} onClick={() => {handleApptModal(elem)}}>
                                                    <td>{elem.title}</td>
                                                    <td>{elem.start}</td>
                                                    <td>{elem.end}</td>
                                                    <td>{elem.startTime}</td>
                                                    <td>{elem.endTime}</td>
                                                </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No Upcoming Appointments</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {openApptModal && <ApptModal apptData={apptData} closeApptModal={setOpenApptModal} />}
                        </div>
                    </div>
                </div>               
            </div>
        </div>
    )
}

export default Dashboard