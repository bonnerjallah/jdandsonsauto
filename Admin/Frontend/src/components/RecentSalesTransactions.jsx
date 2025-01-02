import { useState, useEffect } from 'react'

import recenttransactonsstyle from '../style/recenttransactionsstyle.module.css'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const RecentSalesTransactions = () => {

    const [customerData, setCustomerData] = useState([])

    useEffect(() => {

        const fetchCustomerData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/getcustomers`);

                if (response.status === 200) {
                    const formattedData = response.data.map((elem) => {
                        const formattedDate = new Date(elem.datepurchase).toISOString().split('T')[0];

                        // Update the 'datepurchase' field
                        elem.datepurchase = formattedDate;

                        return elem;
                    });

                    setCustomerData(formattedData);

                } else {
                    console.log("Invalid response data", response.data);
                }

            } catch (error) {
                console.error('Error fetching data', error);
            }
        }

        fetchCustomerData();

    }, []);

    return (
        <div className={recenttransactonsstyle.mainContainer}>
            <h1>Recent Sales Transaction</h1>
            <div className={recenttransactonsstyle.mainWrapper}>
                <div className={recenttransactonsstyle.mainWrapperItems}>
                    <table>
                        <thead>
                            <tr>
                                <th>Sold Date</th>
                                <th>Sold Price</th>
                                <th>Customer Name</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerData.map((elem, id) => (
                                <tr key={id}>
                                <td>{elem.datepurchase}</td>
                                <td>{elem.purchprice}</td>
                                <td>{elem.custName}</td>
                                <td>{elem.itembought}</td>
                            </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RecentSalesTransactions