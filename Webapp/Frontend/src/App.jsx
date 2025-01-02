import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'



import Navbar from './components/Navbar'

import Home from './pages/Home'
import CarFinder from './pages/CarFinder'
import ApplyOnLine from './pages/ApplyOnLine'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import ViewDetails from './pages/ViewDetails'
import InventoryPage from './pages/InventoryPage'
import PrivacyPolicy from './pages/PrivacyPolicy'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar /> } >
      <Route path="/" element={<Home /> } />
      <Route path="InventoryPage" element={<InventoryPage />} />
      <Route path="CarFinder" element={<CarFinder />} />
      <Route path="/ApplyOnLine/:id" element={<ApplyOnLine />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="ContactUs" element={<ContactUs /> } />
      <Route path="ViewDetails/:_id" element={<ViewDetails /> } />
      <Route path="PrivacyPolicy" element={<PrivacyPolicy /> } />
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
