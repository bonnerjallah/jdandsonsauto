import { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import Footer from "../components/Footer"

import inventorystyle from '../styles/inventorystyle.module.css'
import AvailabilityModal from '../components/AvailabilityModal'

const Inventory = () => {
    
    //Use State for fetching data and images
    const [carDiscription, setCarDiscription] = useState([])

    //Use State for pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [carDiscriptionPerPage] = useState(5)

    //Get current cars info for pagination
    const indexOfLastCarInfos = currentPage * carDiscriptionPerPage
    const indexOfFirstCarInfos = indexOfLastCarInfos - carDiscriptionPerPage
    const currentCarInfos = carDiscription.slice(indexOfFirstCarInfos, indexOfLastCarInfos)

    //Pagination
    const pageNumbers = []

    const totalCars = carDiscription.length
    const carsPerPage = carDiscriptionPerPage
    
    for(let i = 1; i <= Math.ceil(totalCars / carsPerPage ); i++) {
        pageNumbers.push(i)
    }

    //Change page function
    const paginate = (numberElem) => {
        setCurrentPage(numberElem)
    }


    useEffect(() => {
        const fetchData = async () => {
            try {    
                // Fetch car details
                const response = await axios.get('http://localhost:3001/cardiscrip');
                const vehicleDiscriptionData = response.data;
    
                // Format miles and priceamount properties for each car
                const formatedDataWithCommas = vehicleDiscriptionData.map((vehicleElem) => {
                    // Format miles property
                    vehicleElem.miles = parseFloat(vehicleElem.miles).toLocaleString();
    
                    // Format priceamount property
                    vehicleElem.priceamount = parseFloat(vehicleElem.priceamount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    });
    
                    return vehicleElem;
                });
    
                const carInformation = formatedDataWithCommas;
    
                // Fetch car Images
                const imagesResponse = await axios.get('http://localhost:3001/carImages');
                const carImage = imagesResponse.data;
    
                // Combine data
                const combinedData = carInformation.map((carElem) => {
                    const imagesForCar = carImage.filter((imageElem) => imageElem.car_id === carElem.id);
                    carElem.images = imagesForCar;
                    return carElem;
                });
    
                setCarDiscription(combinedData);
    
            } catch (error) {
                console.error("Error fetching car discription from database", error);
            }
        };
    
        fetchData();
    }, []);


    //Modals Logics
    const [openAvalModal, setOpenAvalModal] = useState(false)
    const [avaliData, setAvaliData] = useState()

    const handleAvailabilityModal = (elem) => {
        setOpenAvalModal(true);
        setAvaliData(elem);
    };


    


    return (
        <div>
            <div className={inventorystyle.headerContainer}>
                <div className={inventorystyle.header}>
                </div>
                <div className={inventorystyle.headericonWrapper}>
                    <h1>INVENTORY</h1>
                    <div className={inventorystyle.filterOptionIcon}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> <p style={{fontSize: '1rem', fontWeight: 'bold'}}>FILTER OPTIONS</p>
                    </div>
                </div>
            </div>

            <main>
                <div className={inventorystyle.KeywordSearchBarAndSortByContainer}>
                    <div className={inventorystyle.searchBarWrapper}>
                        <input type="text" name='keywordSearch' placeholder='Keyword Search' />
                    </div>
                    <div className={inventorystyle.pageSizeAndSortWrapper}>
                        <div className={inventorystyle.sortByWrapper}>
                            <p>Sort By</p>
                            <select>
                                <option value="Default">Default</option>
                                <option value="Price: Low - High">Price: Low - High</option>
                                <option value="Price: High - Low">Price: High - Low</option>
                                <option value="Miles: Low - High">Miles: Low - High</option>
                                <option value="Miles: High - Low">Miles: High - Low</option>
                                <option value="Year: Old - New">Year: Old - New</option>
                                <option value="Year: New - Old">Year: New - Old</option>
                                <option value="Make: A-Z">Make: A-Z</option>
                                <option value="Make: Z-A">Make: Z-A</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={inventorystyle.mainContainer}>
                    <div className={inventorystyle.filterContainer}>
                        <div className={inventorystyle.yearFilterWrapper}>
                            <h3>Year</h3>
                            <hr style={{color:'black'}} />
                            <div className={inventorystyle.filterTypeWrapper}>
                                <div>
                                    <p>2020</p>
                                </div>
                                <div>
                                    <p>2</p>
                                </div>
                            </div>
                            <button>View More...</button>
                        </div>
                        <div className={inventorystyle.makeModelFilterWrapper}>
                            <h3>Make / Model</h3>
                            <hr style={{color:'black'}} />
                            <div className={inventorystyle.filterTypeWrapper}>
                                <div>
                                    <p>CHRYSLER</p>
                                </div>
                                <div>
                                    <p>2</p>
                                </div>
                            </div>
                            <button>View More...</button>
                        </div>
                        <div className={inventorystyle.DrivetrainFilterWrapper}>
                            <h3>Drivetrain</h3>
                            <hr style={{color:'black'}} />
                            <div className={inventorystyle.filterTypeWrapper}>
                                <div>
                                    <p>4WD</p>
                                </div>
                                <div>
                                    <p>2</p>
                                </div>
                            </div>

                        </div>
                        <div className={inventorystyle.transmissionFilterWrapper}>
                            <h3>Transmission</h3>
                            <hr style={{color:'black'}} />
                            <div className={inventorystyle.filterTypeWrapper}>
                                <div>
                                    <p>AUTOMATIC</p>
                                </div>
                                <div>
                                    <p>4</p>
                                </div>
                            </div>
                        </div>
                        <div className={inventorystyle.mileageFilterWrapper}>
                            <h3>Mileage</h3>
                            <hr style={{color:'black'}} />
                            <div className={inventorystyle.filterTypeWrapper}>
                                <div>
                                    <p>0 - $10,000</p>
                                </div>
                                <div>
                                    <p>3</p>
                                </div>
                            </div>
                            <button>View More...</button>
                        </div>
                        <div className={inventorystyle.bodyTypeFilterWrapper}> 
                            <h3>Body Type</h3>
                            <hr style={{color:'black'}} />
                            <div className={inventorystyle.filterTypeWrapper}>
                                <div>
                                    SUV
                                </div>
                                <div>
                                    <p>5</p>
                                </div>
                            </div>
                        </div>
                        <div className={inventorystyle.priceRangeWrapper}>
                            <h3>Price Range</h3>
                            <hr style={{color:'black'}} />
                            <div className={inventorystyle.filterTypeWrapper}>
                                <div>
                                    <p>$ - $5,000</p>
                                </div>
                                <div>
                                    <p>2</p>
                                </div>
                            </div>
                        </div>
                        <button>
                            RESET FILTERS
                        </button>
                    </div>
                    <div>
                        <div className={inventorystyle.paginationListWrapper}>
                            <div>
                                <p>Page {currentPage} of {Math.ceil(totalCars / carsPerPage)} 
                                    <span style={{marginLeft: '.3rem'}}>({carDiscription.length} vehicles)</span>
                                </p>
                            </div>
                            <div className={inventorystyle.paginationPagesList}>
                                {pageNumbers.map( numberElem => (
                                    <li
                                        key={numberElem}
                                        style={{
                                        backgroundColor: currentPage === numberElem ? "#4d2d1c" : "",
                                        border: currentPage === numberElem ? "1px solid #ec712e" : "",
                                        cursor: 'pointer',
                                        }}
                                        onClick={() => paginate(numberElem)}
                                    >
                                        {numberElem}
                                    </li>
                                ))}
                            </div>
                        </div>

                        <div>
                            {currentCarInfos.map((elem, id) => (
                                <div key={id} className={inventorystyle.carInfomainBox}>

                                    <div className={inventorystyle.carDiscriptionContainer}>
                                        <div className={inventorystyle.carDiscriptionImageWrapper}>
                                            <NavLink to="/ViewDetails">
                                                {elem.images && elem.images
                                                    .filter((image) => image.car_id === elem.id)  // Filter images based on car_id
                                                    .slice(3, 4)  // Take only the forth image
                                                    .map((filteredImage, index) => (
                                                    <img key={index} src={`http://localhost:3001/carImages/${filteredImage.image_url}`} alt={`Image ${index}`} width="100%" height="100%" />
                                                ))}
                                            </NavLink>
                                        </div>
                                        <div className={inventorystyle.carInfoWrapper}>
                                            <div className={inventorystyle.carNameAndYearWrapper}>
                                                <h4>{elem.caryear}</h4>
                                                <h4>{elem.carname}</h4>
                                            </div>
                                            <div className={inventorystyle.otherDisCripContainer}>
                                                <div style={{display: "flex"}}>
                                                    <div className={inventorystyle.smallSection}>
                                                        <small>Drivetrain</small>
                                                        <p>{elem.drivetrain}</p>
                                                    </div>
                                                    <div className={inventorystyle.smallSection}>
                                                        <small>Transmission</small>
                                                        <p>{elem.transmiss}</p>
                                                    </div>
                                                    <div className={inventorystyle.smallSection}>
                                                        <small>Engine</small>
                                                        <p>{elem.engine}</p>
                                                    </div>
                                                    <div className={inventorystyle.smallSection}>
                                                        <small>Mileage</small>
                                                        <p>{elem.miles}</p>
                                                    </div>
                                                    <div className={inventorystyle.smallSection}>
                                                        <small>Doors</small>
                                                        <p>{elem.doors}</p>
                                                    </div>

                                                    <div className={inventorystyle.priceAmountWrapper}>
                                                        <h2>$ {elem.priceamount}</h2>
                                                    </div>
                                                </div>
                                                <div className={inventorystyle.bottomDisCripContainer}>
                                                    <div className={inventorystyle.vinAndStockWrapper}>
                                                        <small>VIN</small>
                                                        <p>{elem.vinnum}</p>
                                                    </div>
                                                    <div className={inventorystyle.vinAndStockWrapper}>
                                                        <small>Stock Number</small>
                                                        <p>{elem.stocknum}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => handleAvailabilityModal(elem)}>CONFIRM AVAILABILITY</button>
                                        <button onClick={() => handleAvailabilityModal(elem)} >REQUEST A QUOTE</button>
                                        <NavLink to="/ApplyOnLine">
                                            <button>APPLY ONLINE</button>
                                        </NavLink>
                                        <NavLink to='/ViewDetails'>
                                            <button>VIEW DETAILS</button>
                                        </NavLink>
                                    </div>
                                </div> 
                            ))}
                        </div>

                        {openAvalModal && ( <AvailabilityModal avaliData={avaliData} closeAvilModal={setOpenAvalModal} /> )}


                        <div className={inventorystyle.paginationListWrapper}>
                            <div>
                                <p>Page {currentPage} of {Math.ceil(totalCars / carsPerPage)} 
                                    <span style={{marginLeft: '.3rem'}}>({carDiscription.length} vehicles)</span>
                                </p>
                            </div>
                            <div className={inventorystyle.paginationPagesList}>
                                {pageNumbers.map( numberElem => (
                                    <li
                                        key={numberElem}
                                        style={{
                                        backgroundColor: currentPage === numberElem ? "#4d2d1c" : "",
                                        border: currentPage === numberElem ? "1px solid #ec712e" : "",
                                        cursor: 'pointer',
                                        }}
                                        onClick={() => paginate(numberElem)}
                                    >
                                        {numberElem}
                                    </li>
                                ))}
                            </div>
                        </div>

                        <div className={inventorystyle.recentlyViewedContainer}>
                            <h2>RECENTLY VIEWED</h2>
                            <div>

                            </div>
                        </div>

                    </div>
                </div>
            </main>
            

            <div>
                <Footer />
            </div>

        </div>
    )
}

export default Inventory