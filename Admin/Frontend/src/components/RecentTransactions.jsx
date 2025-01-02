import {useState,useEffect} from 'react'


import recenttransactonsstyle from '../style/recenttransactionsstyle.module.css'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const RecentTransactions = () => {

    const [purchase, setPurchase] = useState([]);

    useEffect(() => {

        const fetchPurchaseData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/getpurchases`);

                if (response.status === 200) {
                    setPurchase(response.data);
                } else {
                    console.error('Invalid response data', response.data);
                }

            } catch (error) {
                console.error('Error fetching purchase data', error);
            }
        }

        fetchPurchaseData();

    }, []); 

    return (
        <div className={recenttransactonsstyle.mainContainer}>
            <h1>Recent Purchase Invoice</h1>
            <div className={recenttransactonsstyle.mainWrapper}>
                <div className={recenttransactonsstyle.mainWrapperItems}>
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Vehicle Year</th>
                                <th>Price</th>
                                <th>Auction Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchase.map((elem, index) => (
                                <tr key={index}>
                                    <td>{elem.vechPurch}</td>
                                    <td>{elem.vechiYear}</td>
                                    <td>{elem.purchPrice}</td>
                                    <td>{elem.auctionName}</td>
                                </tr>
                            ))}  
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RecentTransactions