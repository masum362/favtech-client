import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAuthSecure from '../../hooks/useAuthSecure'
import CustomBtn from '../../components/customBtn/CustomBtn';
import Swal from 'sweetalert2'


const MyProduct = () => {

  const authSecure = useAuthSecure();

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['specificUserProducts'],
    queryFn: async () => {
      const response = await authSecure("/get-user-all-products");
      return response.data?.products;
    }
  })


  const handleDelete = async (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const response = await authSecure.delete(`/delete-user-product/${productId}`);
        if (response.status===200) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          refetch()
        }

      }
    });


  }


  return (
    <div>
      <h1 className='text-2xl md:text-5xl font-bold text-center'>My Products</h1>
      <div className='shadow-xl lg:m-12 mt-4 '>
        {
          products.length>0 ? <div className="overflow-x-auto table-zebra w-full">
          <table className="table w-full">
            {/* head */}
            <thead className='text-black'>
              <tr>
                <th>SI.</th>
                <th>Name</th>
                <th>Votes</th>
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
                  <td>{product.upvote}</td>
                  <td ><span className={`${product.status === "pending" ? "text-black bg-yellow-500" : product.status === "accepted" ? "text-white bg-green-600" : "text-white bg-red-600"} px-4 py-1 rounded-full`}>{product.status}</span></td>
                  <td className='flex gap-2'>
                    <CustomBtn text={"Update"} style={"bg-yellow-600 hover:bg-yellow-400"}></CustomBtn>
                  <span onClick={()=>handleDelete(product._id)}><CustomBtn text={"Delete"}></CustomBtn></span></td>

                </tr>)
              }

            </tbody>
          </table>
        </div> : <div className='p-4 flex items-center justify-center w-full'>
          <span className='text-2xl font-bold text-slate-800'>Empty Products</span>
        </div>
        }
      </div>
    </div>
  )
}

export default MyProduct