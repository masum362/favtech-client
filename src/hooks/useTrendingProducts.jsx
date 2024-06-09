import { useQuery } from '@tanstack/react-query'
import useAuthSecure from './useAuthSecure'

const useTrendingProducts = () => {
    const authSecure = useAuthSecure();
    const { data: products = [], isLoading, refetch, } = useQuery({
        queryKey: ["trendingProducts"],
        queryFn: async () => {
            const response = await authSecure("/trending-products");
            return response.data;
        }
    })
    return { products, isLoading, refetch };
}

export default useTrendingProducts