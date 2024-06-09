import React from 'react'
import Carousel from '../../components/homepage/carousel/Carousel'
import Featured from '../../components/homepage/featured/Featured'
import TrendingProducts from '../../components/homepage/trendingProducts/TrendingProducts'

const Home = () => {
    return (
        <div className='w-full min-h- space-y-3'>
            <Carousel />
            <Featured />
            <TrendingProducts />
        </div>
    )
}

export default Home