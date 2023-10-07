import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            const apiCall = await fetch("https://book-ticket-nz04z2lvw-shreyopaul.vercel.app/signup", {
                method: "POST",
                headers: {
                    "Content-type": "Application/json"
                },
                body: JSON.stringify({
                    name, email, password, history: []
                })
            })
            const res = await apiCall.json()
            if (res) {
                Cookies.set("name", name, true, { expires: 14 })
                Cookies.set("email", email, true, { expires: 14 })
                Cookies.set("authentication", true, { expires: 14 })
                setEmail("")
                setName("")
                setPassword("")
                navigate("/")
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
            else {
                toast.error(res.message, {
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
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='container'>
            <div className='signup_container'>
                <div className='title'>Sign Up</div>
                <div className='email'>
                    <div className=''>Name</div>
                    <div className='input'>
                        <input placeholder='Enater your name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div className='email'>
                    <div className=''>Email</div>
                    <div className='input'>
                        <input placeholder='Enater your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className='password'>
                    <div className=''>Password</div>
                    <div className='input'>
                        <input placeholder='Enater your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className='text'>Already have account? <NavLink to={"/login"}>Login</NavLink></div>
                <div className='flexing'>
                    <div className='submit' onClick={handleSubmit}>Submit</div>
                </div>
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

export default Signup