import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'


import Navbar from './components/Navbar'
import Home from './pages/Home'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar /> } >
      <Route path='/' element={<Home /> } />

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
