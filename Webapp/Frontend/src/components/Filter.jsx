import { useState } from 'react';
import filterstyle from '../styles/filterstyle.module.css'



const Filter = ({carDiscription}) => {

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
    

    return (
        <div className={filterstyle.filterContainer}>
            <div className={filterstyle.yearFilterWrapper} >
                <h3>Year</h3>
                <hr style={{color:'black'}} />
                <div className={filterstyle.filterTypeWrapper} style={{height: yearExpended ? "auto" : '9rem', overflow: 'hidden'}}>
                    <div className={filterstyle.years}>
                        {Object.entries(yearCount).map(([year]) => (
                            <p key={year}>
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
                                <p key={carname}>
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
                            <p key={drivetrain}> 
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
                            <p key={transmission}>
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
                        <p>0 - 50,000 <span>{lessThanFifty.length}</span></p>
                        <p>50,000 - 60,000 <span>{fiftySixty.length}</span></p>
                        <p>60,000 - 70,000 <span>{sixtySeventy.length}</span></p>
                        <p>70,000 - 80,000 <span>{seventyEighty.length}</span></p>
                        <p>80,000 - 90,000 <span>{eightyNinety.length}</span></p>
                        <p>90,000 - 100,000 <span>{ninetyHundred.length}</span></p>
                        <p>120,000 - 130,000 <span>{oneTwentyOneThirty.length}</span></p>
                        <p>130,000 - 140,000 <span>{oneThirtyOneForty.length}</span></p>
                        <p>140,000 - 150,000 <span>{oneFortyOneFifty.length}</span></p>
                        <p>Over 150,000 <span>{overOneFifty.length}</span></p>
                    </div>
                </div>
                <button onClick={()=> handleMilesExpended()}>{milesExpended ? "Show Less..." : "View More..."}</button>
            </div>
            <div className={filterstyle.priceRangeWrapper}>
                <h3>Price Range</h3>
                <hr style={{color:'black'}} />
                <div className={filterstyle.filterTypeWrapper} style={{height: priceExpended ? "auto" : '9rem', overflow: 'hidden'}}>
                    <div className={filterstyle.priceRange}>
                        <p>$0 - $5,000 <span>{fiveThousandOrLess.length}</span></p>
                        <p>$5,000 - $10,000 <span>{fiveToTenThousand.length}</span></p>
                        <p>$10,000 - $15,000 <span>{tenToFifteenThousand.length}</span></p>
                        <p>$15,000 - $20,000 <span>{fifteenToTwentyThousand.length}</span></p>
                        <p>$20,000 - 30,000 <span>{twentyToThirtyThousand.length}</span></p>
                        <p>$30,000 - 40,000 <span>{thirtyToFortyThousannd.length}</span></p>
                        <p>$40,000 - 50,000 <span>{fortyToFiftyThousand.length}</span></p>
                        <p>$50,000 - Above <span>{overFiftyThousand.length}</span></p>
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