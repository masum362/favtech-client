import React, { useEffect, useState } from 'react'
import Carousel from '../../components/homepage/carousel/Carousel'
import Featured from '../../components/homepage/featured/Featured'
import TrendingProducts from '../../components/homepage/trendingProducts/TrendingProducts'
import HomeCoupons from '../../components/homepage/homeCoupons/HomeCoupons'

const Home = () => {
    const [state, setState] = useState(false);

    useEffect(() => {
        setState(true);
        console.log("called Home");
    }, [])

    return (
        <div className='w-full min-h- space-y-6'>
            <Carousel />
            <Featured />
            <TrendingProducts />
            <HomeCoupons />
        </div>
    )
}

export default Home