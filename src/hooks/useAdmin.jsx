import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAuthSecure from "./useAuthSecure";

const useAdmin = () => {
    const { user, loading } = useAuth();
    console.log(user)
    const authSecure = useAuthSecure();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.uid, 'isAdmin'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            console.log('asking or checking is admin', user)
            const res = await authSecure.get(`/users/admin/${user?.uid}`);
            // console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
}

export default useAdmin