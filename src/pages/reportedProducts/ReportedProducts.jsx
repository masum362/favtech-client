import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuthSecure from '../../hooks/useAuthSecure'
import { Link } from 'react-router-dom';
import { FaEye, FaRegStar } from 'react-icons/fa';

const ReportedProducts = () => {

  const authSecure = useAuthSecure();
  const {data:products=[],isError,refetch} = useQuery({
    queryKey: ["reported_contents"],
    queryFn: async () => {
      const response = await authSecure("/get-reported-contents");
      return response.data;
    }
  })

{  console.log(products)
}



  return (
    <div>
      <h1 className='text-2xl md:text-5xl font-bold text-center'>Reported Contents</h1>
      <div className='shadow-xl m-auto mt-12 lg:max-w-2xl max-w-full overflow-hidden '>
        {
          products.length > 0 && <div className="overflow-x-auto table-zebra">
            <table className="table">
              {/* head */}
              <thead className='text-black'>
                <tr>
                  <th>SI.</th>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {
                  products?.map((product, index) => <tr key={product.productId._id}>
                    <th>{index + 1}</th>
                    <td>{product.productId.name}</td>

                    <td className='flex gap-2'>
                      <div className="tooltip" data-tip="view details">
                        <Link to={`/product/${product.productId._id}`}><button className='btn bg-themePrimary/80 hover:bg-themePrimary text-white'><FaEye /></button></Link>
                      </div>
                      {!product.productId.isFeatured && <div className="tooltip" data-tip="make featured"><button className='btn bg-yellow-600 hover:bg-yellow-800 text-white'><FaRegStar /></button></div>}
                      {
                        product.productId.status !== "accepted" && <button className='btn bg-green-600 text-white hover:bg-green-700'>Accept</button>
                      }
                      {
                        product.productId.status !== "rejected" && <button className='btn bg-red-600 hover:bg-red-800 text-white'>Reject</button>
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

export default ReportedProducts