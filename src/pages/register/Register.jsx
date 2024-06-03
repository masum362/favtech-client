import React, { useState } from 'react'
import CustomBtn from '../../components/customBtn/CustomBtn'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { RegisterUser, updateUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate();

    const handleOnSubmit = ({ email, password, photoURL, name }) => {
        RegisterUser(email, password).then(result => {
            updateUser(result.user, name, photoURL,).then(async (res) => {
                console.log('user updated')
                toast.success('Successfully Registered user', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }).catch(err => console.log(err.message));
        })
    }

    return (
        <div className='flex items-center justify-center w-full min-h-screen'>
            <ToastContainer />
            <div className=' border border-gray-500 shadow-md shadow-gray-500 space-y-8 rounded-lg lg:w-1/3 xl:w-1/4 md:w-1/2 p-8'>
                <h1 className='text-5xl font-bold text-center'>Register</h1>
                <form onSubmit={handleSubmit(handleOnSubmit)} className='flex flex-col gap-4 w-full'>
                    <div className='w-full'>
                        <input type="text" placeholder="Name" className="input input-bordered w-full " {...register("name", {
                            required: {
                                value: true,
                                message: "name must be required."
                            }
                        })} />
                    </div>
                    {errors.name && <span className='text-red-500'>{errors.name?.message}</span>}
                    <div className='w-full'>
                        <input type="text" placeholder="Email" className="input input-bordered w-full "  {...register("email", {
                            required: {
                                value: true,
                                message: "email must be required."
                            }
                        })} />
                    </div>
                    {errors.email && <span className='text-red-500'>{errors.email?.message}</span>}
                    <div className='w-full relative'>
                        <input type={isOpen ? "text" : "password"} placeholder="password" className="input input-bordered w-full "  {...register("password", {
                            minLength: {
                                value: 6,
                                message: "password must be at least 6 characters",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                                message: "password must be at least one Uppercase letter and one lowercase letter",
                            },
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
                    <div className='w-full'>
                        <input type="text" placeholder="photoURL" className="input input-bordered  w-full" name="photoURL"  {...register("photoURL", {
                            required: {
                                value: true,
                                message: "photoURL must be required."
                            }
                        })} />
                    </div>
                    {errors.photoURL && <span className='text-red-500'>{errors.photoURL?.message}</span>}
                    <CustomBtn text={"Register"} style={"text-lg"} btnType={"submit"} />
                </form>
                <p className='text-lg'>already have an acoount?<Link to={"/login"} className='text-themePrimary font-semibold'>Login</Link></p>


            </div>
        </div>
    )
}

export default Register