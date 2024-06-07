import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAuthSecure from '../../hooks/useAuthSecure'
import CustomBtn from '../../components/customBtn/CustomBtn';
const MyProduct = () => {

  const authSecure = useAuthSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['specificUserProducts'],
    queryFn: async () => {
      const response = await authSecure("/get-user-all-products");
      return response.data?.products;
    }
  })

  console.log(products)

  return (
    <div>
      <h1 className='text-2xl md:text-5xl font-bold text-center'>My Products</h1>
      <div className='shadow-xl lg:m-12 mt-4 '>
        <div className="overflow-x-auto table-zebra w-full">
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
                  <td className='flex gap-2'><CustomBtn text={"Update"} style={"bg-themeSecondary border-themePrimary text-slate-900 hover:bg-themePrimary/40 duration-300 "}></CustomBtn><CustomBtn text={"Delete"}></CustomBtn></td>

                </tr>)
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyProduct