import { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import Footer from "../components/Footer"
import Filter from '../components/Filter'
import ScrollToTopOnMount from '../components/ScrollToTopOnMont'
import KeywordFilter from '../components/KeywordFilter'
import Pagination from '../components/Pagination'

import inventorystyle from '../styles/inventorystyle.module.css'


const backendUrl = import.meta.env.VITE_BACKEND_URL


const InventoryPage = () => {

    //Use State for fetching data and images
    const [carDiscription, setCarDiscription] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {    
                // Fetch car details
                const response = await axios.get(`${backendUrl}/getCarData`);
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
    
                setCarDiscription(formatedDataWithCommas);
    
            } catch (error) {
                console.error("Error fetching car discription from database", error);
            }
        };

    fetchData();
    }, []);



    //Keword filter data callback function logic
    const [keyWordFilteredData, setFilterData] = useState([])

    // Callback function to receive filtered data from KeywordFilter
    const keyWordFilterAndPaginate = (keyWordFilteredData) => {
        setFilterData(keyWordFilteredData)
    }


    //Side bar Filter callbacks functions logic

    //calback function for sidebar year, make/model, drivetrain, transmission filter
    const [sideFilters, setSideFilter] = useState([])

    const sidebarFilterData = (sideFilters) => {
        setSideFilter(sideFilters)
    }

    //callback function for sidebar milleage filter
    const [filterByMiles, setfilterByMiles] = useState([])

    const filterByMilesData = (filterByMiles) => {
        setfilterByMiles(filterByMiles)
    }

    //callback function for sidebar price filter
    const [filterByPrice, setFilterByPrice] = useState([])

    const filterByPriceData = (filterByPrice) => {
        setFilterByPrice(filterByPrice)
    }


    return (
        <div>
            <ScrollToTopOnMount />

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
                    <KeywordFilter  carDiscription={carDiscription} keyWordFilterAndPaginate={keyWordFilterAndPaginate} sideFilters={sideFilters} filterByMiles={filterByMiles} filterByPrice={filterByPrice} />
                </div>

                <div className={inventorystyle.mainContainer}>
                    <div className={inventorystyle.sidebarfilterWrapper}>
                        <Filter carDiscription={carDiscription} sidebarFilterData={sidebarFilterData} filterByMilesData={filterByMilesData} filterByPriceData={filterByPriceData} />
                    </div>

                    <div>
                        <Pagination carDiscription={carDiscription} keyWordFilteredData={keyWordFilteredData}  />
                    </div>
                </div>
            </main>
            

            <div>
                <Footer />
            </div>

        </div>
    )
}

export default InventoryPage