import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator } from '@fortawesome/free-solid-svg-icons'

import Footer from "../components/Footer"

import viewdetailsstyle from '../styles/viewdetailsstyle.module.css'

const ViewDetails = () => {
    return (
        <>
            <div>
                <NavLink to="/InventoryPage">
                    <h4 style={{color: '#ec712e', margin: "1rem"}}>Back to listing</h4>
                </NavLink>
            </div>
            <div className={viewdetailsstyle.mainContainer}>
                
                <div className={viewdetailsstyle.headerContainer}>
                    <div className={viewdetailsstyle.vehicleYearMakeAndModalWrapper}>
                        <p>car year</p>
                        <p>car make & modal</p>
                    </div>
                    <div className={viewdetailsstyle.vehiclePriceWrapper}>
                        <p>car Price</p>
                    </div>
                </div>

                <div className={viewdetailsstyle.discripImageAndCalContainer}>
                    <div className={viewdetailsstyle.dispriptionWrapper}>
                        <p>Year: <span>car year</span></p>
                        <p>Make: <span>car make</span></p>
                        <p>Modal: <span>car Modal</span></p>
                        <p>Trim: <span>car trim</span></p>
                        <p>Drivetrain: <span>car drivetrain</span></p>
                        <p>Transmission: <span>Automatic</span></p>
                        <p>Engine: <span>car egine</span></p>
                        <p>Mileage: <span>car miles</span></p>
                        <p>Doors: <span>car doors</span></p>
                        <p>Exterior Color: <span>ext color</span></p>
                        <p>Interior Color: <span>int color</span></p>
                        <p>VIN: <span>vin number</span></p>
                        <p>Stock No: <span>stock no</span></p>
                    </div>
                    <div className={viewdetailsstyle.imageWrapper}>
                        <div>
                            <p>large image goes here</p>
                        </div>
                        <div className={viewdetailsstyle.lillImagesWrapper}>
                            little images
                        </div>
                    </div>
                    <div className={viewdetailsstyle.calWrapper}>
                        <form action="">
                            <h2 style={{backgroundColor: "#ec712e", padding: '.5rem'}}>Payment Calculator</h2>
                            <hr />

                            <h4>Vehicle Price</h4>
                            <div className={viewdetailsstyle.inputWrapper}>
                                <label htmlFor="vehiclePrice">$ </label><input type="text" name="vehiprice" id="vehiclePrice" />
                            </div>

                            <h4>Down Payment</h4>
                            <div className={viewdetailsstyle.inputWrapper}>
                                <label htmlFor="downpaymnt">$ </label><input type="number" name='vehidownpayment' id='downpaymnt' />
                            </div>

                            <div>
                                <h4>Term</h4>
                                <label htmlFor="term"></label> <input type="number" name="paymntterm" id="term" />
                            </div>
                            

                            <h4>APR</h4>
                            <div className={viewdetailsstyle.inputWrapper}>
                                <input type="number" name="aprnum" id="apr" /><label htmlFor="apr">%</label>
                            </div>

                            <button> <FontAwesomeIcon icon={faCalculator} /> CALCULATE PAYMENT</button>
                        </form>
                    </div>
                </div>

                <div className={viewdetailsstyle.buttonAndEquipContainer}>
                    <div className={viewdetailsstyle.buttonWrapper}>
                        <button>REQUEST A QUOTE</button>
                        <button>CONFIRM AVAILABILITY</button>
                        <button>SCHEDULE A TEST DRIVE</button>
                        <button>APPLY ONLINE</button>
                    </div>


                    <div className={viewdetailsstyle.equipAndSimilarContainer}>
                        <div className={viewdetailsstyle.equipmentListWrapper}>
                            <div>
                                <h3>Vehicle Equipment List</h3>
                            </div>
                            equip goes here
                        </div>

                        <div className={viewdetailsstyle.similarVehicleWrapper}>
                            <h3>Similar Vehicle</h3>
                            <div className={viewdetailsstyle.simiVehicleImageWrapper}>
                                images goes here
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default ViewDetails