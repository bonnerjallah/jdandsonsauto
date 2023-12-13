import { useState, useEffect, useRef } from 'react';
import filterstyle from '../styles/filterstyle.module.css'

import { isEqual } from 'lodash';



const Filter = ({carDiscription, sidebarFilterData, filterByMilesData, filterByPriceData}) => {

    const [yearExpended, setyearExpended] = useState(false)
    const [makeExpended, setmakeExpended] = useState(false)
    const [milesExpended, setmilesExpended] = useState(false)
    const [priceExpended, setpriceExpended] = useState(false)

    const handleYearExpend = () => {
        setyearExpended(!yearExpended)
    }

    const handleMakeExpent = () => {
        setmakeExpended(!makeExpended)
    }

    const handleMilesExpended = () => {
        setmilesExpended(!milesExpended)
    }

    const handlePriceExpended = () => {
        setpriceExpended(!priceExpended)
    }

    const handleResetFilters = () => {
        window.location.reload();
    };

    //Year count
    const yearCount = carDiscription.reduce((acc, elem) => {
        const {caryear} = elem;
        acc[caryear] = (acc[caryear] || 0) + 1;
        return acc
    }, {})

    //make and modal count
    const makeAndModal = carDiscription.reduce((acc, elem) => {
        const carnameFirstWord = elem.carname.split(' ')[0];
        acc[carnameFirstWord] = (acc[carnameFirstWord] || 0) + 1;
        return acc;
    }, {});
    
    //drivetrain count
    const drivetrainCount = carDiscription.reduce((acc, elem) => {
        const drivetrain = elem.drivetrain;
        acc[drivetrain] = (acc[drivetrain] || 0) + 1;
        return acc;
    }, {});
    
    //Transmission count
    const transmissionCount = carDiscription.reduce((acc, elem) => {
        const transmission = elem.transmiss;
        acc[transmission] = (acc[transmission] || 0) + 1
        return acc
    }, {})


    // Miles sorting
    const lessThanFifty = [];
    const fiftySixty = [];
    const sixtySeventy = [];
    const seventyEighty = [];
    const eightyNinety = [];
    const ninetyHundred = [];
    const oneTwentyOneThirty = [];
    const oneThirtyOneForty = [];
    const oneFortyOneFifty = [];
    const overOneFifty = []

    const milesArray = carDiscription.map((car) => {
        const miles = parseInt(car.miles.replace(/,/g, ''), 10); // Convert to number, remove commas

        if (miles <= 50000) {
            lessThanFifty.push(miles);
        } else if (miles > 50000 && miles <= 60000) {
            fiftySixty.push(miles);
        } else if (miles > 60000 && miles <= 70000) {
            sixtySeventy.push(miles);
        } else if (miles > 70000 && miles <= 80000) {
            seventyEighty.push(miles);
        } else if (miles > 80000 && miles <= 90000) {
            eightyNinety.push(miles);
        } else if (miles > 90000 && miles <= 100000) {
            ninetyHundred.push(miles);
        } else if (miles > 100000 && miles <= 120000) {
            oneTwentyOneThirty.push(miles);
        } else if (miles > 120000 && miles <= 130000) {
            oneThirtyOneForty.push(miles);
        } else if (miles > 130000 && miles <= 140000) {
            oneFortyOneFifty.push(miles);
        } else {
            overOneFifty.push(miles)
        }
    });

    //Amount sorting
    const fiveThousandOrLess = []
    const fiveToTenThousand = []
    const tenToFifteenThousand = []
    const fifteenToTwentyThousand = []
    const twentyToThirtyThousand = []
    const thirtyToFortyThousannd = []
    const fortyToFiftyThousand = []
    const overFiftyThousand = []

    const carAmount = carDiscription.map((elem) => {
        const amount = parseInt(elem.priceamount.replace(/,/g, ""), 10)
        if(amount < 5000) {
            fiveThousandOrLess.push(amount)
        } else if(amount >= 5000 && amount <= 10000 ) {
            fiveToTenThousand.push(amount)
        } else if (amount > 10000 && amount <= 15000 ) {
            tenToFifteenThousand.push(amount)
        } else if (amount > 15000 && amount <= 20000) {
            fifteenToTwentyThousand.push(amount)
        } else if (amount > 20000 && amount <= 30000) {
            twentyToThirtyThousand.push(amount)
        } else if(amount > 30000 && amount <= 40000) {
            thirtyToFortyThousannd.push(amount)
        } else if (amount > 40000 && amount <= 50000) {
            fortyToFiftyThousand.push(amount)
        } else (
            overFiftyThousand.push(amount)
        )
    })



    const filterByData = (target) => {
        return target.textContent;
    };
    
    const handleFilterByClick = (e) => {
        e.preventDefault();
    
        console.log("clicked data", e.target);
        
        // Use filterByData with the clicked element
        const filterValue = filterByData(e.target).toLowerCase().trim();
    
        console.log("to lower", filterValue);
    
        // Filter the data based on the selected value
        const filtered = carDiscription.filter((elem) => {
            const carNameWords = elem.carname.toLowerCase().split(' ');
            const  drivetrain = elem.drivetrain.toLowerCase();
            const transmiss = elem.transmiss.toLowerCase();

            // Return the element itself if none of the conditions match
            return (
                elem.caryear === filterValue ||
                carNameWords[0] === filterValue ||
                drivetrain === filterValue ||
                transmiss === filterValue 
            );
        });
    
        // Pass the filtered data to the parent component
        sidebarFilterData(filtered);
    };
    



    //Milage Filter logic
    const milesFilterBy = (target) => {
        const fullText = target.textContent.toLowerCase();
        const filteredMiles = fullText.slice(0, fullText.indexOf('<')).replace(/,/g, '').trim();
        return filteredMiles;
    };
    
    const handleMilesCLick = (e) => {
        e.preventDefault(e)

        const filterMilesValue = milesFilterBy(e.target)

        console.log("filter miles", filterMilesValue)


        const cars = carDiscription.filter((elem) => {
            if (filterMilesValue === "0 - 50000") {
                return parseInt(elem.miles.replace(/,/g, '')) > 0 && parseInt(elem.miles.replace(/,/g, '')) <= 50000;
            } else if (filterMilesValue === "50000 - 60000") {
                return parseInt(elem.miles.replace(/,/g, '')) > 50000 && parseInt(elem.miles.replace(/,/g, '')) <= 60000; 
            } else if (filterMilesValue === "60000 - 70000") {
                return parseInt(elem.miles.replace(/,/g, '')) > 60000 && parseInt(elem.miles.replace(/,/g, '')) <= 70000;
            } else if (filterMilesValue === "70000 - 80000") {
                return parseInt(elem.miles.replace(/,/g, '')) > 70000 && parseInt(elem.miles.replace(/,/g, '')) <= 80000;
            } else if (filterMilesValue === "80000 - 90000") {
                return parseInt(elem.miles.replace(/,/g, '')) > 80000 && parseInt(elem.miles.replace(/,/g, '')) <= 90000;
            } else if (filterMilesValue === "90000 - 100000") {
                return parseInt(elem.miles.replace(/,/g, '')) > 90000 && parseInt(elem.miles.replace(/,/g, '')) <= 100000;
            } else if (filterMilesValue === "100000 - 120000") {
                return parseInt(elem.miles.replace(/,/g, '')) > 100000 && parseInt(elem.miles.replace(/,/g, '')) <= 120000;
            } else if (filterMilesValue === "120000 - 130000") {
                return parseInt(elem.miles.replace(/,/g, '')) > 120000 && parseInt(elem.miles.replace(/,/g, '')) <= 130000;
            } else if (filterMilesValue === "130000 - 140000") {
                return parseInt(elem.miles.replace(/,/g, '')) > 130000 && parseInt(elem.miles.replace(/,/g, '')) <= 140000;
            } else if (filterMilesValue === "140000 - 150000") {
                return parseInt(elem.miles.replace(/,/g, '')) > 140000 && parseInt(elem.miles.replace(/,/g, '')) <= 150000;
            } else if (filterMilesValue === "over 150000") {
                return parseInt(elem.miles.replace(/,/g, '')) > 150000;
            } else {
                return elem
            }
        
            return true; // If no specific condition is met, include the element in the result
        });
        
        filterByMilesData(cars);
    };


    //Filter by price
    const priceFilterBy = (target) => {
        const completeText = target.textContent.toLowerCase()

        // Extract the price range without the dollar sign
        const filteredPrice = completeText.slice(1, completeText.indexOf('<'))
            .replace(/\$/, '')
            .replace(/,/g, '')
            .trim()

        return filteredPrice
    }


    const handlePriceClick = (e) => {
        e.preventDefault()

        const filteredPriceValue = priceFilterBy(e.target)

        console.log("price clicked value", filteredPriceValue)


        const filterCarPrice = carDiscription.filter((elem) => {

            // Convert the price amount to a number
            const numericPrice = parseFloat(elem.priceamount.replace(/,/g, ''));

    
            // Check if the numeric price is within the specified range
            if (filteredPriceValue === "0 - 5000") {
                return numericPrice >= 0 && numericPrice <= 5000;
            } else if (filteredPriceValue === "5000 - 10000") {
                return numericPrice > 5000 && numericPrice <= 10000;
            } else if (filteredPriceValue === "10000 - 15000") {
                return numericPrice > 10000 && numericPrice <= 15000;
            } else if (filteredPriceValue === "15000 - 20000") {
                return numericPrice > 15000 && numericPrice <= 20000;
            } else if (filteredPriceValue === "20000 - 30000") {
                return numericPrice > 20000 && numericPrice <= 30000;
            } else if (filteredPriceValue === "30000 - 40000") {
                return numericPrice > 30000 && numericPrice <= 40000
            } else if (filteredPriceValue === "40000 - 50000") {
                return numericPrice > 40000 && numericPrice <= 50000;
            } else if (filteredPriceValue === "50000 - above") {
                return numericPrice > 50000
            } else {
                return numericPrice
            }

            return true
        })

        filterByPriceData(filterCarPrice)

        console.log("filter car price", filterCarPrice)
    }






    return (
        <div className={filterstyle.filterContainer}>
            <div className={filterstyle.yearFilterWrapper} >
                <h3>Year</h3>
                <hr style={{color:'black'}} />
                <div className={filterstyle.filterTypeWrapper} style={{height: yearExpended ? "auto" : '9rem', overflow: 'hidden'}}>
                    <div className={filterstyle.years}>
                        {Object.entries(yearCount).map(([year]) => (
                            <p key={year} onClick={handleFilterByClick}>
                                {year}
                            </p>
                        ))}
                    </div>
                    <div className={filterstyle.count}>
                        {Object.entries(yearCount).map(([year, count]) => (
                            <p key={year}> 
                                {count}
                            </p>
                        ))}
                    </div>
                </div>
                <button onClick={()=> handleYearExpend()}>{yearExpended ? "Show Less..." : "View More..."}</button>
            </div>
            <div className={filterstyle.makeModelFilterWrapper}>
                <h3>Make / Model</h3>
                <hr style={{color:'black'}} />
                <div className={filterstyle.filterTypeWrapper} style={{height: makeExpended ? "auto" : '9rem', overflow: 'hidden'}}>
                    <div className={filterstyle.years}>
                        {Object.entries(makeAndModal).map(([carname, count]) => {
                            const firstname = carname.split(' ')[0]; //get just the first word
                            return (
                                <p key={carname} onClick={handleFilterByClick}>
                                    {firstname}
                                </p>
                            )
                        })}
                    </div>
                    <div className={filterstyle.count}>
                        {Object.entries(makeAndModal).map(([carname, count]) => (
                            <p key={carname}> 
                                {count}
                            </p>
                        ))}
                    </div>
                </div>
                <button onClick={()=> handleMakeExpent()}>{makeExpended ? "Show Less..." : "View More..."}</button>
            </div>
            <div className={filterstyle.DrivetrainFilterWrapper}>
                <h3>Drivetrain</h3>
                <hr style={{color:'black'}} />
                <div className={filterstyle.filterTypeWrapper} >
                    <div className={filterstyle.years}>
                        {Object.entries(drivetrainCount).map(([drivetrain, count]) => (
                            <p key={drivetrain} onClick={handleFilterByClick}> 
                                {drivetrain}
                            </p>
                        ))}
                    </div>
                    <div className={filterstyle.count}>
                        {Object.entries(drivetrainCount).map(([drivetrain, count]) => (
                            <p key={drivetrain}>
                                {count}
                            </p>
                        ))}
                    </div>
                </div>

            </div>
            <div className={filterstyle.transmissionFilterWrapper}>
                <h3>Transmission</h3>
                <hr style={{color:'black'}} />
                <div className={filterstyle.filterTypeTransWrapper}>
                    <div className={filterstyle.years}>
                        {Object.entries(transmissionCount).map(([transmission, count]) => (
                            <p key={transmission} onClick={handleFilterByClick}>
                                {transmission}
                            </p>
                        ))}
                    </div>
                    <div className={filterstyle.count}>
                        {Object.entries(transmissionCount).map(([transmission, count]) => (
                            <p key={transmission}>
                                {count}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <div className={filterstyle.mileageFilterWrapper}>
                <h3>Mileage</h3>
                <hr style={{color:'black'}} />
                <div className={filterstyle.filterTypeWrapper} style={{height: milesExpended ? "auto" : '9rem', overflow: 'hidden'}}>
                    <div className={filterstyle.milesRange}>
                        <p onClick={handleMilesCLick}>0 - 50,000  <span>{lessThanFifty.length}</span></p>
                        <p onClick={handleMilesCLick}>50,000 - 60,000 <span>{fiftySixty.length}</span></p>
                        <p onClick={handleMilesCLick}>60,000 - 70,000 <span>{sixtySeventy.length}</span></p>
                        <p onClick={handleMilesCLick}>70,000 - 80,000 <span>{seventyEighty.length}</span></p>
                        <p onClick={handleMilesCLick}>80,000 - 90,000 <span>{eightyNinety.length}</span></p>
                        <p onClick={handleMilesCLick}>90,000 - 100,000 <span>{ninetyHundred.length}</span></p>
                        <p onClick={handleMilesCLick}>120,000 - 130,000 <span>{oneTwentyOneThirty.length}</span></p>
                        <p onClick={handleMilesCLick}>130,000 - 140,000 <span>{oneThirtyOneForty.length}</span></p>
                        <p onClick={handleMilesCLick}>140,000 - 150,000 <span>{oneFortyOneFifty.length}</span></p>
                        <p onClick={handleMilesCLick}>Over 150,000 <span>{overOneFifty.length}</span></p>
                    </div>
                </div>
                <button onClick={()=> handleMilesExpended()}>{milesExpended ? "Show Less..." : "View More..."}</button>
            </div>
            <div className={filterstyle.priceRangeWrapper}>
                <h3>Price Range</h3>
                <hr style={{color:'black'}} />
                <div className={filterstyle.filterTypeWrapper} style={{height: priceExpended ? "auto" : '9rem', overflow: 'hidden'}}>
                    <div className={filterstyle.priceRange}>
                        <p onClick={handlePriceClick}>$0 - $5,000 <span>{fiveThousandOrLess.length}</span></p>
                        <p onClick={handlePriceClick}>$5,000 - $10,000 <span>{fiveToTenThousand.length}</span></p>
                        <p onClick={handlePriceClick}>$10,000 - $15,000 <span>{tenToFifteenThousand.length}</span></p>
                        <p onClick={handlePriceClick}>$15,000 - $20,000 <span>{fifteenToTwentyThousand.length}</span></p>
                        <p onClick={handlePriceClick}>$20,000 - 30,000 <span>{twentyToThirtyThousand.length}</span></p>
                        <p onClick={handlePriceClick}>$30,000 - 40,000 <span>{thirtyToFortyThousannd.length}</span></p>
                        <p onClick={handlePriceClick}>$40,000 - 50,000 <span>{fortyToFiftyThousand.length}</span></p>
                        <p onClick={handlePriceClick}>$50,000 - Above <span>{overFiftyThousand.length}</span></p>
                    </div>
                </div>
                <button onClick={()=> handlePriceExpended()}>{priceExpended ? "Show Less..." : "View More..."}</button>
            </div>
            <button className={filterstyle.filterbutton} type='button' onClick={handleResetFilters}>
                RESET FILTERS
            </button>
        </div>
    )
}

export default Filter