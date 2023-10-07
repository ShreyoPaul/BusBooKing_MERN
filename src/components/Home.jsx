import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import CustomModal from './Modal';

const Home = () => {
    const today = new Date()
    const currentDate = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear()
    const navigate = useNavigate()
    const [busData, setBusData] = useState([])

    useEffect(() => {
        if (!Cookies.get("authentication")) {
            navigate("/signup")
        }
    }, [])


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const [updated, setUpdated] = useState([]);

    
    const openModal = async (id) => {
        try {
            const apiCall = await fetch(`https://book-ticket-nz04z2lvw-shreyopaul.vercel.app/${id}`, {
                method: "GET",
                headers: {
                    "Content-type": "Application/json"
                },
            })
            const res = await apiCall.json()
            if (res.data) {
                setModalData(res.data[0])
                setUpdated(res.data[0].seat)
            }
        } catch (error) {
            console.log(error)
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalData({})
        setIsModalOpen(false);
    };

    const customStyle = {
        content: {
            width: '70%',     // Set the desired width as a percentage
            maxWidth: '600px', // Optionally, set a maximum width
            height: '80vh',   // You can adjust the height as needed
            margin: 'auto',   // Center the modal horizontally
            padding: '5%'
        },
    };

    const getData = async () => {
        try {
            const apiCall = await fetch("https://book-ticket-nz04z2lvw-shreyopaul.vercel.app/", {
                method: "GET",
                headers: {
                    "Content-type": "Application/json"
                },
            })
            const res = await apiCall.json()
            if (res.data) {
                setBusData(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])


    return (
        <div className='home'>
            <div className='all_bus_heading'>
                <div> Available Bus Services <span className='date'>on {currentDate}</span></div>

            </div>
            <div className='card_container'>
                {
                    busData.map((obj, idx) => {
                        const seatCount = obj.seat.filter((seat) => { return seat === false })
                        return (
                            <div className='card' key={idx}>
                                <div className='bus_name'>{obj.name}</div>
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
                                <div className='seat'>
                                    <div className='seat_avail'>* {seatCount.length} {seatCount.length == 1 ? "seat" : "seats"} available</div>
                                    <div className='book_btn' onClick={() => openModal(obj._id)}>Book</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <CustomModal isOpen={isModalOpen} onRequestClose={closeModal} customStyle={customStyle} data={modalData} updateArr={updated} setUpdated={setUpdated} />
        </div>
    )


}

export default Home