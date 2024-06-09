import React from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import useAuthSecure from '../../../hooks/useAuthSecure'
import useTrendingProducts from '../../../hooks/useTrendingProducts'

const TrendingProducts = () => {
    const { user } = useAuth();
    const authSecure = useAuthSecure();

    const { products, isLoading, refetch } = useTrendingProducts()

    console.log({ products })


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


    return (
        <div className=' lg:px-12 p-2'>
            <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-center'>Trending Products</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 my-12'>
                {
                    products.slice(0, 6).map(product => <div className='w-full  rounded-lg px-12 py-4 hover:shadow-2xl bg-white' key={product._id}>
                        <img src={product.imageURL} alt="" className='w-full h-60 object-cover rounded-lg' />
                        <div className='flex items-center justify-between gap-2 w-full my-4'>
                            <Link to={`/product/${product._id}`}> <h1 className='font-bold text-lg md:text-3xl cursor-pointer hover:text-themePrimary'>{product.name}</h1></Link>

                            <button disabled={product.owner.uid === user?.uid} onClick={() => handleUpVote(product._id, user.uid)} className={`${product.upvotedUsers.includes(user?.uid) ? "bg-themePrimary" : "bg-slate-900"} px-2 py-1 md:px-4 md:py-2 flex items-center justify-center rounded-lg font-bold hover:bg-slate-800 duration-150`}>
                                <span className='text-white '>{product.upvote}</span>
                                <span className='text-white'><IoIosArrowUp size={26} /></span>
                            </button>
                        </div>
                        <div className='grid grid-cols-3 gap-4 my-4'>
                            {
                                product.tags.map(tag => <span className='bg-transparent border border-themePrimary font-bold p-2 rounded-xl text-center hover:bg-themePrimary duration-300 hover:text-white ' key={tag}>{tag}</span>)
                            }
                        </div>
                    </div>)
                }
            </div>
            <div className='flex items-center justify-center'>
               <Link to={"/products"}><button className=' bg-themePrimary text-white hover:text-black font-bold hover:border-themePrimary rounded-full px-8 py-4 border-2 hover:bg-transparent duration-300 text-center'>
                    Show All Products
                </button></Link>
            </div>

        </div>
    )
}

export default TrendingProducts