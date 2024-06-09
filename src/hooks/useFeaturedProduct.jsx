import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuthSecure from './useAuthSecure'


const useFeaturedProduct = () => {
    const authSecure = useAuthSecure();
    const { data: featuredProduct = [], isLoading, refetch, } = useQuery({
        queryKey: ["featuredProduct"],
        queryFn: async () => {
            const response = await authSecure("/featuredProduct");
            return response.data;
        }
    })
    return { featuredProduct, isLoading, refetch };
}

export default useFeaturedProduct