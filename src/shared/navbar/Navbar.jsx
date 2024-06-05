import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import CustomBtn from '../../components/customBtn/CustomBtn'
import useAuth from '../../hooks/useAuth'

const Navbar = () => {
    const { user, LogOutUser } = useAuth();
    console.log(user)

    const handleLogOut = () => {
        LogOutUser().then(res => {
            console.log('user logged out');
        })

    }

    return (
        <div>
            <div className="navbar bg-base-100 w-full fixed top-0 left-0 border-b border-gray-300 md:py-4 md:px-8 z-[999] ">
                <div className=" navbar-start ">
                    <div className="dropdown md:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><NavLink className={({ isActive }) => `${isActive && 'text-themePrimary'} hover:text-themePrimary capitalize active:text-themeSecondary `} to={"/"}>home</NavLink></li>
                            <li><NavLink className={({ isActive }) => `${isActive && 'text-themePrimary'} hover:text-themePrimary capitalize active:text-themeSecondary `} to={"/products"}>products</NavLink></li>

                        </ul>
                    </div>
                    <div className='text-white bg-themePrimary w-10 h-10 font-bold rounded-full flex items-center justify-center'>
                        <h1 className='text-3xl' >P</h1>
                    </div>

                </div>
                <div className=" navbar-center hidden md:flex">
                    <ul className="flex items-center justify-center gap-8 px-1 text-lg font-medium">
                        <li><NavLink className={({ isActive }) => `${isActive && 'text-themePrimary'} hover:text-themePrimary capitalize active:text-themeSecondary `} to={"/"}>home</NavLink></li>
                        <li><NavLink className={({ isActive }) => `${isActive && 'text-themePrimary'} hover:text-themePrimary capitalize active:text-themeSecondary `} to={"/products"}>products</NavLink></li>

                    </ul>

                </div>
                <div className='navbar-end text-lg font-semibold gap-4 '>
                    {
                        user ? <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="User profile picture" src={user?.photoURL} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  bg-base-100 rounded-box w-52  text-lg ">
                                <h1 className='text-2xl font-bold text-center m-4 text-themePrimary'>{user?.displayName}</h1>
                                <li>
                                    {
                                        user?.role === "user" && <Link to={"/user/my-profile"} className="justify-between hover:text-themePrimary capitalize active:text-themeSecondary hover:bg-themeSecondary active:bg-themePrimary text-black">
                                            Dashboard
                                        </Link>
                                    }
                                    {
                                        user?.role === "admin" && <Link to={"/admin/statistic"} className="justify-between hover:text-themePrimary capitalize active:text-themeSecondary hover:bg-themeSecondary active:bg-themePrimary text-black">
                                            Dashboard
                                        </Link>
                                    }
                                    {
                                        user?.role === "moderator" && <Link to={"/moderator/product-reviews"} className="justify-between hover:text-themePrimary capitalize active:text-themeSecondary hover:bg-themeSecondary active:bg-themePrimary text-black">
                                            Dashboard
                                        </Link>
                                    }
                                </li>
                                <li><button onClick={handleLogOut} className='hover:text-themePrimary capitalize active:text-themeSecondary hover:bg-themeSecondary text-black'>Logout</button></li>
                            </ul>
                        </div> : <>

                            <Link to={"/login"}><CustomBtn text={"Login"} style={"hover:text-themePrimary capitalize active:text-themeSecondary"} /></Link>
                            <Link to={"/register"}><CustomBtn text={"Register"} style={"hover:text-themePrimary capitalize active:text-themeSecondary hidden sm:block"} /></Link>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar