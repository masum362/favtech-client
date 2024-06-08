import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuthSecure from '../../hooks/useAuthSecure'
import { FaEye } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const ProductReviews = () => {
  // const { user } = useAuth();
  const authSecure = useAuthSecure();
  const { data: products = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["product_review_queue"],
    queryFn: async () => {
      const respones = await authSecure(`/products`)
      return respones.data;
    }
  })


  const handleFeatured = async(productId) => {
    const response = await authSecure.put(`/product/feature/${productId}`);
    console.log(response);
  }
  // const handleFeatured = async(productId) => {
  //   const response = await authSecure.put(`/product/feature/${productId}`);
  //   console.log(response);
  // }

  console.log(products)


  return (
    <div>
      <h1 className='text-2xl md:text-5xl font-bold text-center'>Product Review Queue</h1>
      <div className='shadow-xl m-auto mt-12 max-w-2xl'>
        {
          products.length > 0 && <div className="overflow-x-auto table-zebra w-full">
            <table className="table w-full">
              {/* head */}
              <thead className='text-black'>
                <tr>
                  <th>SI.</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {
                  products?.map((product, index) => <tr key={product._id}>
                    <th>{index + 1}</th>
                    <td>{product.name}</td>
                    <td ><span className={`${product.status === "pending" ? "text-black bg-yellow-500" : product.status === "accepted" ? "text-white bg-green-600" : "text-white bg-red-600"} px-4 py-1 rounded-full`}>{product.status}</span></td>
                    <td className='flex gap-2'>
                     <div className="tooltip" data-tip="view details">
                     <Link to={`/product/${product._id}`}><button className='btn bg-themePrimary/80 hover:bg-themePrimary text-white'><FaEye /></button></Link>
                     </div>
                      {!product.isFeatured && <div className="tooltip" data-tip="make featured"><button className='btn bg-yellow-600 hover:bg-yellow-800 text-white' onClick={()=>handleFeatured(product._id)}><FaRegStar /></button></div>}
                      {
                        product.status !== "accepted" && <button onClick={()=>handleAccept(product._id)} className='btn bg-green-600 text-white hover:bg-green-700'>Accept</button>
                      }
                      {
                        product.status !== "rejected" && <button onClick={()=>handleReject(product._id)} className='btn bg-red-600 hover:bg-red-800 text-white'>Reject</button>
                      }

                    </td>

                  </tr>)
                }

              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  )
}

export default ProductReviews