import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import CustomBtn from '../../components/customBtn/CustomBtn';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthSecure from '../../hooks/useAuthSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const UpdateCoupon = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const authSecure = useAuthSecure();
    const { id } = useParams();


    const { data: coupon = {}, isLoading } = useQuery({
        queryKey: ["coupon"],
        queryFn: async () => {
            const response = await authSecure(`/coupon/${id}`)
            return response.data
        }
    })

    const { control, handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            coupon_code: coupon?.coupon_code || "",
            expiry_date: coupon?.expiry_date || null,
            description: coupon?.description || "",
            amount: coupon?.amount || null,
        }
    });

    console.log(coupon);



    const handleFormSubmit = async (data) => {
        setLoading(true);
        console.log(data);
        const response = await authSecure.patch(`/update/coupon/${coupon._id}`, { coupon: data })
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
        setLoading(false);
    }

    return (
        <div>
            <h1 className='text-2xl md:text-5xl font-bold text-center'>Update Coupon</h1>

            <div className='flex flex-col items-center justify-center lg:my-12' >

                {
                    isLoading ? <div>Loading</div> : <div className='max-w-xl w-full bg-slate-50 p-4 shadow-lg rounded-lg' >
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

                            {/* <div className='flex flex-col w-full '>
                        <label htmlFor="expiry_date">Expiry Date:</label>
                        <input type="date" name="expiry_date" id="expiry_date" placeholder="Type here" className="input input-bordered w-full "  {...register("expiry_date", {
                            required: 'expiry date must be required.'
                        })} />
                        {
                            errors?.expiry_date && <span className='text-red-500'>{errors.expiry_date?.message}</span>
                        }
                    </div> */}
                            <div className='flex flex-col'>
                                <label htmlFor="expiry_date">Expiry date</label>
                                <Controller
                                    name="expiry_date"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <DatePicker
                                            id="expiry_date"
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            dateFormat="dd-MM-yyyy"
                                            placeholderText="Select a date"
                                            className="input input-bordered w-full "
                                        />
                                    )}
                                />
                                {errors.expiry_date && <p>Date is required</p>}
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
                }
            </div>
        </div>
    )
}

export default UpdateCoupon