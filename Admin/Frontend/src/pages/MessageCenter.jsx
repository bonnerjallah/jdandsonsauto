import { useState, useEffect } from "react"
import axios from "axios"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInbox, faCommentDollar, faMagnifyingGlassDollar, faSquareCaretDown } from "@fortawesome/free-solid-svg-icons"

import Sidebar from "../components/Sidebar"
import MessageModal from "../components/MessageModal"

import messagecenterstyle from '../style/messagecenterstyle.module.css'

const backendUrl = import.meta.env.VITE_BACKEND_URL


const MessageCenter = () => {

    const[availabilityMessage, setAvailabilityMessage] = useState([])
    const[carfinderMessage, setCarFinderMessage] = useState([])
    const[message, setMessage] = useState([])

    useEffect(() => {

        const fetchData = async () => { 
            try {
                const response = await axios.get(`${backendUrl}/getavailabilityandquote`);
                if (response.status === 200) {
                    setAvailabilityMessage(response.data);
                } else {
                    console.error("Unexpected response status:", response.status);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }   , [])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/getcarfinderdata`);
                if (response.status === 200) {
                    setCarFinderMessage(response.data);
                } else {
                    console.error("Unexpected response status:", response.status);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch car data. Please try again later.");
            }
        };

        fetchData();
    }, []);

    
    useEffect(() => {

        const fetchData = async () => { 
            try {
                const response = await axios.get(`${backendUrl}/getmessages`);
                if (response.status === 200) {
                    setMessage(response.data);
                } else {
                    console.error("Unexpected response status:", response.status);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, [])


    //Drop down logics

    const[isDropDownOpen, setIsDropDownOpen] = useState(false)
    const[dropDownCarfinder, setDropDownCarFinder] = useState(false)
    const[dropDownAvailibality, setDropDownAvailibality] = useState(false)

    const handleDropDownAnimi = () => {
        setIsDropDownOpen(!isDropDownOpen)
    } 

    const handlecarFinderDropDown = () => {
        setDropDownCarFinder(!dropDownCarfinder)
    }

    const handleavailibalityDropDown = () => {
        setDropDownAvailibality(!dropDownAvailibality)
    }


    //Message Modal Logic
    const [openMessageModal, setOpenMessageModal] = useState(false)
    const [messageData, setMessageData] = useState()


    const handleModalOpen = ( elem ) => {
        setOpenMessageModal(true)

        //Pass message type to messagedata prop
        setMessageData({...elem, messageType: determineMessageType(elem)})
        
    }
    //Adding message type to messagedata 
    const determineMessageType = (elem) => {
        if(elem.availability_message) {
            return "availability"
        } else if (elem.searchmake) {
            return "carfinder"
        } else if (elem.message) {
            return "message"    
        }
        return "unknown"
    }

    return (
        <div className={messagecenterstyle.mainContainer}>
            <div>
                <Sidebar />
            </div>
            <div className={messagecenterstyle.messageCenterMainWrapper}>
                <div className={messagecenterstyle.header}>
                    <h1>Message Center</h1>
                </div>
                <div className={messagecenterstyle.titlesWrapper}>
                    <div className={messagecenterstyle.title}>
                        <div className={messagecenterstyle.iconWrapper}>
                            { availabilityMessage.length > 0 ? <span>{availabilityMessage.length}</span> : ''}
                            <FontAwesomeIcon icon={faInbox} />
                        </div>
                        <h3>Vehicle Availibality Message</h3>
                        <FontAwesomeIcon icon={faSquareCaretDown} style={{marginTop: "1rem"}} className={messagecenterstyle.dropdown} onClick={handleavailibalityDropDown} />
                    </div>

                    <div className={messagecenterstyle.title}>
                        <div className={messagecenterstyle.iconWrapper}>
                            { carfinderMessage.length > 0 ? <span>{carfinderMessage.length}</span> : ''}
                            <FontAwesomeIcon icon={faMagnifyingGlassDollar} />
                        </div>
                        <h3>Vehicle Finder Message</h3>
                        <FontAwesomeIcon icon={faSquareCaretDown} style={{marginTop: "1rem"}}  className={messagecenterstyle.dropdown} onClick={handlecarFinderDropDown}/>
                    </div>

                    <div className={messagecenterstyle.title}>
                        <div  className={messagecenterstyle.iconWrapper}>
                            {message.length > 0 ? <span>{message.length}</span> : ''}
                            <FontAwesomeIcon icon={faCommentDollar} />
                        </div>
                        <h3>Message</h3>
                        <FontAwesomeIcon icon={faSquareCaretDown} style={{marginTop: "1rem"}}  className={messagecenterstyle.dropdown} onClick={handleDropDownAnimi}/>
                    </div>
                </div>

                <div className={messagecenterstyle.messagesWrapper}>
                    <div className={`${messagecenterstyle.availabilityMessageWrapper} ${dropDownAvailibality ? messagecenterstyle.openavalibalityDrop : messagecenterstyle.availabilityMessage}`}>
                        <ol>
                            {availabilityMessage && availabilityMessage.map((elem, index) => (
                                <li key={index} onClick={() => handleModalOpen(elem)}>
                                    {elem.availability_message && typeof elem.availability_message === 'string'
                                    ? elem.availability_message.split(' ').slice(0, 3).join(' ')
                                    : elem.availability_message} ..
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className={`${messagecenterstyle.carfinderMessageWrapper} ${dropDownCarfinder ? messagecenterstyle.openDropDownCarfinder: messagecenterstyle.carfinderMessage} `}>
                        <ol>
                            {carfinderMessage && carfinderMessage.map((elem, index) => (
                                <li key={index} onClick={() => handleModalOpen(elem)}>
                                    {elem.searchmake}.. 
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className={`${messagecenterstyle.messageSentWrapper} ${isDropDownOpen ? messagecenterstyle.openDropDownMessage : messagecenterstyle.messageSentWrapper}`}>
                        <ol>
                            {message && message.map((elem, index) => (
                                <li key={index} className={messagecenterstyle.dropdwonmessage} onClick={() => handleModalOpen(elem)} >
                                    {elem.message && typeof elem.message === "string"
                                    ? elem.message.split(' ').slice(0, 3).join(' ')
                                : elem.message} ..
                                </li>
                            ))}
                        </ol>
                    </div>

                </div>

                {openMessageModal && (<MessageModal messageData={messageData} closeMessageModal={setOpenMessageModal}/> )}

            </div>
        </div>
        
    )
}

export default MessageCenter