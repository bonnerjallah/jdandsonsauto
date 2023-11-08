import { NavLink } from 'react-router-dom'; // Make sure you import NavLink from react-router-dom
import navbarstyle from '../style/navbarstyle.module.css'


const NavbarModal = ({ closeNavBarModal }) => {
    return (
        <div className={navbarstyle.popUpModalMainDivWrapper}>
            <div className={navbarstyle.popUpModalCloseButton}>
                <p onClick={() => { closeNavBarModal(false) }}>X</p>
            </div>
            <ul className={navbarstyle.popUpModalLinks}>
                <NavLink to="/" onClick={() => { closeNavBarModal(false) }}>HOME</NavLink>
                <NavLink to="/Dashboard" onClick={() => { closeNavBarModal(false) }}>DASHBOARD</NavLink>
                <NavLink to="/InventoryManagement" onClick={() => { closeNavBarModal(false) }}>INVENTORY</NavLink>
                <NavLink to="/SalesTransactions" onClick={() => { closeNavBarModal(false) }}>SALES & TRANSACTIONS</NavLink>
                <NavLink to="/CustomerManagement" onClick={() => { closeNavBarModal(false) }}>CUSTOMER MANAGEMENT</NavLink>
                <NavLink to="/ServiceMaintenance" onClick={() => { closeNavBarModal(false) }}>SERVICE & MAINTENANCE</NavLink>
                <NavLink to="/ApptCalendar" onClick={() => { closeNavBarModal(false) }}>APPOINTMENT CALANDER</NavLink>
                <NavLink to='/SalesAnalytics' onClick={() => { closeNavBarModal(false) }}>SALES ANALYTICS</NavLink>
            </ul>
        </div>
    )
}

export default NavbarModal