import React, { useEffect, useState } from 'react'
import useProducts from '../../hooks/useProducts';
import { useQuery } from '@tanstack/react-query';
import useAuthPublic from '../../hooks/useAuthPublic';
import { Link } from 'react-router-dom';
import { IoIosArrowUp } from 'react-icons/io';
import useAuth from '../../hooks/useAuth';
import useAuthSecure from '../../hooks/useAuthSecure';

const AllProducts = () => {

    // const [products, setProducts] = useState([])
    const { user } = useAuth();
    const [numberOfProducts] = useProducts();
    const [limit, setLimit] = useState(6)
    const numberOfPages = Math.ceil(numberOfProducts / limit);
    const pages = [...Array(numberOfPages).keys()]
    const [skip, setSkip] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [search, setSearch] = useState("")
    const authPublic = useAuthPublic();
    const authSecure = useAuthSecure();

    const { data: products = [], refetch, isError } = useQuery({
        queryKey: ["all-products",skip,search,limit],
        queryFn: async () => {
            const response = await authPublic(`/all-products?search=${search}&skip=${skip}&limit=${limit}`);
            return response.data;

        }
    })


    useEffect(() => {
        // refetch();
    }, [skip, limit, search])



    const handleBtn = (pageNumber) => {
        setCurrentPage(pageNumber);
        setSkip(pageNumber * 6)

    }

    const handlePrev = () => {
        if (currentPage > 0) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            setSkip(newPage * 6)


        }
    }
    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            setSkip(newPage * 6)
        }
    }


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
        <div>
            <div className='lg:m-20 m-4'>
                <h1 className='text-2xl md:text-5xl font-bold text-center py-4'>All Products</h1>
                <div className='my-12 flex items-center justify-center'>
                    <input onChange={(e) => setSearch(e.target.value)} type="text" name="search" id="search" className='input w-full max-w-xl' placeholder='search your product' />
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    {
                        products.map(product => <div key={product._id} className="card bg-base-100 shadow-xl p-4">
                            <figure><img src={product.imageURL} alt={product.name} className='w-full h-52 object-cover' /></figure>
                            <div className="card-body">
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
                <div className='flex items-center justify-center gap-4'>
                    <button className='btn' disabled={currentPage === 0} onClick={handlePrev}>Prev</button>
                    {
                        pages.map(page => <button className={`btn ${page === currentPage ? "btn bg-themePrimary text-white" : "btn-accent "}`} onClick={() => handleBtn(page)} key={page}>{page + 1}</button>)
                    }
                    <button className='btn' disabled={currentPage === pages.length - 1} onClick={handleNext}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default AllProducts