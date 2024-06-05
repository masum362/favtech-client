import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const OnlyUserAuth = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && user?.role === "user") {
        return <Outlet />;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

}

export default OnlyUserAuth