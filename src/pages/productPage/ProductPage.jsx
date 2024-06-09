import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useAuthSecure from '../../hooks/useAuthSecure';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowUp } from 'react-icons/io';
import Swal from 'sweetalert2'
import { Rating } from 'react-simple-star-rating'
import { useForm } from 'react-hook-form';

const ProductPage = () => {
    const [postReview, setPostReview] = useState(false)
    const { user } = useAuth();
    const authSecure = useAuthSecure();
    const { id } = useParams()

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            productId: id,
            rating: null,
            reviewDescription: null,
            reviewerEmail: user?.email,
            reviewerImage: user?.photoURL,
            reviewerName: user?.displayName,
            reviewerUid: user?.uid
        }
    })



    const { data: product = {}, isLoading, refetch } = useQuery({
        queryKey: ["product"],
        queryFn: async () => {
            const response = await authSecure(`/product/${id}`)
            console.log(response);
            return response.data;
        }
    });
    const { data: reviews = [], isLoading: reviewsIsLoading, refetch: reviewsRefetch } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const response = await authSecure(`/get-reviews/${id}`)
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


    const [rating, setRating] = useState(null)

    // Catch Rating value
    const handleRating = (rate) => {
        console.log(rate)
        setRating(rate)

        // other logic
    }


    const handleFormSubmit = async (data) => {
        const response = await authSecure.post("/add-review", data);
        console.log(response);
        if (response.status === 200) {
            reviewsRefetch();
            Swal.fire({
                title: "Review Added!",
                text: "Your review about product added successfully!",
                icon: "success"
            });
        }
    }

    useEffect(() => {
        register("rating", { required: "rating is required" })
        setValue("rating", rating)
    }, [rating])

    return (
        <div className='mt-20'>
            {
                product && <div className='w-full'>
                    <img src={product.imageURL} alt="product-image" className='w-full h-96 object-cover' />
                    <div className='flex items-center justify-center flex-col gap-4  mx-auto my-12  max-w-3xl p-2'>
                        <h1 className='text-xl md:text-3xl lg:text-5xl font-bold'>{product.name}</h1>
                        <p className='my-4'>{product.description}</p>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 w-full'>
                            {
                                product.tags?.map(tag => <span className='bg-transparent border border-themePrimary font-bold p-2 rounded-xl text-center hover:bg-themePrimary duration-300 hover:text-white ' key={tag}>{tag}</span>)
                            }
                        </div>
                        <div className='flex items-start sm:items-center justify-between gap-4 w-full'>
                            <div className='flex flex-col-reverse sm:flex-row items-start sm:items-center justify-start gap-4'>
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
                        <div className='w-full'>
                            <div className='flex items-center justify-between'>
                                <h1 className='font-bold text-2xl my-4'>Reviews</h1>
                                <button onClick={() => setPostReview(!postReview)} className='btn bg-themePrimary font-bold text-white hover:bg-red-700 duration-300'>
                                    Post Review
                                </button>
                            </div>
                            {
                                postReview && <div className='space-y-2 my-4'>
                                    <div className='flex items-start gap-4'>
                                        <figure className='w-10 h-10'>
                                            <img src={user?.photoURL} alt="reviewer image" className='w-full h-full object-cover' />
                                        </figure>
                                        <h1 className='text-lg md:text-xl lg:text-2xl font-bold '>{user?.displayName}</h1>
                                    </div>
                                    <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-2'>
                                        <div>
                                            <Rating onClick={handleRating} />
                                        </div>
                                        {errors.rating && <span className='text-red-500'>{errors.rating?.message}</span>}
                                        <div>
                                            <textarea {...register("reviewDescription", {
                                                required: {
                                                    value: true,
                                                    message: "review description must be required."
                                                }
                                            })} name="reviewDescription" id="reviewDescription" rows={5} className='w-full'></textarea>
                                            {errors.reviewDescription && <span className='text-red-500'>{errors.reviewDescription?.message}</span>}
                                        </div>
                                        <button type='submit' className='btn btn-accent'>Post</button>
                                    </form>
                                </div>
                            }
                            {
                                reviews?.map(review => <div key={review._id} className='my-4'>
                                    <div className='flex items-center gap-4 '>
                                        <figure className='w-10 h-10'>
                                            <img src={review.reviewerImage} alt="reviewer image" className='w-full h-full object-cover' />
                                        </figure>
                                        <h1 className='text-lg md:text-xl lg:text-2xl font-bold '>{review.reviewerName}</h1>

                                    </div>
                                    <p>{review.reviewDescription}</p>
                                    <div
                                        style={{
                                            direction: 'ltr',
                                            fontFamily: 'sans-serif',
                                            touchAction: 'none'
                                        }}

                                        className='w-full'
                                    >
                                        <Rating
                                            initialValue={review.rating}
                                            size={20}
                                            onClick={function noRefCheck() { }}
                                            readonly
                                        />
                                    </div>
                                </div>)
                            }


                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default ProductPage