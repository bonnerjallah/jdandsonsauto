import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'



import Navbar from './components/Navbar'

import Home from './pages/Home'
import Inventory from './pages/Inventory'
import CarFinder from './pages/CarFinder'
import ApplyOnLine from './pages/ApplyOnLine'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar /> } >
      <Route path="/" element={<Home /> } />
      <Route path="Inventory" element={<Inventory />} />
      <Route path="CarFinder" element={<CarFinder />} />
      <Route path="/ApplyOnLine" element={<ApplyOnLine />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="ContactUs" element={<ContactUs /> } />
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
