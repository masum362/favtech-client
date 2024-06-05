import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const Dashboard = ({ children }) => {
    const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);
    return (
        <div className='flex'>
            <div className='lg:w-20 w-10'>
                <div className="drawer max-w-full lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center lg:hidden">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            <h1>Md. masum ahmed</h1>
                            <li><a>Sidebar Item 1</a></li>
                            <li><a>Sidebar Item 2</a></li>
                        </ul>

                    </div>
                </div>
            </div>
            {/* content */}
            <div className={`flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out ${sideMenuIsExpand ? "lg:ml-64" : "lg:ml-20"
                }`}>
                {children}
            </div>
        </div>
    )
}

export default Dashboard