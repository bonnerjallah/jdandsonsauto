import { useState, useEffect } from "react"

import svcmaintstyle from "../style/svcmaintstyle.module.css"
import axios from "axios"


const EditMantModal = ({closeModal, editData}) => {

    //State to update the input field with the data to be edited
    const [localEditData, setLocalEditData] = useState(editData)

    const inputToEdit = (e) => {
        const { name, value } = e.target;

        setLocalEditData((prevData) => ({...prevData, [name]: value}))
    }


    const handleEditedDataSubmit = async (e) => {
        e.preventDefault();

        const userConfirmed = window.confirm("Are You sure you want to update this record?")

        if(!userConfirmed) {
            return;
        }

        try {
            const response = await axios.put("http://jdadmin.jdnsonsautobrokers.com/updateSvcMaint", localEditData, {
                headers: {"Content-Type": "application/json"}
            })
            if(response.status === 200) {
                console.log("Updated data successfully")

                setLocalEditData({
                    vehitype: "",
                    vehiyear: "",
                    vehivin: "",
                    vehistock: "",
                    mainttype: "",
                    price: ""
                })

                closeModal(false)

            } else {
                console.log("Error updating data", response.data)
            }

        } catch (error) {
            console.log("Error updating data", error)
        }     
    }



    return (
        <div className={svcmaintstyle.modalFormWrapper}>
            <form onSubmit={handleEditedDataSubmit} >
                <label htmlFor="vehicleType"> Vehicle Type: </label>
                <input type="text" name='vehitype' id="vehicleType" placeholder='Vehicle Type' value={localEditData.vehitype || ""} onChange={inputToEdit} />
                <label htmlFor="vehicleYear">  Vehicle Year: </label>
                <input type="text" name='vehiyear' id="vehicleYear" placeholder='Vehicle Year' value={localEditData.vehiyear || ''} onChange={inputToEdit}  />
                <label htmlFor="vehicleVin"> Vehicle Vin:</label>
                <input type="text" name='vehivin' id="vehicleVin" placeholder='Vehicle Vin' value={localEditData.vehivin || ""} onChange={inputToEdit}   />
                <label htmlFor="vehicleStock"> Vehicle Stock #:</label>
                <input type="text" name='vehistock' id="vehicleStock" placeholder='Vehicle Stock' value={localEditData.vehistock || ""} onChange={inputToEdit}   />
                <label htmlFor="vehicleMaintType"> Type of Maintenance: </label>
                <input type="text" name='mainttype' id="vehicleMaintType" placeholder='Type of Maintenance' value={localEditData.mainttype ||""} onChange={inputToEdit}   />
                <label htmlFor="vehiclePrice"> Price:</label>
                <input type="text" name='price' id="vehiclePrice" placeholder='Price' value={localEditData.price || ""} onChange={inputToEdit}  />
                <div>
                    <button className={svcmaintstyle.cancleBttn} onClick={() => {closeModal(false)}} >Cancle</button>
                    <button type="submit" className={svcmaintstyle.updateBttn}>Update</button>
                </div>
            </form>
        </div>
    )
}

export default EditMantModal    