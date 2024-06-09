import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuthSecure from '../../hooks/useAuthSecure'
import Swal from 'sweetalert2'

const Users = () => {

  const authSecure = useAuthSecure();
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await authSecure("/users");
      console.log(response);
      return response.data;
    }
  })

  const handleRole = async (userId, role) => {
    console.log(userId, role);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Make ${role} !`
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await authSecure.patch(`/user/role/${userId}`, { role });
        if (response.status === 200) {
          Swal.fire({
            title: "Succeed!",
            text: `Now user role is ${role}`,
            icon: "success"
          });
          refetch()
        }

      }
    });

  }


  const handleRemoveRole =async(userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Remove !`
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await authSecure.patch(`/user/role/remove/${userId}`);
        if (response.status === 200) {
          Swal.fire({
            title: "Succeed!",
            text: `now user is only normal user`,
            icon: "success"
          });
          refetch()
        }

      }
    });
  }

  return (
    <div>
      <h1 className='text-2xl md:text-5xl font-bold text-center'>Manage Users</h1>
      <div className='w-full mx-auto'>
        <div className="overflow-x-auto lg:m-12">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                users?.map((user, index) => <tr className="bg-base-200">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={user?.photoURL} alt="Avatar" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className='flex gap-2'>
                    {
                      user.role === "moderator" ? <button className='btn bg-yellow-600 text-white hover:bg-yellow-800  '
                        onClick={() => handleRemoveRole(user?.uid)}>Remove Moderator</button> : <button className='btn bg-yellow-600 text-white hover:bg-yellow-800  '
                          onClick={() => handleRole(user?.uid, "moderator")}>Make Moderator</button>
                    }
                    {
                      user.role === "admin" ? <button className='btn bg-themePrimary text-white hover:bg-themePrimary/50 '
                        onClick={() => handleRemoveRole(user?.uid)}>Remove Admin</button> : <button className='btn bg-themePrimary text-white hover:bg-themePrimary/50 '
                          onClick={() => handleRole(user?.uid, "admin")}>Make Admin</button>
                    }
                  </td>
                </tr>)
              }


            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users