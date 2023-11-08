import { useState, useEffect } from "react"

import Sidebar from "../components/Sidebar"

import customermanastyle from '../style/customermanastyle.module.css'
import axios from "axios"

const CustomerManagement = () => {

    const [custInputData, setCustInputData] = useState({
        custName: '',
        custemail: '',
        addy: '',
        itembought: '',
        datepurchase: '',
        purchprice: '',
    })

    const handleCustInput = (e) => {
        e.preventDefault()
        const {name, value} = e.target

        if(name === "datepurchase") {
            const formattedDate = new Date(value).toISOString().split('T')[0]
            setCustInputData((prevData) => ({...prevData, [name]: formattedDate }))
        } else {
            setCustInputData((prevData) => ({...prevData, [name]: value}))
        }

    }


    const handleDataSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3001/customers", custInputData, {
                headers: {'Content-Type': 'application/json'}
            })

            if(response.status === 200) {
                console.log("Customer created successefully")

                setCustInputData({
                    custName: '',
                    custemail: '',
                    addy: '',
                    itembought: '',
                    datepurchase: '',
                    purchprice: '',
                })
            } else {
                console.log("Error", res.data)
            }
            
        } catch (error) {
            console.log("Error creating customer", error)
        }
    }

    const [customersData, setCustomersData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/customers")
            .then ((res) => {
                if(res.status === 200) {
                    const formattedData = res.data.map((elem) => {
                        const formattedDate = new Date(elem.datepurchase).toISOString().split('T')[0]

                        elem.datepurchase = formattedDate

                        return elem
                    })
                    setCustomersData(formattedData)
                } else {
                    console.log("Invalid response data", res.data)
                }
            })
            .catch((error) => {
                console.error("Error fetching customers data", error)
            })
    }, [])


    return (
        <div className={customermanastyle.mainContainer}>
            <div>
                <Sidebar />
            </div>
            <div className={customermanastyle.mainwrapper}>
            <div className={customermanastyle.header}>
                <h1>Customer Management</h1>
            </div>
            <div className={customermanastyle.custaddform}>
                <form onSubmit={handleDataSubmit}>
                    <fieldset>
                        <h3>Customer Input</h3>
                        <label htmlFor="customerName">
                            Customer Name :
                            <input type="text" name="custName" id="customerName" value={custInputData.custName}  placeholder="Customer Name" onChange={handleCustInput} />
                        </label>
                        <label htmlFor="customermail">
                            Customer Email: 
                            <input type="email" name="custemail" id="customermail" value={custInputData.custemail} placeholder="Email" onChange={handleCustInput} />
                        </label>
                        <label htmlFor="address">
                            Customer Address:
                            <input type="text" name="addy" id="address" value={custInputData.addy} placeholder="Address" onChange={handleCustInput} />
                        </label>
                        <label htmlFor="vehicleItemBought">
                            Vechile Bought / Type:
                            <input type="text" name="itembought" id="vehicleItemBought" value={custInputData.itembought} placeholder="Item Bought" onChange={handleCustInput} />
                        </label>
                        <label htmlFor="datePurchaseItem">
                            Date Sold:
                            <input type="date" name="datepurchase" id="datePurchaseItem" value={custInputData.datepurchase} placeholder="Date Purchase" onChange={handleCustInput} />
                        </label>
                        <label htmlFor="pruchPriceOfItem">
                            Price Sold:
                            <input type="text" name="purchprice" id="pruchPriceOfItem" value={custInputData.purchprice} placeholder="Price" onChange={handleCustInput} />
                        </label>
                    </fieldset>
                    <button type="submit" className={customermanastyle.formAddButton}>Add Customer</button>
                </form>
            </div>
                <div className={customermanastyle.tableWrapper}>
                    <h1>Customers</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Item Bought</th>
                                <th>Date Sold</th>
                                <th>Purchase Price</th>
                            </tr>
                        </thead>
                        <tbody>

                            {customersData.map((elem, id) => (
                                <tr key={id}>
                                <td>{elem.custName}</td>
                                <td>{elem.custemail}</td>
                                <td>{elem.addy}</td>
                                <td>{elem.itembought}</td>
                                <td>{elem.datepurchase}</td>
                                <td>{elem.purchprice}</td>
                            </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    )
}

export default CustomerManagement