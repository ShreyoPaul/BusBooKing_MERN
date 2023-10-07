import React, { useEffect, useState } from 'react'
import "../Navbar.css"
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'

export const Navbar = ({show}) => {
  
  useEffect(() => {
    // if (!Cookies.get("authentication")) setShowNav(false)
    
  }, [Cookies.get("authentication")])

  const handleLogout = () => {
    Cookies.remove("authentication")
    Cookies.remove("name")
    Cookies.remove("email")
  }

  return (
    <div className='nav_container'>
      <NavLink to={'/'} className='name'>BusBooK</NavLink>
      <div className='navlist'>
          <NavLink to={'/'} className='nav'>All Buses</NavLink>
          <NavLink to={'/bookings'} className='nav'>My Bookings</NavLink>
          <NavLink to={'/profile'} className='nav'>Profile</NavLink>
          { show && <NavLink to={'/'} className='nav' onClick={handleLogout}>Logout</NavLink>}
        </div>
          {/* : <div className='navlist'>
            <NavLink to={'/signup'} className='nav'>Sign Up</NavLink>
            <NavLink to={'/login'} className='nav'>Login</NavLink>
          </div> */}
      
    </div>
  )
}
