import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useModerator from "../hooks/useModerator";
import Loading from "../components/loading/Loading";


const ModeratorAuth = () => {
    const { user, loading } = useAuth();
    const [isModerator, isModeratorLoading] = useModerator();
    const location = useLocation();

    if (loading || isModeratorLoading) {
        return <Loading />
    }

    if (user && isModerator) {
        return <Outlet />;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

}

export default ModeratorAuth