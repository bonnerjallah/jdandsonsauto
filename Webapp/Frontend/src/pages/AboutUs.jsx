import aboutusstyle from '../styles/aboutusstyle.module.css'


import Footer from "../components/Footer"
import MapComponent from "../components/Map"
import ScrollToTopOnMount from '../components/ScrollToTopOnMont'





const AboutUs = () => {
    return (
        <div className={aboutusstyle.mainContainer}>
            <ScrollToTopOnMount />
            <div className={aboutusstyle.header}>

            </div>
            <div className={aboutusstyle.headerWrapper}>
                <h1>ABOUT US</h1>
            </div>

            <div className={aboutusstyle.mainWrapper}>
                <div className={aboutusstyle.imageWrapper}>
                    <img src="../../src/assets/greybenz.jpg" alt="" width="100%" height='100%'/>
                </div>
                <div className={aboutusstyle.textWrapper}>
                    <h2>WELCOME TO JD AND SONS AUTO BROKERS</h2>
                    <p>With our skilled sales staff, we’ll help you get the vehicle you want, at the great price you deserve. Our goal is for you to be so delighted with your vehicle purchase that you’ll come see us when you need your next car and will happily recommend us to friends and family. Customer referrals are the ultimate compliment.</p>

                    <p>With many vehicle shopping options available, we differentiate ourselves by understanding our local car-buying community and satisfying its needs; helping valued local customers like you, find the vehicle that’s the “right fit” at the right price.</p>

                    <p>Feel free to browse our inventory online and check out the Featured Vehicles section on our homepage. If you see a vehicle you like, submit an online quote request, or contact us.</p>    
                </div>
            </div>

            <div className={aboutusstyle.mapAndHoursContainer}>
                <div className={aboutusstyle.mapWrapper}>
                    <MapComponent  />

                </div>
                <div className={aboutusstyle.hoursWrapper}>

                    <h2 style={{marginBottom: '.6rem'}}>Bussiness Hours</h2>
                    <div className={aboutusstyle.businessHoursWrapper}>
                        <div style={{fontWeight: 'bold'}}>
                            <div>Monday</div>
                            <div>Tuesday</div>
                            <div>Wednesday</div>
                            <div>Thursday</div>
                            <div>Friday</div>
                            <div>Saturday</div>
                            <div>Sunday</div>
                        </div>
                        <div >
                            <div>10:00 AM - 06:00 PM</div>
                            <div>10:00 AM - 06:00 PM</div>
                            <div>10:00 AM - 06:00 PM</div>
                            <div>10:00 AM - 06:00 PM</div>
                            <div>10:00 AM - 06:00 PM</div>
                            <div>10:00 AM - 05:00 PM</div>
                            <div>By Appointment Only</div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Footer />
            </div>

        </div>
        
    )
}

export default AboutUs