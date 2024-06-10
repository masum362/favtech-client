import React from 'react'
import useCoupons from '../../../hooks/useCoupons'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeCoupons = () => {
    const { coupons } = useCoupons();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className='space-y-5
        '>
            <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-center '>Coupons</h1>
            <div className='lg:mx-20'>
                <Slider {...settings}>
                    {
                        coupons?.map(coupons => {
                            return (

                                <> <div className='flex bg-white space-y-4'>
                                    <div className='bg-blue-500 font-bold text-white uppercase px-8 py-4 flex flex-col items-start justify-center rounded-r-full w-full'>
                                        <h2 className='font-bold text-5xl text-white'>save</h2>
                                        <h1 className='text-9xl text-themePrimary'>{coupons?.amount}$</h1>
                                        <h2 className='text-5xl'>on your next subscription</h2>
                                    </div>
                                    <div className='px-6 py-3 flex flex-col items-center justify-center w-full gap-2'>
                                        <p className='text-xl font-bold'>your promo code</p>
                                        <h1 className='text-6xl font-bold p-8 border-2 rounded-xl uppercase'>{coupons?.coupon_code}</h1>
                                        <p className='text-xl text-center max-w-md'>{coupons?.description}</p>
                                    </div>
                                </div></>

                            )
                        })
                    }
                </Slider>



            </div>
        </div>
    )
}

export default HomeCoupons