import { useState, useEffect } from 'react'
import axios from 'axios'


import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import DatePicker from 'react-datepicker'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-datepicker/dist/react-datepicker.css'

import Sidebar from "../components/Sidebar"


import calanderstyle from '../style/calanderstyle.module.css'



const locales = {
    'en-US': enUS
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})


const ApptCalendar = () => {

    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        end: ''
    })

    const handleNewEventInput = (e) => {
        e.preventDefault()

        const {name, value} = e.target
        setNewEvent((prevData) => ({...prevData, [name]: value}))
    }

    const [allEvents, setAllEvents] = useState([])


    useEffect(() => {
        axios.get("http://jdadmin.jdnsonsautobrokers.com/calander")
        .then((res) => {
            if (res.status === 200) {
            const formattedData = res.data.map((elem) => ({
                ...elem,
                // Ensure that the date strings are consistently formatted
                start: new Date(elem.start), 
                end: new Date(elem.end), 
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



    const handleAddEvents = async (e) => {
        e.preventDefault()

        //format the date before sending it to the server
        const formattedStartDate = format(newEvent.start, "yyyy-MM-dd'T'HH:mm:ss");
        const formattedEndDate = format(newEvent.end, "yyyy-MM-dd'T'HH:mm:ss")

        try {
            const response = await axios.post("http://jdadmin.jdnsonsautobrokers.com/calander", {
                title: newEvent.title,
                start: formattedStartDate,
                end: formattedEndDate
            }, {
                headers: {"Content-Type": "application/json"}
            })

            if(response.status === 200) {

                setAllEvents([...allEvents, newEvent])

                setNewEvent({
                    title: "",
                    start: "",
                    end: ""
                })

            } else {
                console.log("Error", res.data)
            }

        } catch (error) {
            console.error("Error setting appointment", error)  
        }

    }


    return (
        <div className={calanderstyle.maincontainer}>
            <div>
                <Sidebar />
            </div>

            <div className={calanderstyle.calanderWrapper}>
                <div className={calanderstyle.calanderHeader}>
                    <h1>Calander</h1>
                    <h2>Add New Event</h2>
                </div>
                
                <div className={calanderstyle.addEventsWrapper}>
                    <input type="text" name='title' placeholder='Add Title' value={newEvent.title} onChange={handleNewEventInput} />

                    <DatePicker placeholderText="Start Date"
                    selected={newEvent.start} showTimeSelect onChange={(start) => setNewEvent({...newEvent, start})} />

                    <DatePicker placeholderText="End Date"
                    selected={newEvent.end} showTimeSelect onChange={(end) => setNewEvent({...newEvent, end})} />

                    <button onClick={handleAddEvents}>Add Event</button>
                </div>

                <div className={calanderstyle.calander}>
                    <Calendar localizer={localizer} events={allEvents} 
                    startAccessor="start" endAccessor="end"  style={{height: 500, margin: '2rem' }}/>
                </div>
                
            </div>
            
        </div>
    )
}

export default ApptCalendar