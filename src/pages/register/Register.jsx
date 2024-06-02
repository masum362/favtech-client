import React from 'react'
import CustomBtn from '../../components/customBtn/CustomBtn'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='flex items-center justify-center w-full min-h-screen'>
    <div className=' border border-gray-500 shadow-md shadow-gray-500 space-y-8 rounded-lg w-1/4 p-8'>
        <h1 className='text-5xl font-bold text-center'>Register</h1>
        <form className='flex flex-col gap-4 w-full'>
            <input type="text" placeholder="Name" className="input input-bordered w-full " />
            <input type="text" placeholder="Email" className="input input-bordered w-full " />
            <input type="text" placeholder="password" className="input input-bordered w-full " />
            <input type="text" placeholder="photoURL" className="input input-bordered  w-full" />
            <CustomBtn text={"Login"} style={"text-lg"} />
        </form>
        <p className='text-lg'>already have an acoount?<Link to={"/login"} className='text-themePrimary font-semibold'>Login</Link></p>


    </div>
</div>
  )
}

export default Register