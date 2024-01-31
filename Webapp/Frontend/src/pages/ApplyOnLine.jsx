import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion, faPhone } from '@fortawesome/free-solid-svg-icons';


import Applyform from '../components/Applyform';
import Cobuyerform from '../components/Cobuyerform';
import Footer from "../components/Footer"

import applyonline from "../styles/applyonlinestyle.module.css"
import axios from 'axios';



const ApplyOnLine = () => {

    const {id} = useParams()

    const [car, setCar] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://jdnsonsautobrokers.com/cardiscrip')
                const carinfo = response.data

                const filterCar = carinfo.filter((elem) => elem.id === parseInt(id));

                if(filterCar.length > 0) {
                    setCar(filterCar[0])
                }



            } catch (error) {
                console.log("error fetching cardata")
            }
        }
        fetchData()
    }, [id])




    //Toogle between two components
    const[showApplyForm, setShowApplyForm] = useState(true)

    const toggleComponent = () => {
        setShowApplyForm(!showApplyForm)
    }

    return (
        <div>
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
                    {showApplyForm ? <Applyform car={car} /> : <Cobuyerform />}
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
        </div>
    )
}

export default ApplyOnLine