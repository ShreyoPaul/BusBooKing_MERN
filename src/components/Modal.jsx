import React, { useState } from 'react';
import Modal from 'react-modal';
import "../Modal.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

Modal.setAppElement('#root');

function CustomModal({ isOpen, onRequestClose, customStyle, data, updateArr, setUpdated }) {


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

    const handleBook = async () => {
        try {
            const apiCall1 = await fetch(`https://book-ticket-nz04z2lvw-shreyopaul.vercel.app/${data._id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "Application/json"
                },
                body: JSON.stringify({
                    seat: updateArr
                })
            })
            const res1 = await apiCall1.json()

            const user = await getUserDetails()

            function findTrueIndexes(boolArray, dataArray) {
                const trueIndexes = [];
                boolArray.forEach((value, index) => {
                    if (value === true && data.seat[index] !== true) {
                        trueIndexes.push(index);
                    }
                });
                return trueIndexes;
            }

            const indexArr = findTrueIndexes(updateArr, data.seat)

            const bus = {
                _id: data._id,
                name: data.name,
                seats: data.seats,
                from: data.from,
                to: data.to,
                depart_time: data.depart_time,
                arrival_time: data.arrival_time,
                seat: indexArr
            }

            const apiCall2 = await fetch(`https://book-ticket-nz04z2lvw-shreyopaul.vercel.app/history`, {
                method: "POST",
                headers: {
                    "Content-type": "Application/json"
                },
                body: JSON.stringify({
                    email: user.email, password: user.password, bus
                })
            })
            const res2 = await apiCall2.json()

            if (res1 && res2) {
                toast.success("Ticket booked!", {
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
            onRequestClose()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Example Modal"
            style={customStyle}>

            <h2 className='heading'>Select seats</h2>
            <div className='seats'>
                {
                    data?.seat?.map((seat, index) => {
                        const [seatColor, setSeatColor] = useState(false)
                        const [pushSeat, setPushSeat] = useState(true)

                        const handleSeat = (i) => {
                            setPushSeat(!pushSeat)

                            let updatedArray = [...updateArr];
                            updatedArray[i] = pushSeat;
                            setUpdated(updatedArray);

                            setSeatColor(!seatColor)
                        }
                        if (seat === true)
                            return (
                                <div key={index} className="seat filled">
                                    {index + 1}
                                </div>
                            )

                        else return (
                            <div key={index} className={`seat ${seatColor ? "activeSeat" : ""}`} onClick={() => { handleSeat(index) }}>
                                {index + 1}
                            </div>
                        )
                    })
                }

            </div>
            <div className='btns'>
                <div className='btn' onClick={onRequestClose}>Back</div>
                <div className='btn' onClick={handleBook}>Book</div>
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
        </Modal>
    );
}

export default CustomModal;
