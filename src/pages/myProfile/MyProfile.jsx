import React from 'react'
import useAuth from '../../hooks/useAuth'
import CustomBtn from '../../components/customBtn/CustomBtn'

const MyProfile = () => {
  const { user } = useAuth();
  console.log(user)
  return (
    <div className='w-full  min-h-screen'>

      <div className='w-full flex flex-col items-center justify-start  gap-8 lg:mt-24'>
        <div className=''>
          <img src={user.photoURL} alt="" className='w-24 h-24' />
        </div>
        <div className='flex-1 flex flex-col items-center justify-center text-center gap-4 '>
          {/* <img src={user.photoURL} alt="" className='w-full' /> */}
          <h1 className='text-5xl font-bold'>{user?.displayName}</h1>
          <p className='text-lg fontsemibold'>{user?.email}</p>
          {
            user?.isSubscribed ? <p>Status:Verified</p> : <>
              <CustomBtn text={"Subscribe"} ></CustomBtn>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default MyProfile