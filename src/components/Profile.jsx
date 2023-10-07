import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import "../Profile.css"
import { NavLink } from 'react-router-dom'

const Profile = () => {
    const [user, setUser] = useState()
    const getUserDetails = async () => {
        try {
            const email = Cookies.get("email")

            const apiCall = await fetch(`https://book-ticket-nz04z2lvw-shreyopaul.vercel.app/login`, {
                method: "POST",
                headers: {
                    "Content-type": "Application/json"
                },
                body: JSON.stringify({ email })
            })
            const res = await apiCall.json()
            setUser(res.data[0])
            if (res.data) return res.data[0]
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <div className='profile_container'>
            <div className='heading'>
                Profile
            </div>
            <div className='details'>
                <div className='profile_name'>
                    Name: {user?.name}
                </div>
                <div className='profile_email'>
                    E-mail: {user?.email}
                </div>
            </div>
            {/* <div className='bookings_btn'> */}
                <NavLink className='bookings' to={"/bookings"}>Bookings</NavLink>
            {/* </div> */}
        </div>
    )
}

export default Profile