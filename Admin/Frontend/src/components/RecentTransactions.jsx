import {useState,useEffect} from 'react'


import recenttransactonsstyle from '../style/recenttransactionsstyle.module.css'
import axios from 'axios'

const RecentTransactions = () => {

    const [purchase, setPurchase] = useState([]);

    useEffect(() => {
        axios.get('http://jdadmin.jdnsonsautobrokers.com/purchases')
            .then((res) => {
                if (res.status === 200) {
                    setPurchase(res.data); 
                } else {
                    console.error('Invalid response data', res.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching purchase data', error);
            });
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