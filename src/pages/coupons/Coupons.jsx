import React from 'react'
import useAuthSecure from '../../hooks/useAuthSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import CustomBtn from '../../components/customBtn/CustomBtn';

const Coupons = () => {
  const authSecure = useAuthSecure();

  const { data: coupons = [], refetch, isError } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const response = await authSecure(`/coupons`);
      return response.data;

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await authSecure.delete(`/delete-user-product/${productId}`);
        if (response.status === 200) {
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

      <h1 className='text-2xl md:text-5xl font-bold text-center'>Manage Coupons</h1>

      <div className='shadow-xl lg:m-12 mt-4 '>
        <div className='w-full flex items-center justify-end'>
          <Link to={"/admin/add/coupon"}><button className='btn bg-themePrimary text-white hover:bg-red-800 duration-300 '>Add Coupon</button></Link>
        </div>
        {
          coupons.length > 0 ? <div className="overflow-x-auto table-zebra w-full">
            <table className="table w-full">
              {/* head */}
              <thead className='text-black'>
                <tr>
                  <th>SI.</th>
                  <th>Coupon Code</th>
                  <th>Expiry Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {
                  coupons?.map((coupon, index) => <tr key={coupon._id}>
                    <th>{index + 1}</th>
                    <td>{coupon.coupon_code}</td>
                    <td>{coupon.expiry_date}</td>
                    <td >{coupon.description}</td>
                    <td className='flex gap-2'>
                      <Link to={`/admin/update/coupon/${coupon._id}`}><CustomBtn text={"Update"} style={"bg-yellow-600 hover:bg-yellow-400"}></CustomBtn></Link>
                      <span onClick={() => handleDelete(coupon._id)}><CustomBtn text={"Delete"}></CustomBtn></span></td>

                  </tr>)
                }

              </tbody>
            </table>
          </div> : <div className='p-4 flex items-center justify-center w-full'>
            <span className='text-2xl font-bold text-slate-800'>Empty Coupons</span>
          </div>
        }
      </div>

    </div>
  )
}

export default Coupons