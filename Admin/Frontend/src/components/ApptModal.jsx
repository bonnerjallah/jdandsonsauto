import React, { useState } from 'react'

import format from 'date-fns/format'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'






import dashboardstyletwo from '../style/dashboardstyletwo.module.css'
import axios from 'axios'



const ApptModal = ({closeApptModal, apptData}) => {

    const [localApptEditData, setLocalApptEditData] = useState(apptData)

    const inputApptToEdit = (e) => {
        const {name, value} = e.target

        setLocalApptEditData((prevData) => ({...prevData,  [name]: value}))
    }

    const handleStartDateChange = (date) => {
        setLocalApptEditData((prevData) => ({ ...prevData, start: date }));
    }
    
    const handleEndDateChange = (date) => {
        setLocalApptEditData((prevData) => ({ ...prevData, end: date }));
    }
    

    const handleApptEditSubmit = async (e) => {
        e.preventDefault()

        // const userConfirmed = window.confirm("Are you sure you want to edit appointment?")

        // if(!userConfirmed) {
        //     return;
        // }

        const formattedStartDate = format(localApptEditData.start, "yyyy-MM-dd'T'HH:mm:ss");
        const formattedEndDate = format(localApptEditData.end, "yyyy-MM-dd'T'HH:mm:ss")

        try {
            console.log("Data being sent", localApptEditData)
            const response = await axios.put("http://jdadmin.jdnsonsautobrokers.com/calander", {
                id: localApptEditData.id,
                title: localApptEditData.title,
                start: formattedStartDate,
                end: formattedEndDate
            }, {
                headers: {'Content-type': 'application/json'}
            })

            console.log("PUT Response:", response); // Log the entire response object

            if(response.status === 200) {
                console.log("Appointment created successfully")
            } else {
                console.log("Error editing appointment data")
            }

            setLocalApptEditData({
                title: "",
                start: "",
                end: ""
            })
            
            closeApptModal(false)
            
        } catch (error) {
            console.error("Error editing appointment", error)
        }
    }

    const apptDeleteBttn = async (id) => {

        const userConfirmed = window.confirm("Are you sure you want to delete this appointmnt?")

        if(!userConfirmed) {
            return;
        }
        
        const formattedStartDate = new Date(localApptEditData.start).toISOString();
        const formattedEndDate = new Date(localApptEditData.end).toISOString();

        try {
            console.log("data sent to be deleted", formattedStartDate, formattedEndDate)
            const response = await axios.delete(`http://jdadmin.jdnsonsautobrokers.com/deleteappt`, {
                id: localApptEditData.id,
                title: localApptEditData.title,
                start: formattedStartDate,
                end: formattedEndDate
            });
    
            if (response.status === 200) {
                console.log("Deleted appointment successfully");
            } else {
                console.log("Error deleting appointment", response.data);
            }
        } catch (error) {
            console.error("Error deleting appointment", error);
        }
    };
    


    return (
        <div className={dashboardstyletwo.appointmodal} >
            <h3 className={dashboardstyletwo.apptheader}>Edit Appointment</h3>

            <form onSubmit={handleApptEditSubmit}>
                <div className={dashboardstyletwo.close} onClick={() => {closeApptModal(false)}}>
                    X
                </div>
                
                <label htmlFor="apptmtTitle">Title</label>
                <input type="text" name='title' id='apptmtTitle' placeholder='Add Title' value={localApptEditData.title || ''} onChange={inputApptToEdit} />

                <label htmlFor="apptmtStartDate">Start Date & Time</label> <br />
                <DatePicker id='apptmtStartDate' placeholderText="Start Date" selected={localApptEditData.start ? new Date (localApptEditData.start) : null}
                showTimeSelect  className={dashboardstyletwo.datepicker} value={localApptEditData.start || ''} onChange={handleStartDateChange} /> <br />

                <label htmlFor="apptmtEndDate">End Date & Time</label> <br />
                <DatePicker id='apptmtEndDate' placeholderText="End Date" selected={localApptEditData.end ? new Date (localApptEditData.end) : null}
                showTimeSelect  className={dashboardstyletwo.datepicker} value={localApptEditData.end || ''} onChange={handleEndDateChange} />  <br />                 

                <div className={dashboardstyletwo.appModalBttsWrapper}>
                    <button type='submit' className={dashboardstyletwo.apptEditBttn}>Edit Event</button>
                    <button type='submit' className={dashboardstyletwo.apptDeleteBttn} onClick={() => {apptDeleteBttn()}}>Delete Event</button>
                </div>   
            </form>
        </div>
    )
}

export default ApptModal