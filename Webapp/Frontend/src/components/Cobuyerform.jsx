import applyformstyle from '../styles/applyformstyle.module.css'

const Cobuyerform = () => {
    return (
        <div>
            <div className={applyformstyle.hasacobuyerContainer}>
                <p>
                    <label htmlFor="hasacobuyer">Has a Co-buyer? <input type="checkbox" name='acobuyer' id='hasacobuyer' /></label>
                </p>

                <label htmlFor="relationtype"></label>
                <select name="relation" id="telationtype">
                    <option value="">Select relationship type</option>
                    <option value="Co-habitant">Co-habitant</option>
                    <option value="parent">Parent</option>
                    <option value="spouse">Spouse</option>
                    <option value="relative">Relative</option>
                    <option value="Register Domestic Partner">Register Domestic Partner</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <form>
                <fieldset className={applyformstyle.firstfieldset}>
                    <h4>CLIENT INFORMATION</h4>

                    <label htmlFor="coBuyerFirstName">First Name</label>
                    <input type="text" name="cobuyerfirstname" id="coBuyerFirstName" required />

                    <label htmlFor="coBuyerLastName">Last Name</label>
                    <input type="text" name="cobuyerlastname" id="coBuyerLastName" required/>
                    
                    <label htmlFor="coBuyerstAddress">Street Address</label>
                    <input type="text" name="streetaddress" id="coBuyerstAddress" required />
                    <br />

                    <label htmlFor="coBuyercityinfo">City</label>
                    <input type="text" name="cobuyercity" id="coBuyercityinfo" required/>

                    <label htmlFor="coBuyerstateinfo">State</label>
                    <select name="cobuyerstate" id="coBuyerstateinfo" required>
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

                    <label htmlFor="coBuyerzipCode"> Zip Code</label>
                    <input type="number" name="cobuyerzip" id="coBuyerzipCode" required/>

                    <label htmlFor="coBuyeremailinfo">Email</label>
                    <input type="email" name="cobuyeremail" id="coBuyeremailinfo" />
                    <br />

                    <label htmlFor="coBuyerhomePhone">Home Phone</label>
                    <input type="number" name="cobuyerhomephone" id="coBuyerhomePhone" />

                    <label htmlFor="coBuyercellPhone">Cell Phone</label>
                    <input type="number" name="cobuyercellphone" id="coBuyercellPhone" required />

                    <label htmlFor="coBuyerSSnumber">SSN</label>
                    <input type="number" name="cobuyerssnumber" id="coBuyerSSnumber" required />
                    <br />

                    <label htmlFor="coBuyerDOB">Date of Birth</label>
                    <input type="date" name="cobuyerdateofbirth" id="coBuyerDOB" required />

                    <label htmlFor="coBuyerDLstate">Driver's License State</label>
                    <select name="cobuyerdlstate" id="coBuyerDLstate" required>
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

                    <label htmlFor="coBuyerdlNumber">Driver's License Number</label>
                    <input type="number" name="cobuyerdlnumber" id="coBuyerdlNumber" required />
                    <br />

                    <label htmlFor="coBuyerdlIssueDate">Driver's License Issue Date</label>
                    <input type="date" name="cobuyerdlissuedate" id="coBuyerdlIssueDate" required />

                    <label htmlFor="coBuyerdlExpDate">Driver's License Expiry Date</label>
                    <input type="date" name="cobuyerdlexpdate" id="coBuyerdlExpDate"  required />
                </fieldset>

                <fieldset className={applyformstyle.secondfieldset} >
                    <h4>RESIDENTIAL INFORMATION</h4>
                    
                    <label htmlFor="coBuyerhousing">Housing Type</label>
                    <select name="cobuyerhousingtype" id="coBuyerhousing" required>
                        <option value=""></option>
                        <option value="rent">Rent</option>
                        <option value="own">Own</option>
                        <option value="other">Other</option>
                    </select>

                    <label htmlFor="coBuyerrent">Monthly Rent/Mortgage</label>
                    <input type="number" name="cobuyermonthlyrent" id="coBuyerrent" required />

                    <label htmlFor="coBuyerAtAddress">Years at Address</label>
                    <input type="number" name="cobuyeryearsataddress" id="coBuyerAtAddress" placeholder='Year' required />
                    <input type="number" name="cobuyermonthataddress" id="coBuyerAtAddress" placeholder='Month'/>
                </fieldset>

                <fieldset className={applyformstyle.thirdfieldset}>
                    <h4>ADD PREVIOUS ADDRESS</h4>

                    <label htmlFor="coBuyerprevstname">Street Name</label>
                    <input type="text" name="cobuyerprevstreetname" id="coBuyerprevstname" />

                    <label htmlFor="coBuyerprevcity">City</label>
                    <input type="text" name="cobuyerprevcity" id="coBuyerprevcity" />

                    <label htmlFor="coBuyerprevst">State</label>
                    <select name="cobuyerprevst" id="coBuyerprevst">
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

                    <label htmlFor="coBuyerprevzip">Zip Code</label>
                    <input type="number" name="cobuyerprevzipcode" id="coBuyerprevzip" />
                    <br />

                    <label htmlFor="coBuyerprevhousing">Housing Type</label>
                    <select name="cobuyerprevhousingtype" id="coBuyerprevhousing" required>
                        <option value=""></option>
                        <option value="rent">Rent</option>
                        <option value="own">Own</option>
                        <option value="other">Other</option>
                    </select>

                    <label htmlFor="coBuyerprevrent">Monthly Rent/Mortgage</label>
                    <input type="number" name="cobuyerprevmonthlyrent" id="coBuyerprevrent" />

                    <label htmlFor="coBuyerprevAtAddress">Years at Address</label>
                    <input type="number" name="cobuyerprevyearsataddress" id="coBuyerprevAtAddress" placeholder='Year' required />
                    <input type="number" name="cobuyerprevmonthataddress" id="coBuyerprevAtAddress" placeholder='Month' />
                </fieldset>

                <fieldset className={applyformstyle.forthfieldset}>
                    <h4>EMPLOYMENT INFORMATION</h4>

                    <label htmlFor="coBuyerjobname">Employer Name</label>
                    <input type="text" name="cobuyeremployername" id="coBuyerjobname" required />

                    <label htmlFor="coBuyertitleposition">Title/Position</label>
                    <input type="text" name="cobuyerjobtitle" id="coBuyertitleposition" required />

                    <label htmlFor="coBuyerbusinessphonenum">Business Phone Number</label>
                    <input type="number" name="cobuyerbusinessphone" id="coBuyerbusinessphonenum" />
                    <br />

                    <label htmlFor="coBuyermonthlyincome">Gross Monthly Salary</label>
                    <input type="number" name="cobuyerincome" id="coBuyermonthlyincome" required/>

                    <label htmlFor="coBuyeryearsatemployment">Years at Employment</label>
                    <input type="number" name="cobuyeryearsatjob" id="coBuyeryearsatemployment" required />
                </fieldset>

                <fieldset className={applyformstyle.fifthfieldset}>
                    <h4>ADD PREVIOUS EMPLOYMENT</h4>

                    <label htmlFor="coBuyerprevjobname">Employer Name</label>
                    <input type="text" name="cobuyerprevemployername" id="coBuyerprevjobname" required />

                    <label htmlFor="coBuyerprevtitleposition">Title/Position</label>
                    <input type="text" name="cobuyerprevjobtitle" id="coBuyerprevtitleposition" required />

                    <label htmlFor="coBuyerprevbusinessphonenum">Business Phone Number</label>
                    <input type="number" name="cobuyerprevbusinessphone" id="coBuyerprevbusinessphonenum" />
                    <br />

                    <label htmlFor="coBuyerprevmonthlyincome">Gross Monthly Salary</label>
                    <input type="number" name="cobuyerprevincome" id="coBuyerprevmonthlyincome" required/>

                    <label htmlFor="coBuyerprevyearsatemployment">Years at Employment</label>
                    <input type="number" name="cobuyerprevyearsatjob" id="coBuyerprevyearsatemployment" required />
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

export default Cobuyerform