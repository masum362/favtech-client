import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import Loading from "../components/loading/Loading";

const AdminAuth = () => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    console.log(user,isAdmin)
    if (loading || isAdminLoading) {
        return <Loading></Loading>
    }

    if (user && isAdmin) {
        return <Outlet />;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>
}

export default AdminAuth