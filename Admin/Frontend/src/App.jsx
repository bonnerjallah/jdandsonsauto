import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { AuthProvider } from "./components/AuthContext"



import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import InventoryManagement from "./pages/InventoryManagement"
import SalesTransactions from "./pages/SalesTransactions"
import CustomerManagement from "./pages/CustomerManagement"
import ServiceMaintenance from "./pages/ServiceMaintenance"
import ProtectedRoutes from "./components/ProtectedRoutes"
import ApptCalendar from "./components/apptCalendar"
import AddNewVehicle from "./pages/AddNewVehicle"
import SalesAnalytics from "./pages/SalesAnalytics"
import Uploadprofilepic from "./pages/uploadprofilepic"
import VehicleUpdate from "./pages/VehicleUpdate"
import MessageCenter from "./pages/MessageCenter"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar /> } >
      <Route path="/" element={<Home /> } />
      <Route path="Login" element={<Login /> } />
      <Route path="SignUp" element={<SignUp /> } />
      <Route element={<ProtectedRoutes />} >
        <Route path="/Dashboard" element={<Dashboard /> } />
        <Route path="/InventoryManagement" element={<InventoryManagement /> } />
        <Route path="/SalesTransactions" element={<SalesTransactions /> } />
        <Route path="/CustomerManagement" element={<CustomerManagement /> } />
        <Route path="/ServiceMaintenance" element={<ServiceMaintenance /> } />
        <Route path="/VehicleUpdate/:_id" element={<VehicleUpdate />} />
        
        <Route path="/ApptCalendar" element={<ApptCalendar />} />
        <Route path="/AddNewVehicle" element={<AddNewVehicle /> } />
        <Route path="/SalesAnalytics" element={<SalesAnalytics /> } />
        <Route path="/Uploadprofilepic" element={<Uploadprofilepic /> } />
        <Route path="/MessageCenter" element={<MessageCenter /> } />
      </Route> 
    </Route>
  )
)



const App = () => {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  )
}

export default App