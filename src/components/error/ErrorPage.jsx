import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center flex-col gap-4'>
        <div className='flex flex-col items-center justify-center gap-4'>
            <h1 className='text-9xl font-bold'>Ooops</h1>
            <p className='text-xl '>Something went wrong!</p>
            <Link to={"/"}><button className='btn bg-transparent border-2 border-themePrimary hover:bg-themePrimary hover:text-white'>Back To Home</button></Link>
                    </div>
    </div>
  )
}

export default ErrorPage