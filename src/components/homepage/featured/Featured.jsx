import React from 'react'
import useFeaturedProduct from '../../../hooks/useFeaturedProduct'
import { IoIosArrowUp } from "react-icons/io";
import useAuth from '../../../hooks/useAuth';
import useAuthSecure from '../../../hooks/useAuthSecure';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../loading/Loading';


const Featured = () => {
    const { user } = useAuth();
    const { featuredProduct, refetch, isLoading } = useFeaturedProduct();
    const authSecure = useAuthSecure();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(user);

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
            <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-center'>Featured Products</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-12 w-full'>
                {

                    isLoading ? <Loading /> : featuredProduct?.slice(0,6).map(product => <div className='w-full rounded-lg card hover:shadow-2xl bg-white p-4 my-4' key={product._id}>
                        <figure>
                            <img src={product.imageURL} alt="" className='w-full h-60 object-cover rounded-lg' />
                        </figure>
                        <div className='card-body'>
                            <div className='flex items-center justify-between gap-2 w-full my-4'>
                                <Link to={`/product/${product._id}`}> <h1 className='font-bold text-lg md:text-3xl cursor-pointer hover:text-themePrimary'>{product.name}</h1></Link>

                                <button disabled={product.owner.uid === user?.uid} onClick={() => handleUpVote(product._id, user.uid)} className={`${product.upvotedUsers.includes(user?.uid) ? "bg-themePrimary" : "bg-slate-900"} px-2 py-1 md:px-4 md:py-2 flex items-center justify-center rounded-lg font-bold hover:bg-slate-800 duration-150`}>
                                    <span className='text-white '>{product.upvote}</span>
                                    <span className='text-white'><IoIosArrowUp size={26} /></span>
                                </button>
                            </div>
                            <div className='grid grid-cols-2 gap-4 my-4'>
                                {
                                    product.tags.map(tag => <span className='bg-transparent border border-themePrimary font-bold p-2 rounded-xl text-center hover:bg-themePrimary duration-300 hover:text-white ' key={tag}>{tag}</span>)
                                }
                            </div>
                        </div>
                    </div>)
                }
            </div>

        </div >
    )
}

export default Featured