import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import { Navbar } from './components/Navbar'
import Signup from './components/Signup'
import Home from './components/Home'
import Bookings from './components/Bookings'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import Profile from './components/Profile'

function App() {
  const navigate = useNavigate()
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    if (!Cookies.get("authentication")) {
      navigate("/signup")
      // setShowNav(false)
    }
    if (Cookies.get("authentication") === true) {
      toast.success("Login successful!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setShowNav(Cookies.get("authentication"))
  }, [Cookies.get("authentication")])


  return (
    // <BrowserRouter>
    <>
      <Navbar show={showNav} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/*  </BrowserRouter> */}
    </>
  )
}

export default App
