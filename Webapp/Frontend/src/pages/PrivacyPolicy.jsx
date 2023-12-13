import Footer from "../components/Footer"
import ScrollToTopOnMount from "../components/ScrollToTopOnMont"

import privacypolicystyle from "../styles/privacypolicystyle.module.css"


const PrivacyPolicy = () => {
    return (
        <div className={privacypolicystyle.maincontainer}>

            <ScrollToTopOnMount />

            <h1 className={privacypolicystyle.header}>Privacy Policy</h1>

            <hr style={{margin: '2rem'}}  />

            <main className={privacypolicystyle.mainContainer}>
                <p>This privacy notice reveals how we handle privacy on this website. It specifically pertains to the information gathered exclusively by this website. The notice will inform you about the following:</p>
                <br />
                
                <ol>
                    <li>This notice details the types of personal information obtained from you while using the website, explains the     purposes for which it is utilized, and identifies potential recipients with whom such information may be shared.</li>

                    <li>Choices are available to you regarding the use of your data.</li>

                    <li>Procedures put in place to protect your information.</li>
                </ol>
                <br />

                <p> <strong>Data Gathering, Utilization, and Distribution</strong> </p>
                <p>
                We exclusively possess the data amassed on this website. Our access to and collection of information are limited to what you willingly provide to us through channels such as email or direct contact. It is essential to emphasize that we refrain from trading or leasing this information to any third parties.
                </p>
                <br />
                <p>We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order.
                </p>
                <br />
                <p>Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.</p>
                <br />
                <p><strong>Your Access to and Control Over Information</strong></p>
                <p>You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website:</p>
                <p>– See what data we have about you, if any.</p>
                <p>– Change/correct any data we have about you.</p>
                <p>– Have us delete any data we have about you.</p>
                <p>– Express any concern you have about our use of your data.</p>
                <br />
                <p><strong>Security</strong></p>
                <p>We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.</p>
                <br />
                <p>Wherever we collect sensitive information (such as credit card data), that information is encrypted and transmitted to us in a secure way. You can verify this by looking for a closed lock icon at the bottom of your web browser, or looking for “https” at the beginning of the address of the web page.</p>
                <br />
                <p>While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a secure environment.</p>
                <p>If you feel that we are not abiding by this privacy policy, you should contact us immediately via telephone or via email.</p>
            </main>

            <div>
                <Footer />
            </div>
        </div>
    )
}

export default PrivacyPolicy