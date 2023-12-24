import { useState, useEffect, useMemo} from 'react'

import inventorystyle from '../styles/inventorystyle.module.css'

const KeywordFilter = ({carDiscription, keyWordFilterAndPaginate, sideFilters, filterByMiles, filterByPrice}) => {

    //KeyWord search logic
    const [keyWordValue, setKeyWordValue] = useState('')

    const handleKeyWordSearch = (e) => {
        const { value } = e.target;

        setKeyWordValue(value)
    }


    //Sorting data logic
    const [sortedCars, setSortedCars] = useState([])

    const handleSortChange = (e) => {
        const sortBy = e.target.value;
    
        const newSortedCars = carDiscription.slice().sort((a, b) => {
            switch (sortBy) {
                case "Price: Low - High":
                    return parseFloat(a.priceamount) - parseFloat(b.priceamount);
    
                case "Price: High - Low":
                    return parseFloat(b.priceamount) - parseFloat(a.priceamount);
    
                case "Miles: Low - High":
                    return parseFloat(a.miles) - parseFloat(b.miles)
    
                case "Miles: High - Low":
                    return parseFloat(b.miles) - parseFloat(a.miles)
    
                case "Year: Old - New":
                    return a.caryear.localeCompare(b.caryear);
    
                case "Year: New - Old":
                    return b.caryear.localeCompare(a.caryear);
    
                case "Make: A-Z":
                    return a.carname.localeCompare(b.carname);
    
                case "Make: Z-A":
                    return b.carname.localeCompare(a.carname);
    
                default:
                    return 0;
            }
        });

        setSortedCars(newSortedCars)
    };


    const filteredData = useMemo(() => {
        return carDiscription.filter(
            (elem) => elem.carname.toLowerCase().includes(keyWordValue.toLowerCase())
        );
    }, [keyWordValue, carDiscription]);
    
    useEffect(() => {
        // If sorting is applied, use the sorted data
        const finalData = sortedCars.length > 0 ? sortedCars :
                        sideFilters.length > 0 ? sideFilters :
                        filterByMiles.length > 0 ? filterByMiles :
                        filterByPrice.length > 0 ? filterByPrice :
        filteredData;

    
    
        // Pass the filtered and sorted data to the parent component
        keyWordFilterAndPaginate(finalData);
    
    }, [sortedCars, sideFilters, filterByMiles, filteredData, filterByPrice]);
    

    


    return (
        <>
            <div className={inventorystyle.searchBarWrapper}>
                <input type="text" name='keywordSearch' onChange={handleKeyWordSearch} placeholder='Keyword Search' />
            </div>
            <div className={inventorystyle.pageSizeAndSortWrapper}>
                <div className={inventorystyle.sortByWrapper}>
                    <p>Sort By</p>
                    <select onChange={handleSortChange}>
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
        </>
    )
}

export default KeywordFilter