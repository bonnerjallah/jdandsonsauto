import { useState } from "react"
import axios from "axios"


import Sidebar from "../components/Sidebar"


import addvehiclestyle from '../style/addvehiclestyle.module.css'

const backendUrl = import.meta.env.VITE_BACKEND_URL


const AddNewVehicle = () => {

    const [vechinput, setvechinput] = useState({
        carname: '',
        caryear: '',
        drivetrain: '',
        transmiss: '',
        engine: '',
        miles: '',
        extcolor: '',
        intecolor:'',
        stocknum: '',
        vinnum: '',
        fueltype: '',
        condi: '',
        priceamount: '',
        trim: '',
        doors: '',
    })

    const [checkBoxValue, setCheckBoxValue] = useState({

        airCondition: false, 
        powerwindow: false, 
        powerlock: false, 
        powersteering: false, 
        tiltwheel: false, 
        amfm: false, 
        satellite: false, 
        abs: false, 
        keyless: false, 
        cruise: false, 
        bluetooth: false, 
        dualairbag: false, 
        moonroof: false, 
        sunroof: false, 
        leather: false, 
        heatedseats: false, 
        navi: false, 
        crew: false, 
        shortbed: false, 
        traction: false, 
        stability: false, 
        antitheft: false, 
        backupcam: false, 
    })

    const [imageFiles, setImageFiles] = useState([]);

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImageFiles(selectedFiles);
    }
    

    const handleVehInputData = (e, description) => {
        const { type, checked, name, value } = e.target

        if(type === 'checkbox') {
            setCheckBoxValue((prevData) => ({...prevData, [name]: checked, [name + '_description']: checked ? description : '' }))
        } else {
            setvechinput((prevData) => ({...prevData, [name]: value}))
        }
    }

    const handleCarSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('carname', vechinput.carname);
        formData.append('caryear', vechinput.caryear);
        formData.append('drivetrain', vechinput.drivetrain);
        formData.append('transmiss', vechinput.transmiss);
        formData.append("engine", vechinput.engine);
        formData.append('miles', vechinput.miles);
        formData.append('extcolor', vechinput.extcolor);
        formData.append('intecolor', vechinput.intecolor);
        formData.append('stocknum', vechinput.stocknum);
        formData.append('vinnum', vechinput.vinnum);
        formData.append('fueltype', vechinput.fueltype);
        formData.append('condi', vechinput.condi);
        formData.append('priceamount', vechinput.priceamount);
        formData.append('trim', vechinput.trim);
        formData.append('doors', vechinput.doors)


        //append checkbok by looping through the selected box
        const featureNames = [
            { name: 'airCondition', description: 'Air Conditioning' },
            { name: 'powerwindow', description: 'Power Window' },
            { name: 'powerlock', description: 'Power Lock' },
            {name: 'powersteering', description: 'Power Steering'},
            {name: 'tiltwheel', description: 'Tilt Wheel'},
            {name: 'amfm', description: 'AM/FM/CD/MP3'},
            {name: 'satellite', description: 'Satellite'},
            {name: 'abs', description: 'ABS'},
            {name: 'keyless', description: 'Keyless Entry'},
            {name: 'cruise', description: 'Cruise Control'},
            {name: 'bluetooth', description: 'Bluetooth'},
            {name: 'dualairbag', description: 'Dual Air Bag'},
            {name: 'moonroof', description: 'Moon Roof'},
            {name: 'sunroof', description: 'Sun Roof'},
            {name: 'leather', description: 'Leather'},
            {name: 'heatedseats', description: 'Heated Seats'},
            {name: 'navi', description: 'Navigation System'},
            {name: 'crew', description: 'Crew Cab'},
            {name: 'shortbed', description: 'Short Bed'},
            {name: 'traction', description: 'Traction Control'},
            {name: 'stability', description: 'Stability Control'},
            {name: 'antitheft', description: 'Anti-Theft System'},
            {name: 'backupcam', description: ' Backup Camera'},
        ];

        featureNames.forEach(feature => {
            const { name, description } = feature;
            if (checkBoxValue[name]) {
                formData.append(name, 'true');
                formData.append(name + '_description', description);
            } else {
                formData.append(name, '');
                formData.append(name + '_description', '');
            }
        });
        

        // Assuming imageFiles is an array of selected image files
        if (imageFiles && imageFiles.length > 0) {
            for (const file of imageFiles) {
                formData.append('images', file, file.name);
            }
        }

        try{   
            const res = await axios.post(`${backendUrl}/cardiscrip`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' } // Use 'multipart/form-data' for FormData
            })

            if(res.status === 200) {
                console.log("Car discription created successfull")

                setvechinput({
                    carname: '',
                    caryear: '',
                    drivetrain: '',
                    transmiss: '',
                    engine: '',
                    miles: '',
                    extcolor: '',
                    intecolor:'',
                    stocknum: '',
                    vinnum: '',
                    fueltype: '',
                    condi: '',
                    priceamount: '',
                    trim: '',
                    doors: ''
                })

                setCheckBoxValue({
                    airCondition: false, 
                    powerwindow: false, 
                    powerlock: false, 
                    powersteering: false, 
                    tiltwheel: false, 
                    amfm: false, 
                    satellite: false, 
                    abs: false, 
                    keyless: false, 
                    cruise: false, 
                    bluetooth: false, 
                    dualairbag: false, 
                    moonroof: false, 
                    sunroof: false, 
                    leather: false, 
                    heatedseats: false, 
                    navi: false, 
                    crew: false, 
                    shortbed: false, 
                    traction: false, 
                    stability: false, 
                    antitheft: false, 
                    backupcam: false, 
                })
                
                setImageFiles(null)

            } else {
                console.log("Error creating car discription", res.data)
            }

        } catch (error) {
            console.log('Error', error)
        }
    }

    return (
        <div className={addvehiclestyle.mainContainer}>
            <div>
                <Sidebar />
            </div>
            <div className={addvehiclestyle.addvechMainWrapper}>
                <div className={addvehiclestyle.header}>
                    <h1>Add New Vehicle</h1>
                </div>

                <div className={addvehiclestyle.addform}>
                    <form onSubmit={handleCarSubmit} encType="multipart/form-data" method="POST">
                        <fieldset>
                            <h3>Vehicle Make/Model & Year</h3>
                            <label htmlFor="carNameAndType">
                                Vehicle Type:
                                <input type="text" name="carname" id="carNameAndType" value={vechinput.carname} onChange={handleVehInputData} placeholder="Vehicle Type" />
                            </label>
                            <label htmlFor="vehicleYear">
                                Vehicle Year:
                                <input type="text" name="caryear" id="vehicleYear" value={vechinput.caryear} onChange={handleVehInputData} placeholder="Vehicle Year" />
                            </label>
                        </fieldset>
                        <fieldset>
                            <h3>Vehicle Discription</h3>
                            <label htmlFor="VehicleDriveTrain">
                                DriveTrain:
                                <input type="text" name="drivetrain" id="VehicleDriveTrain" value={vechinput.drivetrain} onChange={handleVehInputData} placeholder="Drivetrain" />
                            </label>
                            <label htmlFor="vehicleTransmiss">
                                Transmission:
                                <input type="text" name="transmiss" id="vehicleTransmiss" value={vechinput.transmiss} onChange={handleVehInputData} placeholder="Transmission" />
                            </label>
                            <label htmlFor="vehicleEngine">
                                Engine:
                                <input type="text" name="engine" id="vehicleEngine" value={vechinput.engine} onChange={handleVehInputData} placeholder="Engine" />
                            </label>
                            <label htmlFor="vehicleMiles">
                                Millage:
                                <input type="text" name="miles" id="vehicleMiles" value={vechinput.miles} onChange={handleVehInputData} placeholder="Millage" />
                            </label>
                            <label htmlFor="vehicleExtColor">
                                Exterior Color:
                                <input type="text" name="extcolor" id="vehicleExtColor" value={vechinput.extcolor} onChange={handleVehInputData} placeholder="Exterior Color" />
                            </label>
                            <label htmlFor="vehicleInteColor">
                                Interior Color:
                                <input type="text" name="intecolor" id="vehicleInteColor" value={vechinput.intecolor} onChange={handleVehInputData} placeholder="Interior Color" />
                            </label>
                            <label htmlFor="vehicleStockNum">
                                Stock #:
                                <input type="text" name="stocknum" id="vehicleStockNum" value={vechinput.stocknum} onChange={handleVehInputData} placeholder="Stock #" />
                            </label>
                            <label htmlFor="vehicleVinNum">
                                VIN #:
                                <input type="text" name="vinnum" id="vehicleVinNum" value={vechinput.vinnum} onChange={handleVehInputData} placeholder="VIN #" />
                            </label>
                            <label htmlFor="vehicleFuelType">
                                Fuel Type:
                                <input type="text" name="fueltype" id="vehicleFuelType" value={vechinput.fueltype} onChange={handleVehInputData} placeholder="Fuel Type" />
                            </label>
                            <label htmlFor="vehicleCondi">
                                Condition:
                                <input type="text" name="condi" id="vehicleCondi" value={vechinput.condi} onChange={handleVehInputData} placeholder="Condition" />
                            </label>
                            <label htmlFor="vehiclePriceAmount">
                                Price:
                                <input type="text" name="priceamount" id="vehiclePriceAmount" value={vechinput.priceamount} onChange={handleVehInputData} placeholder="Price" />
                            </label>
                            <label htmlFor="vehicleTrim">
                                Trim:
                                <input type="text" name="trim" id="vehicleTrim" value={vechinput.trim} onChange={handleVehInputData} placeholder="Trim" />
                            </label>
                            <label htmlFor="vehicleDoors">
                                Doors:
                                <input type="text" name="doors" id="vehicleDoors" value={vechinput.doors} onChange={handleVehInputData} placeholder="Doors" />
                            </label>
                        </fieldset>
                        <fieldset>
                            <h3>Vehicle Features</h3>
                            <label htmlFor="vehicleAirCondition">
                                Air Conditioning:
                                <input type="checkbox" name="airCondition" id="vehicleAirCondition"  checked={checkBoxValue.airCondition} onChange={(e) => handleVehInputData(e, 'Air Conditioning')} />
                            </label>
                            <label htmlFor="vehiclePowerWindow">
                                Power Window:
                                <input type="checkbox" name="powerwindow" id="vehiclePowerWindow"  checked={checkBoxValue.powerwindow} onChange={(e) => handleVehInputData(e, 'Power Window')} />
                            </label>
                            <label htmlFor="vehivlePowerLock">
                                Power Lock:
                                <input type="checkbox" name="powerlock" id="vehivlePowerLock"  checked={checkBoxValue.powerlock} onChange={(e) => handleVehInputData(e, 'Power Lock')} />
                            </label>
                            <label htmlFor="vehiclePowerSteering">
                                Power Steering:
                                <input type="checkbox" name="powersteering" id="vehiclePowerSteering"  checked={checkBoxValue.powersteering} onChange={(e) => handleVehInputData(e, 'Power Steering')} />
                            </label>
                            <label htmlFor="vehicleTiltWheel">
                                Tilt Wheel:
                                <input type="checkbox" name="tiltwheel" id="vehicleTiltWheel"  checked={checkBoxValue.tiltwheel} onChange={(e) => handleVehInputData(e, 'Tilt Wheel')} />
                            </label>
                            <label htmlFor="vehicleAmFm">
                                AM/FM/CD/MP3:
                                <input type="checkbox" name="amfm" id="vehicleAmFm"  checked={checkBoxValue.amfm} onChange={(e) => handleVehInputData(e, 'AM/FM/CD/MP3')} />
                            </label>
                            <label htmlFor="vehicleSatellite">
                                Satellite:
                                <input type="checkbox" name="satellite" id="vehicleSatellite" checked={checkBoxValue.satellite} onChange={(e) => handleVehInputData(e, 'Satellite')} />
                            </label>
                            <label htmlFor="vehicleabs">
                                ABS:
                                <input type="checkbox" name="abs" id="vehicleabs"  checked={checkBoxValue.abs} onChange={(e) => handleVehInputData(e, 'ABS')} />
                            </label>
                            <label htmlFor="vehicleKeyless">
                                Keyless Entry:
                                <input type="checkbox" name="keyless" id="vehicleKeyless"  checked={checkBoxValue.keyless} onChange={(e) => handleVehInputData(e, 'Keyless Entry')} />
                            </label>
                            <label htmlFor="vehicleCruise">
                                Cruise Control:
                                <input type="checkbox" name="cruise" id="vehicleCruise"  checked={checkBoxValue.cruise} onChange={(e) => handleVehInputData(e, 'Cruise Control')} />
                            </label>
                            <label htmlFor="vehiclebluetooth">
                                Bluetooth:
                                <input type="checkbox" name="bluetooth" id="vehiclebluetooth"  checked={checkBoxValue.bluetooth} onChange={(e) => handleVehInputData(e, 'Bluetooth')} />
                            </label>
                            <label htmlFor="vehicleDualAirBag">
                                Dual Air Bags:
                                <input type="checkbox" name="dualairbag" id="vehicleDualAirBag"  checked={checkBoxValue.dualairbag} onChange={(e) => handleVehInputData(e, 'Dual Air Bags')} />
                            </label>
                            <label htmlFor="vehicleMoonRoof">
                                Moon Roof:
                                <input type="checkbox" name="moonroof" id="vehicleMoonRoof"  checked={checkBoxValue.moonroof} onChange={(e) => handleVehInputData(e, 'Moon Roof')} />
                            </label>
                            <label htmlFor="vehicleSunRoof">
                                Sun Roof:
                                <input type="checkbox" name="sunroof" id="vehicleSunRoof"  checked={checkBoxValue.sunroof} onChange={(e) => handleVehInputData(e, 'Sun Roof')} />
                            </label>
                            <label htmlFor="vehicleLeather">
                                Leather:
                                <input type="checkbox" name="leather" id="vehicleLeather"  checked={checkBoxValue.leather} onChange={(e) => handleVehInputData(e, 'Leather')} />
                            </label>
                            <label htmlFor="vehicleHeatedSeats">
                                Heated Seats:
                                <input type="checkbox" name="heatedseats" id="vehicleHeatedSeats"  checked={checkBoxValue.heatedseats} onChange={(e) => handleVehInputData(e, 'Heated Seats')} />
                            </label>
                            <label htmlFor="vehicleNavi">
                                Navigation System:
                                <input type="checkbox" name="navi" id="vehicleNavi"  checked={checkBoxValue.navi} onChange={(e) => handleVehInputData(e, 'Navigation System')} />
                            </label>
                            <label htmlFor="vehicleCrew">
                                Crew Cab:
                                <input type="checkbox" name="crew" id="vehicleCrew"  checked={checkBoxValue.crew} onChange={(e) => handleVehInputData(e, 'Crew Cab')} />
                            </label>
                            <label htmlFor="vehicleShortBed">
                                Short Bed:
                                <input type="checkbox" name="shortbed" id="vehicleShortBed"  checked={checkBoxValue.shortbed} onChange={(e) => handleVehInputData(e, 'Short Bed')} />
                            </label>
                            <label htmlFor="vehicleTraction">
                                Traction Control:
                                <input type="checkbox" name="traction" id="vehicleTraction"  checked={checkBoxValue.traction} onChange={(e) => handleVehInputData(e, 'Traction Control')} />
                            </label>
                            <label htmlFor="vehicleStability">
                                Stability Control:
                                <input type="checkbox" name="stability" id="vehicleStability"  checked={checkBoxValue.stability} onChange={(e) => handleVehInputData(e, 'Stability Control')} />
                            </label>
                            <label htmlFor="vehicleAntitheft">
                                Anti-Theft System:
                                <input type="checkbox" name="antitheft" id="vehicleAntitheft"  checked={checkBoxValue.antitheft} onChange={(e) => handleVehInputData(e, 'Anti-Theft System')} />
                            </label>
                            <label htmlFor="vehicleBackUpCam">
                                Backup Camera:
                                <input type="checkbox" name="backupcam" id="vehicleBackUpCam"  checked={checkBoxValue.backupcam} onChange={(e) => handleVehInputData(e, 'Backup Camera')} />
                            </label>
                        </fieldset>
                        <fieldset>
                            <h3>Vehicle Image</h3>
                            <label htmlFor="vehivleImages">
                                Vehicle Images:
                                <input type="file" name="images" id="vehivleImages" accept="image/*" multiple onChange={handleImageChange} />
                            </label>
                        </fieldset>
                        <button type="submit" className={addvehiclestyle.formAddButton}>Add Vehicle</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNewVehicle