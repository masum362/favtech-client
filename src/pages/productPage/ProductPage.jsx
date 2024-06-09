import React from 'react'
import useAuth from '../../hooks/useAuth'
import useAuthSecure from '../../hooks/useAuthSecure';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowUp } from 'react-icons/io';
import Swal from 'sweetalert2'

const ProductPage = () => {
    const { user } = useAuth();
    const authSecure = useAuthSecure();
    const { id } = useParams()
    const { data: product = {}, isLoading, refetch } = useQuery({
        queryKey: ["product"],
        queryFn: async () => {
            const response = await authSecure(`/product/${id}`)
            console.log(response);
            return response.data;
        }
    });
    const { data: reviews = [], isLoading:reviewsIsLoading, refetch:reviewsRefetch } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const response = await authSecure(`/reviews/${id}`)
            console.log(response);
            return response.data;
        }
    });


    const handleUpVote = async (productId, userId) => {
        console.log(userId, productId);
        console.log('clicked')
        if (!user) {
            navigate("/login")
        }
        else {
            const response = await authSecure.patch(`/upvote/${productId}`, { userId });
            console.log(response);
            if (response.status === 200) {
                // alert('Upvote updated successfully');
                refetch();
            }
        }
    }


    const handleReport = async (productId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Report it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await authSecure.post(`/add-reported-content/${productId}`)
                if (response.status === 200) {
                    Swal.fire({
                        title: "Reported!",
                        text: "This product has been reported.",
                        icon: "success"
                    });
                    refetch()
                }

            }
        });


    }

    return (
        <div className='mt-20'>
            {
                product && <div className='w-full py-12'>
                    <img src={product.imageURL} alt="product-image" className='w-full h-96 object-contain' />
                    <div className='flex items-center justify-center flex-col gap-4  mx-auto my-12  max-w-3xl'>
                        <h1 className='text-xl md:text-3xl lg:text-5xl font-bold'>{product.name}</h1>
                        <p className='my-4'>{product.description}</p>
                        <div className='flex items-start justify-start gap-4 w-full'>
                            {
                                product.tags?.map(tag => <span className='bg-transparent border border-themePrimary font-bold p-2 rounded-xl text-center hover:bg-themePrimary duration-300 hover:text-white ' key={tag}>{tag}</span>)
                            }
                        </div>
                        <div className='flex items-center justify-between gap-4 w-full'>
                            <div className='flex items-center justify-start gap-4'>
                                <button
                                    className='bg-red-500 text-white font-bold p-4 rounded-lg hover:bg-red-800 duration-300'
                                    onClick={() => handleReport(product._id)}
                                >Report Product</button>

                                <button disabled={product.owner?.uid === user?.uid} onClick={() => handleUpVote(product._id, user?.uid)} className={`${product.upvotedUsers?.includes(user?.uid) ? "bg-themePrimary" : "bg-slate-900"} px-2 py-1 md:px-4 md:py-2 flex items-center justify-center rounded-lg font-bold hover:bg-slate-800 duration-150`}>
                                    <span className='text-white '>{product.upvote}</span>
                                    <span className='text-white'><IoIosArrowUp size={26} /></span>
                                </button>
                            </div>
                            <Link to={product.external_links} target='_blank'>
                                <button
                                    className='btn bg-accent'

                                >
                                    Check The Product</button></Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductPage