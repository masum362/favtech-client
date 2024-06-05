import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAuthSecure from "./useAuthSecure";

const useModerator = () => {
    const { user, loading } = useAuth();
    const authSecure = useAuthSecure();
    const { data: isModerator, isPending: isModeratorLoading } = useQuery({
        queryKey: [user?.uid, 'isModerator'],
        enabled: !loading && !user?.email,
        queryFn: async () => {
            console.log('asking or checking is Moderator', user)
            const res = await authSecure.get(`/users/moderator/${user.email}`);
            // console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isModerator, isModeratorLoading]
}

export default useModerator