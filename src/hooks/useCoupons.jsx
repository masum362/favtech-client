import React from 'react'
import useAuthSecure from './useAuthSecure';
import { useQuery } from '@tanstack/react-query';

const useCoupons = () => {
    const authSecure = useAuthSecure();

    const { data: coupons = [], refetch, isError } = useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {
            const response = await authSecure(`/coupons`);
            return response.data;
        }
    })

    return { coupons, refetch }
}

export default useCoupons