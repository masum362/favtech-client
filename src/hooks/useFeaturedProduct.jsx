import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuthSecure from './useAuthSecure'
import useAuthPublic from './useAuthPublic';


const useFeaturedProduct = () => {
    const authPublic = useAuthPublic();
    const { data: featuredProduct = [], isLoading, refetch, } = useQuery({
        queryKey: ["featuredProduct"],
        queryFn: async () => {
            const response = await authPublic("/featuredProduct");
            return response.data;
        }
    })
    return { featuredProduct, isLoading, refetch };
}

export default useFeaturedProduct