import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'

import messagemodalstyle from "../style/messagemodalstyle.module.css"

const backendUrl = import.meta.env.VITE_BACKEND_URL

const MessageModal = ( { messageData, closeMessageModal}) => {

    console.log("Message Data", messageData)

    useEffect(() => {
        if (!messageData.car_id) {
            // Reset carInquireAbout when switching to messageData
            setCarInquireAbout([]);
        }
    }, [messageData]);


    const [carInquireAbout, setCarInquireAbout] = useState([])
    const [images, setImages] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/getCarData`);
                const carinfo = response.data;
    
                // const imageResponse = await axios.get(`${backendUrl}/images`);
                // const carImages = imageResponse.data;
    
                // const combinedData = carinfo.map((carElem) => {
                //     const imageForCar = carImages.filter((imageElem) => imageElem.car_id === carElem.id);
                //     carElem.images = imageForCar;
                //     return carElem;
                // });
    
                // const carToInquireAbout = combinedData.find(
                //     (carElem) => carElem.id === messageData.car_id
                // );

                // if (carToInquireAbout) {
                //     setCarInquireAbout(carToInquireAbout);

                //     const imageDataArray = await Promise.all(
                //         carToInquireAbout.images.map(async(elem) => {
                //             if(elem) {
                //                 const imageUrl = `${backendUrl}/carimages/${elem.image_url}`
                //                 return imageUrl
                //             }
                //             return null
                //         })
                //     )
                // }

                // setImages(carinfo)


            } catch (error) {
                console.log("Error fetching data", error);
            }
        }

        fetchData();
    }, [messageData.car_id]);
    

    const handleDeleteMessage = async ()=> {
        console.log("message to delete", messageData)

        const userConfirmed = window.confirm("Are you sure you want to delete this message?")

        if(!userConfirmed) {
            return 
        }

        try {
            if(messageData && messageData.messageType && messageData.id) {
                const response = await axios.delete(`${backendUrl}/deletemessage/${messageData._id}`)
                
                if(response.status === 200) {
                    console.log("Deleted message successfully")
                } else {
                    console.log("Error deleting message form data base", response.data)
                }
            }
            
        } catch (error) {
            console.log("Error deleting data", error)
        }
    }


    console.log("Car Inquire About", carInquireAbout)

    return (
        <div className={messagemodalstyle.mainContainer}>
            <div className={messagemodalstyle.headerContainer}>
                <div className={messagemodalstyle.headerWrapper}>
                    <h2>Message Board</h2>
                </div>
                <p onClick={() => closeMessageModal(false)}>X</p>
            </div>
            
            <div className={messagemodalstyle.messagesContainer}>
                <div className={messagemodalstyle.subtitle}>
                    <h4>Customer Contact</h4>
                </div>
                <div className={messagemodalstyle.messangerContactInfo}>
                    {messageData &&  (
                        <p>
                            <span>Name: </span>{messageData.first_name && messageData.last_name
                                ? `${messageData.first_name} ${messageData.last_name}`
                                : messageData.searchcustname || `${messageData.firstname} ${messageData.lastname}` || 'N/A'}
                        </p>
                    )}
                </div>
                <div className={messagemodalstyle.messangerContactInfo}>
                    {messageData && (
                        <p>
                            <span>Phone Number:</span> {messageData ? messageData.phone_number || messageData.searchcustphone || messageData.phonenumber : 'N/A'}
                        </p>
                    )}
                </div>
                <div className={messagemodalstyle.messangerContactInfo}>
                    {messageData && (
                        <p>
                            <span>Email:</span> {messageData ? messageData.availability_email || messageData.searchcustemail || messageData.email : "N/A"}
                        </p>
                    )}
                </div>
                <div className={messagemodalstyle.messangerContactInfo}>
                    {messageData && messageData.contactpref ? (
                        <p>
                            <span>Contact Preference:</span> {messageData.contactpref}
                        </p>
                    ): " "}
                </div>
            </div>

            <div className={messagemodalstyle.messageBoardContainer}>
                <div className={messagemodalstyle.messageDisplayBoardWrapper}>
                    <div className={messagemodalstyle.subtitle}>
                        <h4>Message</h4>
                    </div>
                    <div className={messagemodalstyle.messageDisplayBoard}>
                        {messageData ? messageData.availability_message  || messageData.searchreachyou || messageData.message : ''}
                    </div>


                </div>

                <div className={messagemodalstyle.vehicleInquiringAboutContainer}>
                        <div className={messagemodalstyle.subtitle}>
                            <h4>Vehicle Inquiring About</h4>
                        </div>
                        <div className={messagemodalstyle.messangerContactInfo}>
                            <p>
                                <span>Car Name:</span> {carInquireAbout && carInquireAbout.carname ? carInquireAbout.carname : messageData.searchmake}
                            </p>
                            <p>
                                <span>Car Year:</span> {carInquireAbout ? carInquireAbout.caryear || messageData.searchyear : ''}
                            </p>
                        </div>
                        <div className={messagemodalstyle.imageWrapper}>
                            {carInquireAbout && carInquireAbout.carimages && carInquireAbout.carimages.length > 0 ? (
                                <>
                                    {carimages.map((image, index) => (
                                        <img key={index} src={image} alt="car" />   
                                    )
                                    )}
                                </>
                            ) : (
                                <p>
                                    No Image Available
                                </p>
                            )}
                        </div>
                </div>

                <div className={messagemodalstyle.deleteButtonWrapper}>
                    <button className={messagemodalstyle.bttn} onClick={() => {handleDeleteMessage(); closeMessageModal(false)}}>Delete
                    </button>
                </div>

            </div>
        </div>
    )
}

export default MessageModal