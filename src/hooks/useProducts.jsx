import React from 'react'
import useAuthPublic from './useAuthPublic'
import { useQuery } from '@tanstack/react-query';

const useProducts = () => {
    const authPublic = useAuthPublic();

    const { data: numberOfProducts=0, refetch, isError } = useQuery({
        queryKey: ["numberOfProducts"],
        queryFn: async () => {
            const response = await authPublic('/number-of-products')
            console.log(response);
            return parseInt(response.data);
        }
    })
    console.log(numberOfProducts)
    return [numberOfProducts]
}

export default useProducts