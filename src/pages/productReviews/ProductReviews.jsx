import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuthSecure from '../../hooks/useAuthSecure'
import { FaEye } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

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


  const handleFeatured = async (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6154",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes, Feature it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await authSecure.patch(`/product/feature/${productId}`);
        if (response.status === 200) {
          Swal.fire({
            title: "Featured done!",
            text: "Your product has been featured succesffully.",
            icon: "success"
          });
          refetch()
        }
        else if (response.status === 204) {
          Swal.fire({
            icon: "error",
            title: "Already Featured Product!",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      }
    });
  }

  const handleStatus = async (productId,{status}) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6154",
      cancelButtonColor: "#000",
      confirmButtonText: `Yes, ${status} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await authSecure.patch(`/product/status/${productId}`,{status});
        if (response.status === 200) {
          Swal.fire({
            title: `${status} done!`,
            text: `Your product has been ${status} succesffully.`,
            icon: "success"
          });
          refetch()
        }
        else if (response.status === 204) {
          Swal.fire({
            icon: "error",
            title: `Already ${status} Product!`,
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      }
    });
  }

 


  return (
    <div className=''>
      <h1 className='text-2xl md:text-5xl font-bold text-center'>Product Review Queue</h1>
      <div className='shadow-xl m-auto mt-12 lg:max-w-2xl max-w-full overflow-hidden '>
        {
          products.length > 0 && <div className="overflow-x-auto table-zebra">
            <table className="table">
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
                      {!product.isFeatured && <div className="tooltip" data-tip="make featured"><button className='btn bg-yellow-600 hover:bg-yellow-800 text-white' onClick={() => handleFeatured(product._id)}><FaRegStar /></button></div>}
                      {
                        product.status !== "accepted" && <button onClick={() => handleStatus(product._id,{status:"accepted"})} className='btn bg-green-600 text-white hover:bg-green-700'>Accept</button>
                      }
                      {
                        product.status !== "rejected" && <button onClick={() => handleStatus(product._id,{status:"rejected"})} className='btn bg-red-600 hover:bg-red-800 text-white'>Reject</button>
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