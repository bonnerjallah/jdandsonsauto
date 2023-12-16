import { useState } from 'react';
import axios from 'axios';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion, faPhone } from '@fortawesome/free-solid-svg-icons';


import Footer from "../components/Footer"

import applyonline from "../styles/applyonlinestyle.module.css"
import carfinderstyle from "../styles/carfinderstyle.module.css"



const CarFinder = () => {



    const [vehicleFinder, setVehicleFinder] = useState({
        searchyear: '',
        searchmake: '',
        searchmodal: '',
        searchmileage: '',
        searchprice: '',
        desiredfeature: '',
        searchcustname: '',
        searchcustphone: '',
        searchcustemail: '',
        searchreachyou: '',
    })

    const handleSearchInput = (e) => {
        e.preventDefault()
        const {name, value} = e.target

        setVehicleFinder((prevData) => ({
            ...prevData, 
            [name]: value 
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3001/carfinder", vehicleFinder, {
                headers: {'Content-Type': "application/json"}
            })

            if(response.status === 200) {
                setVehicleFinder({
                    
                    searchyear: '',
                    searchmake: '',
                    searchmodal: '',
                    searchmileage: '',
                    searchprice: '',
                    desiredfeature: '',
                    searchcustname: '',
                    searchcustphone: '',
                    searchcustemail: '',
                    searchreachyou: '',
                })

            } else {
                console.log("Error sending search data", response.data)
            }
            
        } catch (error) {
            console.error("Error sending search data", error)
            if (error.response) {
                console.log("Error response", error.response.data)
            }
        }
    }







    return (
        <div>
            <div className={carfinderstyle.header}>

            </div>
            <div className={carfinderstyle.headerWrapper}>
                <h1>CAR FINDER</h1>
            </div>

            <div className={carfinderstyle.mainContainer}>
                <form onSubmit={handleSubmit} >

                    <fieldset className={carfinderstyle.searchWrapper} >
                        <h4>VEHICLE INFORMATION</h4>

                        <label htmlFor="searchcaryear"></label>
                        <input type="text" name="searchyear" id="searchcaryear" placeholder="Year" onChange={handleSearchInput} />
                        
                        <label htmlFor="searchcarmake"></label>
                        <input type="text" name="searchmake" id="searchcarmake" placeholder="Make" onChange={handleSearchInput}  />

                        <label htmlFor="searchcarmodal"></label>
                        <input type="text" name="searchmodal" id="searchcarmodal" placeholder="Model" onChange={handleSearchInput}  />

                        <label htmlFor="searchcarmileage"></label>
                        <input type="number" name="searchmileage" id="searchcarmileage" placeholder="Mileage" onChange={handleSearchInput}  />
                    </fieldset>

                    <fieldset className={carfinderstyle.desiredWrapper} >
                        <h4>DESIRED VEHICLE</h4>
                        
                        <label htmlFor="searchcarprice"></label>
                        <select name="searchprice" id="searchcarprice" onChange={handleSearchInput} >
                            <option value="">Price Range</option>
                            <option value="$0 - $5000">$0 - $5,000</option>
                            <option value="$5000 - $10000">$5,000 - $10,000</option>
                            <option value="$10000 - $15,000">$10,000 - $15,000</option>
                            <option value="$15000 - $20,000">$15,000 - $20,000</option>
                        </select>

                        <textarea name="desiredfeature" id="" cols="30" rows="10" placeholder="Desired Features" onChange={handleSearchInput}  ></textarea>
                    </fieldset>

                    <fieldset className={carfinderstyle.reachYouWrapper} >
                        <h4>HOW DO WE REACH YOU</h4>

                        <div>
                            <label htmlFor="searchcustomername"></label>
                            <input type="text" name="searchcustname" id="searchcustomername" placeholder="Name" onChange={handleSearchInput}  />

                            <label htmlFor="searchcustomerphone"></label>
                            <input type="text" name="searchcustphone" id="searchcustomerphone" placeholder="Phone" onChange={handleSearchInput}  />

                            <label htmlFor="searchcustomeremail"></label>
                            <input type="text" name="searchcustemail" id="searchcustomeremail" placeholder="Email" onChange={handleSearchInput}  />
                        </div>

                        <textarea name="searchreachyou" id="" cols="30" rows="10" placeholder="Comments" onChange={handleSearchInput}></textarea>
                    </fieldset>

                    <p>By clicking "SUBMIT", I consent to be contacted by the dealer at any telephone number or Email I provide, including, without limitation, communications sent via text message to my cell phone or communications sent using an autodialer or prerecorded message. This acknowledgment constitutes my written consent to receive such communications. I have read and agree to the Privacy Policy of this dealer.</p>

                    <button>Submit</button>
                </form>
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

export default CarFinder