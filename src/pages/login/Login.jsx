import React, { useState } from 'react'
import CustomBtn from '../../components/customBtn/CustomBtn'
import { Link } from 'react-router-dom'
import gogleLogo from '../../assets/gogle-logo.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='flex items-center justify-center w-full min-h-screen'>
            <div className=' border border-gray-500 shadow-md shadow-gray-500 space-y-8 rounded-lg w-1/4 p-8'>
                <h1 className='text-5xl font-bold text-center'>Login</h1>
                <form className='flex flex-col gap-4 w-full'>

                    <div className='w-full'>
                        <input type="text" placeholder="Email" className="input input-bordered w-full " />
                    </div>
                    <div className='w-full relative'>
                        <input type={isOpen ? "text" : "password"} placeholder="password" className="input input-bordered w-full " />
                        {
                            isOpen ? <span className='absolute top-3 right-3 text-2xl cursor-pointer' onClick={() => setIsOpen(!isOpen)}><FaEyeSlash /></span> : <span className='absolute top-3 right-3 text-2xl cursor-pointer' onClick={() => setIsOpen(!isOpen)}><FaEye /></span>
                        }


                    </div>
                    <CustomBtn text={"Login"} style={"text-lg"} />
                </form>
                <p className='text-lg'>Don't have an acoount?<Link to={"/register"} className='text-themePrimary font-semibold'>Register</Link></p>

                <button className='w-full'>
                    <div className='w-full h-12 flex items-center justify-center  border-2 border-blue-500 rounded-full '>
                        <img src={gogleLogo} alt="gogleLogo" className='w-10 h-10 m-2' />

                        <h1 className='w-full font-semibold h-full text-center text-lg flex items-center justify-center'>sign in with gogle</h1>



                    </div>
                </button>
            </div>
        </div>
    )
}

export default Login