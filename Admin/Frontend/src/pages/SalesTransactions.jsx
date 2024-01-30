import { useState } from 'react'


import Sidebar from '../components/Sidebar'
import RecentTransactions from '../components/RecentTransactions'
import RecentSalesTransactions from '../components/RecentSalesTransactions'


import transactionsstyle from "../style/transactionsstyle.module.css"
import React from 'react'
import axios from 'axios'



const SalesTransactions = () => {

    const [inputData, setInputData] = useState({
        auctionName: '',
        vechPurch: '',
        purchPrice: '',
        vechiYear: ''
    })

    const handleInputData = (e) => {
        const {name, value} = e.target

        setInputData ((prevData) => ({...prevData, [name]: value}))
    } 

    const hadleDataSubmit = async (e) => {
        e.preventDefault()

        try {
        const res = await axios.post('http://jdadmin.jdnsonsautobrokers.com/purchases', inputData, {
            headers: { 'Content-Type': 'application/json' },
        })

        if(res.status === 200) {
            console.log('Purchase insert successfully')

            setInputData({
                auctionName: '',
                vechPurch: '',
                purchPrice: '',
                vechiYear: '' 
            })
        } else {
            console.log('Error:', res.data)
        }

        } catch (error) {
            console.log("Error creating Purchase:", error)
        }
    }



    return (
        <div className={transactionsstyle.mainContainer}>
            <div>
                <Sidebar />
            </div>
            <div className={transactionsstyle.mainWapper}>
                <div className={transactionsstyle.header}>
                    <h1>Sales & Transactions</h1>
                </div>

                <div className={transactionsstyle.recentPurchFormWrapper}>
                    <form onSubmit={hadleDataSubmit}>
                        <fieldset>
                            <h3> Recent Purchase Input</h3>
                            <label htmlFor="auctName">
                                Auction:
                                <input type="text" name='auctionName' id='auctName' value={inputData.auctionName} placeholder='Auction Name' onChange={handleInputData} />
                            </label>
                            <label htmlFor="vPurch">
                                Make & Model / Type:
                                <input type="text" name='vechPurch' id='vPurch' value={inputData.vechPurch} placeholder='Vehicl Purchase' onChange={handleInputData} />
                            </label>
                            <label htmlFor="purchasePrice">
                                Price Purchase At:
                                <input type="text" name='purchPrice' id='purchasePrice' value={inputData.purchPrice} placeholder='Purchase Price' onChange={handleInputData} />
                            </label>
                            <label htmlFor="vYear">
                                Year:
                                <input type="text" name='vechiYear' id='vYear' value={inputData.vechiYear} placeholder='Vehicle Year' onChange={handleInputData}  />
                            </label>
                        </fieldset>
                        <button type='submit' className={transactionsstyle.purchBttn}>Add Purchase</button>
                    </form>
                </div>

                <div className={transactionsstyle.recenttransactionWrapper}>
                    <RecentTransactions />
                
                    <RecentSalesTransactions />
                </div>
            </div>
        </div>
    )
}

export default SalesTransactions