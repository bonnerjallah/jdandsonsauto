import { useState, useEffect } from "react"
import axios from "axios"
import { NavLink, useParams } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons"

import Sidebar from '../components/Sidebar'

import inventmanastyle from '../style/inventmanastyle.module.css'

const backendUrl = import.meta.env.VITE_BACKEND_URL




const InventoryManagement = () => {

    const {id} = useParams()

    const [cars, setCars] = useState({
        sedan: [],
        truck: [],
        sport: [],
        suv: [],
    })

    const [allCars, setAllCars] = useState([])
    
        
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/getCarData`);
                const data = response.data;

                setAllCars(data)

                setCars((prevData) => {
                const updatedCars = { ...prevData };

                // Clear the arrays first
                updatedCars.sedan = [];
                updatedCars.truck = [];
                updatedCars.sport = [];
                updatedCars.suv = [];

                data.forEach((elem) => {
                    if (elem.trim && typeof elem.trim === "string") {
                        const lowerTrim = elem.trim.toLowerCase();

                        if (lowerTrim.includes("sedan")) {
                            updatedCars.sedan.push(elem.carname + ' ' + elem.caryear);
                        } else if (lowerTrim.includes("truck") || lowerTrim.includes('pickup')) {
                            updatedCars.truck.push(elem.carname + ' ' + elem.caryear);
                        } else if (lowerTrim.includes("sport")) {
                            updatedCars.sport.push(elem.carname + ' ' + elem.caryear);
                        } else if (lowerTrim.includes("suv") || lowerTrim.includes("van") || lowerTrim.includes("minivan")) {
                            updatedCars.suv.push(elem.carname + ' ' + elem.caryear);
                        }
                    }
                });

                return updatedCars;
            });

            } catch (error) {
                console.log("Error fetch data or images", error)
            }
        }

        fetchData()

    }, []);

    const [imageArray, setImageArray] = useState([])
    const [associatedData, setAssociatedData] = useState([]);


    //scroll function
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollRight, setScrollRight] = useState(0);
    
    const handleScroll = (direction) => {
        const scrollDelta = 230;
    
        if (direction === 'left') {
            setScrollLeft(scrollLeft - scrollDelta);
            setScrollRight(scrollRight + scrollDelta);
        } else if (direction === 'right') {
            setScrollLeft(scrollLeft + scrollDelta);
            setScrollRight(scrollRight - scrollDelta);
        }
    }


    return (
        <div className={inventmanastyle.mainContainer}>
            <div className={inventmanastyle.sidbardwrapper}>   
                <Sidebar />
            </div>
            <div className={inventmanastyle.InventoryManagementWrapper}>
                <div className={inventmanastyle.header}>
                    <h1>Inventory</h1>
                </div>
                <div className={inventmanastyle.addvehiclelink}>
                    <NavLink to="/AddNewVehicle">
                        <h3>Add New Vehicles</h3>
                    </NavLink>
                </div>

                <div className={inventmanastyle.stockList}>
                    <h2>Vehicles in stock:</h2>

                    <div className={inventmanastyle.scrollItemWrapper}>
                        {allCars.map((elem, id) => (
                            <NavLink key={id} to={`/vehicleUpdate/${elem._id}`} className={inventmanastyle.scrollItemLink}>
                            <div>
                                {/* Other content */}
                            </div>

                            <div key={id} className={inventmanastyle.scrollItem} style={{ transform: `translateX(${scrollLeft}px) translateX(-${scrollRight}px)` }}>
                                <div className={inventmanastyle.carImage}>
                                    {elem.carimages && elem.carimages[3] && (
                                        <img 
                                        src={`${backendUrl}/carimages/${elem.carimages[3]}`} 
                                        alt={`Image ${id}`} 
                                        width={250} 
                                        height={200} 
                                        />
                                    )}
                                </div>
                                <div>
                                <h3>{elem.carname}</h3>
                                <p>{elem.caryear}</p>
                                </div>
                            </div>
                            </NavLink>
                        ))}
                    </div>


                </div>

                <div className={inventmanastyle.scrollbuttonswrapper}>
                    <FontAwesomeIcon icon={faAnglesLeft} className={inventmanastyle.scrollButtonLeft}  onClick={() => handleScroll('right')} />
                    <FontAwesomeIcon icon={faAnglesRight} className={inventmanastyle.scrollButtonRight} onClick={() => handleScroll('left')} />
                </div>

                <div className={inventmanastyle.otherVehicleList}>
                    <div className={inventmanastyle.lowStock}>
                        <div className={inventmanastyle.h3header}>
                            <h3>SEDANS<span>
                                {cars.sedan.length === 0
                                    ? <span className={inventmanastyle.outstock}>Out of Stocked Vehicle</span>
                                    :cars.sedan.length < 3
                                    ? <span className={inventmanastyle.lowstock}>Low Stocked Vehicle({cars.sedan.length})</span>
                                    : <span className={inventmanastyle.instock}>({cars.sedan.length})</span>}
                                </span>
                            </h3>
                        </div>
                        <div className={inventmanastyle.inventoryListWrapper}>
                            <ul>
                                {cars.sedan.length > 0 ? (
                                    cars.sedan.map((value, index) => (
                                        
                                        <li key={index}className={inventmanastyle.carSpec}>
                                            {value}
                                        </li>
                                    ))
                                ): <p>No Sedans found</p> }
                            </ul>
                        </div>
                    </div>

                    <div className={inventmanastyle.outOfStockList}>
                        <div className={inventmanastyle.h3header}>
                            <h3>SPORTS <span>
                                {cars.sport.length === 0
                                    ? <span className={inventmanastyle.outstock}>Out of Stocked Vehicle</span>
                                    :cars.sport.length < 3 
                                    ? <span className={inventmanastyle.lowstock}>Low Stocked Vehicle ({cars.sport.length})</span>
                                    : <span className={inventmanastyle.instock}>({cars.sport.length})</span>
                                }
                                </span>
                            </h3>
                        </div>
                        <div className={inventmanastyle.inventoryListWrapper}>
                            <ul>
                                {cars.sport.length > 0 ? (
                                    cars.sport.map((value, id) => (
                                        
                                        <li key={id}className={inventmanastyle.carSpec}>
                                            {value}
                                        </li>
                                    ))
                                ): <p>No Sports Car found</p> }
                            </ul>
                        </div>
                    </div>

                    <div className={inventmanastyle.mostStockList}>
                        <div className={inventmanastyle.h3header}>
                            <h3>TRUCKS <span>
                                {cars.truck.length === 0
                                    ? <span className={inventmanastyle.outstock}>Out of Stocked Vehicle</span>
                                    :cars.truck.length < 3 
                                    ? <span className={inventmanastyle.lowstock}>Low Stocked Vehicle ({cars.truck.length})</span>
                                    : <span className={inventmanastyle.instock}>({cars.truck.length})</span>
                                }
                                </span>
                            </h3>
                        </div>
                        <div className={inventmanastyle.inventoryListWrapper}>
                            <ul>
                                {cars.truck.length > 0 ? (
                                    cars.truck.map((elem, index) => (
                                        <li key={index}className={inventmanastyle.carSpec}>
                                            {elem}
                                        </li>
                                    ))
                                ) : <p>No Trucks Found</p>}
                            </ul>
                        </div>

                    </div>
                    <div className={inventmanastyle.mostStockList}>
                        <div className={inventmanastyle.h3header}>
                            <h3>SUV & VANS
                                <span>
                                    {cars.suv.length === 0
                                        ? <span className={inventmanastyle.outstock}>Out of Stocked Vehicle</span>
                                        :cars.suv.length < 3 
                                        ? <span className={inventmanastyle.lowstock}>Low Stocked Vehicle ({cars.suv.length})</span>
                                        : <span className={inventmanastyle.instock}>({cars.suv.length})</span>
                                    }
                                </span>
                            </h3>
                        </div>
                        <div className={inventmanastyle.inventoryListWrapper}>
                            <ul>
                                {cars.suv.length > 0 ? (
                                    cars.suv.map((elem, index) => (
                                        <li key={index}className={inventmanastyle.carSpec}>
                                            {elem}
                                        </li>
                                    ))
                                ): <p>No SUVs or Vans Found</p>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InventoryManagement