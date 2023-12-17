import { useState, useEffect } from "react"
import axios from "axios"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInbox, faCommentDollar, faMagnifyingGlassDollar, faSquareCaretDown } from "@fortawesome/free-solid-svg-icons"

import Sidebar from "../components/Sidebar"

import messagecenterstyle from '../style/messagecenterstyle.module.css'

const MessageCenter = () => {

    const[availabilityMessage, setAvailabilityMessage] = useState([])
    const[carfinderMessage, setCarFinderMessage] = useState([])
    const[message, setMessage] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/availabilityandquote")
            .then((res) => {
                if(res.status === 200) {
                    setAvailabilityMessage(res.data)
                } else{
                    console.log("error fetching data", res.error)
                }
            })
            .catch((error) => {
                console.error("Internal server Issue", error)
            })
    }, [])


    useEffect(() => {
        axios.get("http://localhost:3001/carfinder")
            .then((res) => {
                if(res.status === 200) {
                    setCarFinderMessage(res.data)
                } else {
                    console.log("error fetching data", res.error)
                }
            })
            .catch((error) => {
                console.error("Internal server Issue", error)
            })
    }, [])

    
    useEffect(() => {
        axios.get("http://localhost:3001/message")
            .then((res) => {
                if(res.status === 200) {
                    setMessage(res.data)
                } else {
                    console.log("Error fetching data", res.data)
                }
            })
            .catch((error) => {
                console.error("Internal server error", error)
            })
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
                            <span>{availabilityMessage.length}</span>
                            <FontAwesomeIcon icon={faInbox} />
                        </div>
                        <h3>Vehicle Availibality Message</h3>
                        <FontAwesomeIcon icon={faSquareCaretDown} style={{marginTop: "1rem"}} className={messagecenterstyle.dropdown} onClick={handleavailibalityDropDown} />
                    </div>

                    <div className={messagecenterstyle.title}>
                        <div className={messagecenterstyle.iconWrapper}>
                            <span>{carfinderMessage.length}</span>
                            <FontAwesomeIcon icon={faMagnifyingGlassDollar} />
                        </div>
                        <h3>Vehicle Finder Message</h3>
                        <FontAwesomeIcon icon={faSquareCaretDown} style={{marginTop: "1rem"}}  className={messagecenterstyle.dropdown} onClick={handlecarFinderDropDown}/>
                    </div>

                    <div className={messagecenterstyle.title}>
                        <div  className={messagecenterstyle.iconWrapper}>
                            <span>{message.length}</span>
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
                                <li key={index}>
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
                                <li key={index}>
                                    {elem.searchmake}.. 
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className={`${messagecenterstyle.messageSentWrapper} ${isDropDownOpen ? messagecenterstyle.openDropDownMessage : messagecenterstyle.messageSentWrapper}`}>
                        <ol>
                            {message && message.map((elem, index) => (
                                <li key={index} className={messagecenterstyle.dropdwonmessage} >
                                    {elem.message && typeof elem.message === "string"
                                    ? elem.message.split(' ').slice(0, 3).join(' ')
                                : elem.message} ..
                                </li>
                            ))}
                        </ol>
                    </div>

                </div>

            </div>
        </div>
        
    )
}

export default MessageCenter