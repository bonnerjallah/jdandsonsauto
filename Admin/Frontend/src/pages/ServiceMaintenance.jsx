import { useState, useEffect } from 'react'
import axios from 'axios'


import Sidebar from '../components/Sidebar'

import EditMantModal from '../components/EditMantModal'

import svcmaintstyle from "../style/svcmaintstyle.module.css"

const backendUrl = import.meta.env.VITE_BACKEND_URL

const ServiceMaintenance = () => {

    const [maintInputData, setMaintInputData] = useState({
        vehitype: '',
        vehiyear: '',
        vehivin: '',
        vehistock: '',
        mainttype: '',
        price: ''
    })

    const handleMaintInput = (e) => {
        e.preventDefault()
        const {name, value} = e.target

        setMaintInputData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleDataSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`${backendUrl}/createservicemaintenance`, maintInputData, {
                headers: { "Content-Type": 'application/json' }
            });
    
            if (response.status === 200) { 
                console.log("Maintenance created successfully");
    
                setMaintInputData({
                    vehitype: '',
                    vehiyear: '',
                    vehivin: '',
                    vehistock: '',
                    mainttype: '',
                    price: ''
                });
    
            } else {
                console.log("Error", response.data);
            }
    
        } catch (error) {
            console.log("Error inserting maintenance data", error);
        }
    };

    const [maintenanceData, setMaintenanceData] = useState([])

    useEffect(() => {
    
        const fetchMaintenanceData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/getservicemaintenance`)
                if (response.status === 200) {
                    setMaintenanceData(response.data)
                } else {
                    console.log("Invalid response data", response.data)
                }
            } catch (error) {
                console.error("Error fetching data", error)
            }
        }

        fetchMaintenanceData()

    }, [])

    const [openModal, setOpenModal] = useState(false)
    const [editData, setEditData] = useState(null)

    const handleModal = (elem) => {
        setOpenModal(true)
        setEditData(elem)    
    }

    const deleteMaint = async (id) => {

        const userConfirmed = window.confirm("Are you sure you want to delete this record?")

        if(!userConfirmed) {
            return;
        }

        try {
            const response = await axios.delete(`${backendUrl}/deleteSvcMaint/${id}`)

            if (response.status === 200) {
                console.log("Deleted successfully")
            } else {
                console.error("Error deleting record", response.data)
            }

        } catch (error) {
            console.error("Error deleting record", error)
        }
    }
    

    return (
        <div className={svcmaintstyle.mainContainer}>
            <div>
                <Sidebar />
            </div>
            <div className={svcmaintstyle.maintnanceMainWrapper}>
                <div className={svcmaintstyle.header}>
                    <h1>Service & Maintenance</h1>
                </div>
                <div className={svcmaintstyle.formWrapper}>
                    <form onSubmit={handleDataSubmit}>
                        <fieldset>
                            <h2>Maintenance Input</h2>
                            <label htmlFor="vehicleType">
                                Vehicle Type:
                                <input type="text" name='vehitype' id='vehicleType' placeholder='Vehicle Type' value={maintInputData.vehitype} onChange={handleMaintInput} />
                            </label>
                            <label htmlFor="vehicleYear">
                                Vehicle Year:
                                <input type="text" name='vehiyear' id='vehicleYear' placeholder='Vehicle Year' value={maintInputData.vehiyear} onChange={handleMaintInput} />
                            </label>
                            <label htmlFor="vehicleVin">
                                Vehicle Vin:
                                <input type="text" name='vehivin' id='vehicleVin' placeholder='Vehicle Vin' value={maintInputData.vehivin} onChange={handleMaintInput} />
                            </label>
                            <label htmlFor="vehicleStock">
                                Vehicle Stock #:
                                <input type="text" name='vehistock' id='vehicleStock' placeholder='Vehicle Stock #' value={maintInputData.vehistock} onChange={handleMaintInput} />
                            </label>
                            <label htmlFor="maintainceType">
                                Type of Maintenance:
                                <input type="text" name='mainttype' id='maintainceType' placeholder='Type of Maintenance' value={maintInputData.mainttype} onChange={handleMaintInput} />
                            </label>
                            <label htmlFor="maintaincePrice">
                                Price:
                                <input type="text" name='price' id='maintaincePrice' placeholder='Price' value={maintInputData.price} onChange={handleMaintInput} />
                            </label>
                        </fieldset>
                        <button type='submit' className={svcmaintstyle.mainttbttn}>Add Vehicle</button>
                    </form>

                </div>


                <div className={svcmaintstyle.maintlist}>
                    <h2>Vehicles Up for Maintenance </h2>
                    { maintenanceData.map((elem, id) => (
                        <div key={id}>
                            <ul>
                                <li>Vehicles Type: <span>{elem.vehitype}</span></li>
                                <li>Vehicle Year: <span>{elem.vehiyear}</span></li>
                                <li>Vehicle Vin #: <span>{elem.vehivin}</span></li>
                                <li>Vehicle Stock #: <span>{elem.vehistock}</span></li>
                                <li>Type of Maintenance: <span>{elem.mainttype}</span></li>
                                <li>Price: <span>{elem.price}</span></li>
                                <div className={svcmaintstyle.editDeleteWrapper}>
                                    <button className={svcmaintstyle.editBttn} onClick={() => {handleModal(elem)}}>Edit</button>
                                    <button className={svcmaintstyle.deleteBttn} onClick={() => {deleteMaint(elem.id)}}>Delete</button>
                                </div>
                            </ul>
                            {openModal && <EditMantModal editData={editData} closeModal={setOpenModal} />}
                        </div>
                    ))}  
                </div>
            </div>

        </div>
    )
}

export default ServiceMaintenance