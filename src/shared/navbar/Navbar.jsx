import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    const user = {
        displayName:"md. masum ahmed",
        email:"masumahmed@gmail.com",
        photoURL:"https://i.ibb.co/dpGrBT4/avater-1.png"
    }
    return (
        <div>
            <div className="navbar w-full fixed top-0 left-0 border-b border-gray-300 py-4 px-8 ">
                <div className="flex-1">
                    <div className='text-white bg-themePrimary w-10 h-10 font-bold rounded-full flex items-center justify-center'>
                        <h1 className='text-3xl' >P</h1>

                    </div>
                </div>
                <div className="flex-none">
                    <ul className="flex items-center justify-center gap-8 px-1 text-lg font-medium">
                        <li><NavLink className={({ isActive }) => `${isActive && 'text-themePrimary'} hover:text-themePrimary capitalize active:text-themeSecondary `} to={"/"}>home</NavLink></li>
                        <li><NavLink className={({ isActive }) => `${isActive && 'text-themePrimary'} hover:text-themePrimary capitalize active:text-themeSecondary `} to={"/products"}>products</NavLink></li>
                        <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="User profile picture" src={user?.photoURL} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  bg-base-100 rounded-box w-52  ">
                            <h1 className='text-2xl font-bold text-center m-4'>{user?.displayName}</h1>
                            <li>
                                <Link to={"/dashboard"} className="justify-between hover:text-themePrimary capitalize active:text-themeSecondary hover:bg-themeSecondary active:bg-themePrimary">
                                    Dashboard
                                </Link>
                            </li>
                            <li><button className='hover:text-themePrimary capitalize active:text-themeSecondary hover:bg-themeSecondary'>Logout</button></li>
                        </ul>
                    </div>
                    </ul>
                   
                </div>
            </div>
        </div>
    )
}

export default Navbar