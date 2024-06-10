import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import CustomBtn from '../../components/customBtn/CustomBtn';
import { useNavigate } from 'react-router-dom';
import useAuthSecure from '../../hooks/useAuthSecure';
import Swal from 'sweetalert2';

const AddCoupon = () => {
    const { handleSubmit, register, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const authSecure = useAuthSecure();



    const handleFormSubmit = async (data) => {
        console.log(data);
        const response = await authSecure.post("/add/coupon", { coupon: data })
        try {
            if (response.status === 200) {
                Swal.fire({
                    title: "Coupon added successfully",
                    icon: "success"
                });
                navigate("/admin/manage-coupons");
            }
            else if (response.status === 204) {
                Swal.fire({
                    title: "You have already added this coupon",
                    text: "please add any other coupon this coupon is already in use.",
                    icon: "warning"
                });
            }
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <h1 className='text-2xl md:text-5xl font-bold text-center'>Add Coupon</h1>

            <div className='flex flex-col items-center justify-center lg:my-12' >

                <div className='max-w-xl w-full bg-slate-50 p-4 shadow-lg rounded-lg' >
                    <form className='w-full space-y-4 my-8 ' onSubmit={handleSubmit(handleFormSubmit)}>

                        <div className='flex flex-col w-full '>
                            <label htmlFor="coupon_code">Coupon Code:</label>
                            <input type="text" name="coupon_code" id="coupon_code" plexternalaceholder="Type here" className="input input-bordered w-full " {...register("coupon_code", {
                                required: 'coupon code must be required.'
                            })} />
                            {
                                errors?.coupon_code && <span className='text-red-500'>{errors.coupon_code?.message}</span>
                            }
                        </div>

                        <div className='flex flex-col w-full '>
                            <label htmlFor="expiry_date">Expiry Date:</label>
                            <input type="date" name="expiry_date" id="expiry_date" placeholder="Type here" className="input input-bordered w-full "  {...register("expiry_date", {
                                required: 'expiry date must be required.'
                            })} />
                            {
                                errors?.expiry_date && <span className='text-red-500'>{errors.expiry_date?.message}</span>
                            }
                        </div>
                        <div className='flex flex-col w-full '>
                            <label htmlFor="description">Description:</label>
                            <input type="text" name="description" id="description" placeholder="Type here" className="input input-bordered w-full "  {...register("description", {
                                required: 'description must be required.'
                            })} />
                            {
                                errors?.description && <span className='text-red-500'>{errors.description?.message}</span>
                            }
                        </div>
                        <div className='flex flex-col w-full '>
                            <label htmlFor="amount">Amount:</label>
                            <input type="number" name="amount" id="amount" placeholder="Type here" className="input input-bordered w-full "  {...register("amount", {
                                required: 'amount must be required.'
                            })} />
                            {
                                errors?.amount && <span className='text-red-500'>{errors.amount?.message}</span>
                            }
                        </div>


                        {!loading ? <CustomBtn btnType={"submit"} text={"Submit"} style={"w-full"} /> : <div className='text-themePrimary'>
                            <span className="loading loading-ball loading-xs"></span>
                            <span className="loading loading-ball loading-sm"></span>
                            <span className="loading loading-ball loading-md"></span>
                            <span className="loading loading-ball loading-lg"></span>

                        </div>
                        }

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCoupon