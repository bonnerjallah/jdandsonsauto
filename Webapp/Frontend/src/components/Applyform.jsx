import applyformstyle from '../styles/applyformstyle.module.css'

const Applyform = ({car}) => {

            
    return (
        <div>
            <form>
                <fieldset className={applyformstyle.firstfieldset}>
                    <h4>CLIENT INFORMATION</h4>

                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstname" id="firstName" required />

                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastname" id="lastName" required/>
                    
                    <label htmlFor="stAddress">Street Address</label>
                    <input type="text" name="streetaddress" id="stAddress" required />
                    <br />

                    <label htmlFor="cityinfo">City</label>
                    <input type="text" name="city" id="cityinfo" required/>

                    <label htmlFor="stateinfo">State</label>
                    <select name="state" id="stateinfo" required>
                        <option value=""></option>
                        <option value="Alabama">Alabama</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Arizona">Arizona</option>
                        <option value="Arkansas">Arkansas</option>
                        <option value="California">California</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Connecticut">Connecticut</option>
                        <option value="Delaware">Delaware</option>
                        <option value="Florida">Florida</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Idaho">Idaho</option>
                        <option value="Illinois">Illinois</option>
                        <option value="Indiana">Indiana</option>
                        <option value="Iowa">Iowa</option>
                        <option value="Kansas">Kansas</option>
                        <option value="Kentucky">Kentucky</option>
                        <option value="Louisiana">Louisiana</option>
                        <option value="Maine">Maine</option>
                        <option value="Maryland">Maryland</option>
                        <option value="Massachusetts">Massachusetts</option>
                        <option value="Michigan">Michigan</option>
                        <option value="Minnesota">Minnesota</option>
                        <option value="Mississippi">Mississippi</option>
                        <option value="Missouri">Missouri</option>
                        <option value="Montana">Montana</option>
                        <option value="Nebraska">Nebraska</option>
                        <option value="Nevada">Nevada</option>
                        <option value="New Hampshire">New Hampshire</option>
                        <option value="New Jersey">New Jersey</option>
                        <option value="New Mexico">New Mexico</option>
                        <option value="New York">New York</option>
                        <option value="North Carolina">North Carolina</option>
                        <option value="North Dakota">North Dakota</option>
                        <option value="Ohio">Ohio</option>
                        <option value="Oklahoma">Oklahoma</option>
                        <option value="Oregon">Oregon</option>
                        <option value="Pennsylvania">Pennsylvania</option>
                        <option value="Rhode Island">Rhode Island</option>
                        <option value="South Carolina">South Carolina</option>
                        <option value="South Dakota">South Dakota</option>
                        <option value="Tennessee">Tennessee</option>
                        <option value="Texas">Texas</option>
                        <option value="Utah">Utah</option>
                        <option value="Vermont">Vermont</option>
                        <option value="Virginia">Virginia</option>
                        <option value="Washington">Washington</option>
                        <option value="West Virginia">West Virginia</option>
                        <option value="Wisconsin">Wisconsin</option>
                        <option value="Wyoming">Wyoming</option>
                    </select>

                    <label htmlFor="zipCode"> Zip Code</label>
                    <input type="number" name="zip" id="zipCode" required/>

                    <label htmlFor="emailinfo">Email</label>
                    <input type="email" name="email" id="emailinfo" />
                    <br />

                    <label htmlFor="homePhone">Home Phone</label>
                    <input type="number" name="homephone" id="homePhone" />

                    <label htmlFor="cellPhone">Cell Phone</label>
                    <input type="number" name="cellphone" id="cellPhone" required />

                    <label htmlFor="SSnumber">SSN</label>
                    <input type="number" name="ssnumber" id="SSnumber" required />
                    <br />

                    <label htmlFor="DOB">Date of Birth</label>
                    <input type="date" name="dateofbirth" id="DOB" required />

                    <label htmlFor="DLstate">Driver's License State</label>
                    <select name="dlstate" id="DLstate" required>
                        <option value=""></option>
                        <option value="Alabama">Alabama</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Arizona">Arizona</option>
                        <option value="Arkansas">Arkansas</option>
                        <option value="California">California</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Connecticut">Connecticut</option>
                        <option value="Delaware">Delaware</option>
                        <option value="Florida">Florida</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Idaho">Idaho</option>
                        <option value="Illinois">Illinois</option>
                        <option value="Indiana">Indiana</option>
                        <option value="Iowa">Iowa</option>
                        <option value="Kansas">Kansas</option>
                        <option value="Kentucky">Kentucky</option>
                        <option value="Louisiana">Louisiana</option>
                        <option value="Maine">Maine</option>
                        <option value="Maryland">Maryland</option>
                        <option value="Massachusetts">Massachusetts</option>
                        <option value="Michigan">Michigan</option>
                        <option value="Minnesota">Minnesota</option>
                        <option value="Mississippi">Mississippi</option>
                        <option value="Missouri">Missouri</option>
                        <option value="Montana">Montana</option>
                        <option value="Nebraska">Nebraska</option>
                        <option value="Nevada">Nevada</option>
                        <option value="New Hampshire">New Hampshire</option>
                        <option value="New Jersey">New Jersey</option>
                        <option value="New Mexico">New Mexico</option>
                        <option value="New York">New York</option>
                        <option value="North Carolina">North Carolina</option>
                        <option value="North Dakota">North Dakota</option>
                        <option value="Ohio">Ohio</option>
                        <option value="Oklahoma">Oklahoma</option>
                        <option value="Oregon">Oregon</option>
                        <option value="Pennsylvania">Pennsylvania</option>
                        <option value="Rhode Island">Rhode Island</option>
                        <option value="South Carolina">South Carolina</option>
                        <option value="South Dakota">South Dakota</option>
                        <option value="Tennessee">Tennessee</option>
                        <option value="Texas">Texas</option>
                        <option value="Utah">Utah</option>
                        <option value="Vermont">Vermont</option>
                        <option value="Virginia">Virginia</option>
                        <option value="Washington">Washington</option>
                        <option value="West Virginia">West Virginia</option>
                        <option value="Wisconsin">Wisconsin</option>
                        <option value="Wyoming">Wyoming</option>
                    </select>

                    <label htmlFor="dlNumber">Driver's License Number</label>
                    <input type="number" name="dlnumber" id="dlNumber" required />
                    <br />

                    <label htmlFor="dlIssueDate">Driver's License Issue Date</label>
                    <input type="date" name="dlissuedate" id="dlIssueDate" required />

                    <label htmlFor="dlExpDate">Driver's License Expiry Date</label>
                    <input type="date" name="dlexpdate" id="dlExpDate"  required />
                </fieldset>

                <fieldset className={applyformstyle.secondfieldset} >
                    <h4>RESIDENTIAL INFORMATION</h4>
                    
                    <label htmlFor="housing">Housing Type</label>
                    <select name="housingtype" id="housing" required>
                        <option value=""></option>
                        <option value="rent">Rent</option>
                        <option value="own">Own</option>
                        <option value="other">Other</option>
                    </select>

                    <label htmlFor="rent">Monthly Rent/Mortgage</label>
                    <input type="number" name="monthlyrent" id="rent" required />

                    <label htmlFor="AtAddress">Years at Address</label>
                    <input type="number" name="yearsataddress" id="AtAddress" placeholder='Year' required />

                    <label htmlFor="mthAtAddress"></label>
                    <input type="number" name="monthataddress" id="mthAtAddress" placeholder='Month'/>
                </fieldset>

                <fieldset className={applyformstyle.thirdfieldset}>
                    <h4>ADD PREVIOUS ADDRESS</h4>

                    <label htmlFor="prevstname">Street Name</label>
                    <input type="text" name="prevstreetname" id="prevstname" />

                    <label htmlFor="prevcity">City</label>
                    <input type="text" name="prevcity" id="prevcity" />

                    <label htmlFor="prevst">State</label>
                    <select name="prevst" id="prevst">
                        <option value=""></option>
                        <option value="Alabama">Alabama</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Arizona">Arizona</option>
                        <option value="Arkansas">Arkansas</option>
                        <option value="California">California</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Connecticut">Connecticut</option>
                        <option value="Delaware">Delaware</option>
                        <option value="Florida">Florida</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Idaho">Idaho</option>
                        <option value="Illinois">Illinois</option>
                        <option value="Indiana">Indiana</option>
                        <option value="Iowa">Iowa</option>
                        <option value="Kansas">Kansas</option>
                        <option value="Kentucky">Kentucky</option>
                        <option value="Louisiana">Louisiana</option>
                        <option value="Maine">Maine</option>
                        <option value="Maryland">Maryland</option>
                        <option value="Massachusetts">Massachusetts</option>
                        <option value="Michigan">Michigan</option>
                        <option value="Minnesota">Minnesota</option>
                        <option value="Mississippi">Mississippi</option>
                        <option value="Missouri">Missouri</option>
                        <option value="Montana">Montana</option>
                        <option value="Nebraska">Nebraska</option>
                        <option value="Nevada">Nevada</option>
                        <option value="New Hampshire">New Hampshire</option>
                        <option value="New Jersey">New Jersey</option>
                        <option value="New Mexico">New Mexico</option>
                        <option value="New York">New York</option>
                        <option value="North Carolina">North Carolina</option>
                        <option value="North Dakota">North Dakota</option>
                        <option value="Ohio">Ohio</option>
                        <option value="Oklahoma">Oklahoma</option>
                        <option value="Oregon">Oregon</option>
                        <option value="Pennsylvania">Pennsylvania</option>
                        <option value="Rhode Island">Rhode Island</option>
                        <option value="South Carolina">South Carolina</option>
                        <option value="South Dakota">South Dakota</option>
                        <option value="Tennessee">Tennessee</option>
                        <option value="Texas">Texas</option>
                        <option value="Utah">Utah</option>
                        <option value="Vermont">Vermont</option>
                        <option value="Virginia">Virginia</option>
                        <option value="Washington">Washington</option>
                        <option value="West Virginia">West Virginia</option>
                        <option value="Wisconsin">Wisconsin</option>
                        <option value="Wyoming">Wyoming</option>
                    </select>

                    <label htmlFor="prevzip">Zip Code</label>
                    <input type="number" name="prevzipcode" id="prevzip" />
                    <br />

                    <label htmlFor="prevhousing">Housing Type</label>
                    <select name="prevhousingtype" id="prevhousing" required>
                        <option value=""></option>
                        <option value="rent">Rent</option>
                        <option value="own">Own</option>
                        <option value="other">Other</option>
                    </select>

                    <label htmlFor="prevrent">Monthly Rent/Mortgage</label>
                    <input type="number" name="prevmonthlyrent" id="prevrent" />

                    <label htmlFor="prevAtAddress">Years at Address</label>
                    <input type="number" name="prevyearsataddress" id="prevAtAddress" placeholder='Year' required />

                    <label htmlFor="prevMthAtAddress"></label>
                    <input type="number" name="prevmonthataddress" id="prevMthAtAddress" placeholder='Month' />
                </fieldset>

                <fieldset className={applyformstyle.forthfieldset}>
                    <h4>EMPLOYMENT INFORMATION</h4>

                    <label htmlFor="jobname">Employer Name</label>
                    <input type="text" name="employername" id="jobname" required />

                    <label htmlFor="titleposition">Title/Position</label>
                    <input type="text" name="jobtitle" id="titleposition" required />

                    <label htmlFor="businessphonenum">Business Phone Number</label>
                    <input type="number" name="businessphone" id="businessphonenum" />
                    <br />

                    <label htmlFor="monthlyincome">Gross Monthly Salary</label>
                    <input type="number" name="income" id="monthlyincome" required/>

                    <label htmlFor="yearsatemployment">Years at Employment</label>
                    <input type="number" name="yearsatjob" id="yearsatemployment" required />
                </fieldset>

                <fieldset className={applyformstyle.fifthfieldset}>
                    <h4>ADD PREVIOUS EMPLOYMENT</h4>

                    <label htmlFor="prevjobname">Employer Name</label>
                    <input type="text" name="prevemployername" id="prevjobname" required />

                    <label htmlFor="prevtitleposition">Title/Position</label>
                    <input type="text" name="prevjobtitle" id="prevtitleposition" required />

                    <label htmlFor="prevbusinessphonenum">Business Phone Number</label>
                    <input type="number" name="prevbusinessphone" id="prevbusinessphonenum" />
                    <br />

                    <label htmlFor="prevmonthlyincome">Gross Monthly Salary</label>
                    <input type="number" name="previncome" id="prevmonthlyincome" required/>

                    <label htmlFor="prevyearsatemployment">Years at Employment</label>
                    <input type="number" name="prevyearsatjob" id="prevyearsatemployment" required />
                </fieldset>

                <fieldset className={applyformstyle.sixthfieldset}>
                    <div className={applyformstyle.intrestedInputWrapper}>
                        <h3>VEHICLE INTERESTED</h3>

                        <label htmlFor="intrestedvehistock"></label>
                        <input type="text" name="vehistock" id="intrestedvehistock" defaultValue={car ? car.stocknum || '' : ''} placeholder='Stock Number' />

                        <label htmlFor="intrestedvihiname"></label>
                        <input type="text" name="vehiname" id="intrestedvihiname" defaultValue={car ? car.carname.split(' ')[0] || '' : ''}  placeholder='Make' />

                        <label htmlFor="intrestedvehitype"></label>
                        <input type="text" name="vehitype" id="intrestedvehitype" defaultValue={car ? car.carname.split(' ')[1] || '' : ''} placeholder='Model' />

                        <label htmlFor="intrestedvehiyear"></label>
                        <input type="text" name="vehiyear" id="intrestedvehiyear" defaultValue={car ? car.caryear || '' : ''} placeholder='Year' />

                        <label htmlFor="intrestedvehiprice"></label>
                        <input type="text" name='vehiprice' id='intrestedvehiprice' defaultValue={car ? parseFloat(car.priceamount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}placeholder='Vehicle Price' />

                        <label htmlFor="downpaymentamount"></label>
                        <input type="number" name="downpayment" id="downpaymentamount" placeholder='Down Payment'/>
                        
                    </div>
                    <div className={applyformstyle.tradeInContainer}>
                        <h3>TRADE-IN</h3>
                        <div className={applyformstyle.checkboxWrapper}>
                            <label htmlFor="askoftradein">Trade-in? <input type="checkbox" name="tradein" id="askoftradein" style={{cursor: 'pointer'}}/></label>
                        </div>
                        <div className={applyformstyle.tradeInInputWrapper}>
                            <label htmlFor="tradevinnumber"></label>
                            <input type="text" name="tradevin" id="tradevinnumber" placeholder="VIN Number" />

                            <label htmlFor="makeoftrade"></label>
                            <input type="text" name="trademake" id="makeoftrade" placeholder="Make" />

                            <label htmlFor="modaloftrade"></label>
                            <input type="text" name="trademodal" id="modaloftrade" placeholder="Modal" />

                            <label htmlFor="yearoftrade"></label>
                            <input type="number" name="tradeyear" id="yearoftrade" placeholder="Year" />

                            <label htmlFor="milesoftrade"></label>
                            <input type="number" name="trademiles" id="milesoftrade" placeholder="Mileage" />
                        </div>
                    </div>
                </fieldset>

                <fieldset className={applyformstyle.signatureBox}>
                    <h4>SIGNATURE REQUIRED</h4>

                    <label htmlFor="signature">Please Type in Your Name</label>
                    <input type="text" name="siggy" id="signature"/>

                    <p>I understand this is a legal representation of my signature.</p>
                </fieldset>

                <div className={applyformstyle.accepttermsWrapper}>
                    <p>By clicking "Accept & Submit", I, the undersigned, (a) for the purpose of securing credit, certify the below representations to be correct; (b) authorize financial institutions, as they consider necessary and appropriate, to obtain consumer credit reports on me periodically and to gather employment history, and (c) understand that we, or any financial institution to whom this application is submitted, will retain this application whether or not it is approved, and that it is the applicant's responsibility to notify the creditor of any change of name, address, or employment. We and any financial institution to whom this application is submitted, may share certain non-public personal information about you with your authorization or as provided by law.</p>

                    <label htmlFor="acceptterms"> I accept the above terms. <input type="checkbox" name="accept" id="acceptterms"  /></label>
                </div>

                <button className={applyformstyle.applybutton}>Submit</button>
                
            </form>
        </div>
    )
}

export default Applyform