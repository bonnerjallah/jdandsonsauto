import { useState, useEffect } from 'react';
import axios from "axios"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInbox, faCommentDollar, faMagnifyingGlassDollar, faBell} from "@fortawesome/free-solid-svg-icons"


import dashboardstyletwo from '../style/dashboardstyletwo.module.css';
import { NavLink } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL

const Messages = () => {

    const [message, setMessage] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const availabilityResponse = await axios.get(`${backendUrl}/getavailabilityandquote`)
                const availMessage = availabilityResponse.data

                const carfinderResponse = await axios.get(`${backendUrl}/getcarfinderdata`)
                const carfinderMessage = carfinderResponse.data

                const messageResponse = await axios.get(`${backendUrl}/getmessages`)
                const messageData = messageResponse.data

                const combineAllMessageData = availMessage.concat(carfinderMessage, messageData)

                setMessage(combineAllMessageData)
            } catch (error) {
                console.log("error fetching data", error)
            }
        }
        fetchData()
    }, [])


    return (
        <div className={dashboardstyletwo.messagewrapper}>
            <div className={dashboardstyletwo.messagecounter}>
                {message.length > 0 ? <span>{message.length}</span> : '' }
                <NavLink to="/MessageCenter">
                    <FontAwesomeIcon icon={faBell}  className={`${dashboardstyletwo.fainbox} ${message.length > 0 ? dashboardstyletwo.bellanimation : ''}`}/>
                </NavLink>
            </div>
        </div>
    )
}

export default Messages