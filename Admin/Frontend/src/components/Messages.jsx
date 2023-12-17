import { useState, useEffect } from 'react';
import axios from "axios"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInbox, faCommentDollar, faMagnifyingGlassDollar } from "@fortawesome/free-solid-svg-icons"


import dashboardstyletwo from '../style/dashboardstyletwo.module.css';
import { NavLink } from 'react-router-dom';

const Messages = () => {

    const [availability, setAvailability] = useState([])
    const [carfinder, setCarFinder] = useState([])
    const [message, setMessage] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/availabilityandquote")
            .then((res) => {
                if(res.status === 200 ) {
                    setAvailability(res.data)
                } else {
                    console.log("Invalid response data", res.data)
                }
            })
            .catch ((error) => {
                console.log("Error fetching data", error)
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3001/carfinder")
            .then((res) => {
                if(res.status === 200) {
                    setCarFinder(res.data)
                } else {
                    console.log("Invalid response data", res.data)
                }
            })
            .catch((error) => {
                console.log("Error fetching data", error)
            })
    },[])

    useEffect(() => {
        axios.get("http://localhost:3001/message")
            .then((res) => {
                if(res.status === 200) {
                    setMessage(res.data)
                } else {
                    console.log("Incalid response data", res.data)
                }
            })
            .catch((error) => {
                console.log("Error fetching data", error)
            })
    })

    return (
        <div className={dashboardstyletwo.messagewrapper}>
            <div className={dashboardstyletwo.messagecounter}>
                <span>{availability.length}</span>
                <NavLink to="/MessageCenter">
                    <FontAwesomeIcon icon={faInbox} className={dashboardstyletwo.fainbox}/>
                </NavLink>
            </div>
            <div className={dashboardstyletwo.messagecounter}>
                <span>{message.length}</span>
                <NavLink to="/MessageCenter">
                    <FontAwesomeIcon icon={faCommentDollar} className={dashboardstyletwo.facomment} />
                </NavLink>
            </div>
            <div className={dashboardstyletwo.messagecounter}>
                <span>{carfinder.length}</span>
                <NavLink to="/MessageCenter">
                    <FontAwesomeIcon icon={faMagnifyingGlassDollar} className={dashboardstyletwo.magglass} />
                </NavLink>
            </div>
        </div>
    )
}

export default Messages