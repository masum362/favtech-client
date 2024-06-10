import { useQuery } from '@tanstack/react-query'
import useAuthSecure from './useAuthSecure'
import useAuthPublic from './useAuthPublic';

const useTrendingProducts = () => {
    const authPublic = useAuthPublic();
    const { data: products = [], isLoading, refetch, } = useQuery({
        queryKey: ["trendingProducts"],
        queryFn: async () => {
            const response = await authPublic("/trending-products");
            return response.data;
        }
    })
    return { products, isLoading, refetch };
}

export default useTrendingProducts