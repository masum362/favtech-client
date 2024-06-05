import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useModerator from "../hooks/useModerator";


const ModeratorAuth = () => {
    const { user, loading } = useAuth();
    const [isModerator, isModeratorLoading] = useModerator();
    const location = useLocation();

    if (loading || isModeratorLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isModerator) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

}

export default ModeratorAuth