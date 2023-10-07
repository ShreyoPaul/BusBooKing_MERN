import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Booking.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'

const Bookings = () => {
    const navigate = useNavigate()
    const [history, setHistory] = useState([])
    const [bus, setBus] = useState()

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
            if (res.data) return res.data[0]
        } catch (error) {
            console.log(error)
        }
    }

    const getData = async () => {
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
            if (res.data) {
                setHistory(res.data[0].history)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const cancelTicket = async (index) => {
        try {
            const user = await getUserDetails()
            const apiCall = await fetch(`https://book-ticket-nz04z2lvw-shreyopaul.vercel.app/history`, {
                method: "PATCH",
                headers: {
                    "Content-type": "Application/json"
                },
                body: JSON.stringify({ email: user.email, password: user.password, indexToRemove: index })
            })
            const res = await apiCall.json()

            if (res.data) {
                setBus(res.data)
                const apiCall2 = await fetch(`https://book-ticket-nz04z2lvw-shreyopaul.vercel.app/cancel/${res.data.busID}`, {
                    method: "PATCH",
                    headers: {
                        "Content-type": "Application/json"
                    },
                    body: JSON.stringify({ seat: res.data.seat })
                })
                const res2 = await apiCall2.json()
                if (res2) {
                    toast.success(res.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    navigate("/")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (!Cookies.get("authentication")) navigate("/signup")
        getData()
    }, [])

    return (
        <div className='my_bookings'>
            <div className='all_bookings'>
                <div> Booking Records</div>
            </div>
            <div className='booking_container'>
                {
                    history.length > 0 && history?.map((obj, idx) => {
                        return (
                            <div className='card' key={idx}>
                                <div className='bus_name'>{obj.name}</div>
                                <div className='seatno'>
                                    <div className='seatno_text'>Seat No. </div>
                                    <div className='tickets'>
                                        {
                                            obj.seat.map((seat, id) => {
                                                return (
                                                    <div className='seatno_ticket' key={id}>{seat + 1}</div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='bus_time'>
                                    <div className='depart'>{obj.depart_time}</div>
                                    <div className='dis'>-</div>
                                    <div className='arrive'>{obj.arrival_time}</div>
                                </div>
                                <div className='bus_place'>
                                    <div className='from_place'>
                                        <div className='from'>From</div>
                                        <div className='place1'>{obj.from}</div>
                                    </div>
                                    <div className='to_plcae'>
                                        <div className='to'>To</div>
                                        <div className='place2'>{obj.to}</div>
                                    </div>
                                </div>
                                <div className='cancel'>
                                    <div className='cancel_btn' onClick={() => { cancelTicket(idx) }}>Cancel</div>
                                </div>
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
                            </div>
                        )
                    })
                }
                {
                    history.length === 0 &&
                    <div className='noBooking'>
                        No Booking available!
                    </div>
                }
            </div>
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
        </div>
    )
}

export default Bookings