import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion, faPhone } from '@fortawesome/free-solid-svg-icons';


import Applyform from '../components/Applyform';
import Cobuyerform from '../components/Cobuyerform';
import Footer from "../components/Footer"

import applyonline from "../styles/applyonlinestyle.module.css"



const ApplyOnLine = () => {

    //Toogle between two components
    const[showApplyForm, setShowApplyForm] = useState(true)

    const toggleComponent = () => {
        setShowApplyForm(!showApplyForm)
    }

    return (
        <>
            <div className={applyonline.header}>
            </div>
            <div className={applyonline.headertext}>
                <h1> Apply OnLine </h1>
            </div>
            <div className={applyonline.formContainer}>

                <div className={applyonline.buyerCoBuyerWrapper}>
                    <p onClick={toggleComponent} style={{background: showApplyForm ? '#ec712e' : 'white'}}> Buyer</p>
                    <p onClick={toggleComponent} style={{background: !showApplyForm ? '#ec712e' : 'white'}} >Co-Buyer</p>
                </div>
                <hr style={{marginBottom: '1rem'}} />
                <div >
                    {showApplyForm ? <Applyform /> : <Cobuyerform />}
                </div>
            </div>
            <div className={applyonline.callUsWrapper}>
                <div className={applyonline.callUsIconWrapper}>
                    <FontAwesomeIcon icon={faCircleQuestion} /> <p>Have Questions? Call Today!</p>
                </div>
                <div className={applyonline.callUsPhoneNumberWrapper}>
                    <FontAwesomeIcon icon={faPhone} /> <p>470-552-2433</p>
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </>
    )
}

export default ApplyOnLine