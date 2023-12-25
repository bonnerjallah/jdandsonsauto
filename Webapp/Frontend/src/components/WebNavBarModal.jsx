import { NavLink } from 'react-router-dom'; 
import navbarstyle from "../styles/navbarstyle.module.css"


const WebNavBarModal = ({closeNavBarModal}) => {
    return (
        <div className={navbarstyle.modalMainContainer} >
            <div className={navbarstyle.closeWrapper}>
                <p onClick={() => { closeNavBarModal(false) }}>X</p>
            </div>
            <ul  className={navbarstyle.modalLinks}>
                <NavLink to="/" onClick={() => { closeNavBarModal(false) }}>HOME</NavLink>
                <NavLink to="/InventoryPage" onClick={() => { closeNavBarModal(false) }}>INVENTORY</NavLink>
                <NavLink to="/CarFinder" onClick={() => { closeNavBarModal(false) }}>CAR FINDER</NavLink>
                <NavLink to="/ApplyOnLine/:" onClick={() => { closeNavBarModal(false) }}>APPLY ONLINE</NavLink>
                <NavLink to="/AboutUs" onClick={() => { closeNavBarModal(false) }}>ABOUT US</NavLink>
                <NavLink to="/ContactUs" onClick={() => { closeNavBarModal(false) }}>CONTACT US</NavLink>
            </ul>
        </div>    
    )
}

export default WebNavBarModal




