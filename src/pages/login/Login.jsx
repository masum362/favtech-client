import React, { useState } from 'react'
import CustomBtn from '../../components/customBtn/CustomBtn'
import { Link } from 'react-router-dom'
import gogleLogo from '../../assets/gogle-logo.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from 'react-hook-form'

const Login = () => {
    const [isOpen, setIsOpen] = useState(false)

    const { register, handleSubmit,reset, formState: { errors } } = useForm()

    const handleFormLogin = data => {
        console.log(data)
        reset();
    }
    return (
        <div className='flex items-center justify-center w-full min-h-screen'>
            <div className=' border border-gray-500 shadow-md shadow-gray-500 space-y-8 rounded-lg lg:w-1/3 xl:w-1/4 md:w-1/2 p-8'>
                <h1 className='text-5xl font-bold text-center'>Login</h1>
                <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit(handleFormLogin)}>

                    <div className='w-full'>
                        <input type="text" placeholder="Email" className="input input-bordered w-full " {...register("email", {
                            required: {
                                value: true,
                                message: "email must be required."
                            }
                        })} />
                    </div>
                    {errors.email && <span className='text-red-500'>{errors.email?.message}</span>}
                    <div className='w-full relative'>
                        <input type={isOpen ? "text" : "password"} placeholder="password" className="input input-bordered w-full "  {...register("password", {
                            required: {
                                value: true,
                                message: "password must be required."
                            }
                        })} />
                        {
                            isOpen ? <span className='absolute top-3 right-3 text-2xl cursor-pointer' onClick={() => setIsOpen(!isOpen)}><FaEyeSlash /></span> : <span className='absolute top-3 right-3 text-2xl cursor-pointer' onClick={() => setIsOpen(!isOpen)}><FaEye /></span>
                        }


                    </div>
                    {errors.password && <span className='text-red-500'>{errors.password?.message}</span>}
                    <CustomBtn text={"Login"} style={"text-lg"} btnType={"submit"} />
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