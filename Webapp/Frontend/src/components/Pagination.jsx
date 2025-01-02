import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import AvailabilityModal from '../components/AvailabilityModal'
import ScrollToTopOnMount from '../components/ScrollToTopOnMont'



import inventorystyle from '../styles/inventorystyle.module.css'

const backendUrl = import.meta.env.VITE_BACKEND_URL



const Pagination = ({carDiscription, keyWordFilteredData}) => {

    //Use State for pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [carDiscriptionPerPage] = useState(5)


    // Determine which dataset to use
    const dataToPaginate = keyWordFilteredData.length > 0 ? keyWordFilteredData : carDiscription;

    //Get current cars info for pagination
    const indexOfLastCarInfos = currentPage * carDiscriptionPerPage
    const indexOfFirstCarInfos = indexOfLastCarInfos - carDiscriptionPerPage
    const currentCarInfos = dataToPaginate.slice(indexOfFirstCarInfos, indexOfLastCarInfos) 

    console.log("carinofs",currentCarInfos)


    //Pagination
    const pageNumbers = []

    const totalCars = dataToPaginate.length
    const carsPerPage = carDiscriptionPerPage
    
    for(let i = 1; i <= Math.ceil(totalCars / carsPerPage ); i++) {
        pageNumbers.push(i)
    }

    //Change page function
    const paginate = (numberElem) => {
        setCurrentPage(numberElem)
        window.scrollTo(0, 0); // Scroll to the top when changing the page
    }


    //Modals Logics
    const [openAvalModal, setOpenAvalModal] = useState(false)
    const [avaliData, setAvaliData] = useState()

    const handleAvailabilityModal = (elem) => {
        setOpenAvalModal(true);
        setAvaliData(elem);
    };


    return (
        <div>
            <ScrollToTopOnMount />

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
                {currentCarInfos.map((elem, _id) => (
                    <div key={_id} className={inventorystyle.carInfomainBox}>
                        <div className={inventorystyle.carDiscriptionContainer}>
                            <div className={inventorystyle.carDiscriptionImageWrapper}>
                                <NavLink to={`/ViewDetails/${elem._id}`}>
                                    {elem.carimages && (
                                        <>
                                            {elem.carimages.map((imageElem, index) => (
                                                // Check if it's the third image (index 2)
                                                index === 1 && (
                                                    <img
                                                        key={index}
                                                        src={`${backendUrl}/carimages/${imageElem}`}
                                                        alt="car"
                                                        width="100%"
                                                        height="100%"
                                                    />
                                                )
                                            ))}
                                        </>
                                    )}
                                </NavLink>
                            </div>
                            <div className={inventorystyle.carInfoWrapper}>
                                <div className={inventorystyle.carNameAndYearWrapper}>
                                    <h4>{elem.caryear}</h4>
                                    <h4>{elem.carname}</h4>
                                </div>
                                <div className={inventorystyle.otherDisCripContainer}>
                                    <div className={inventorystyle.smallSectionWrapper} style={{display: "flex"}}>
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
                            <NavLink to={`/ApplyOnLine/${elem.id}`}>
                                <button>APPLY ONLINE</button>
                            </NavLink>
                            <NavLink to={ `/ViewDetails/${elem.id}`}>
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

           
        </div>
    )
}

export default Pagination