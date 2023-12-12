import { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import Footer from "../components/Footer"
import Filter from '../components/Filter'
import ScrollToTopOnMont from '../components/ScrollToTopOnMont'
import KeywordFilter from '../components/KeywordFilter'
import Pagination from '../components/Pagination'

import inventorystyle from '../styles/inventorystyle.module.css'



const InventoryPage = () => {

    //Use State for fetching data and images
    const [carDiscription, setCarDiscription] = useState([])

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


    //Keword filter data callback function logic
    const [keyWordFilteredData, setFilterData] = useState([])

    // Callback function to receive filtered data from KeywordFilter
    const keyWordFilterAndPaginate = (keyWordFilteredData) => {
        setFilterData(keyWordFilteredData)
    }




    //Side bar Filter callbacks function logic
    const [sideFilters, setSideFilter] = useState([])

    //calback function for sidebar filter
    const sidebarFilterData = (sideFilters) => {
        setSideFilter(sideFilters)
    }

    const [filterByMiles, setfilterByMiles] = useState([])

    const filterByMilesData = (filterByMiles) => {
        setfilterByMiles(filterByMiles)
    }


    return (
        <div>
            <ScrollToTopOnMont />

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
                    <KeywordFilter  carDiscription={carDiscription} keyWordFilterAndPaginate={keyWordFilterAndPaginate} sideFilters={sideFilters} filterByMiles={filterByMiles} />
                </div>

                <div className={inventorystyle.mainContainer}>
                    <div>
                        <Filter carDiscription={carDiscription} sidebarFilterData={sidebarFilterData} filterByMilesData={filterByMilesData} />
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