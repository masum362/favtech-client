import banner1 from '../../../assets/banner1.avif'
import banner2 from '../../../assets/banner2.avif'
import banner3 from '../../../assets/banner3.jpg'

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';


const Carousel = () => {
    const carouselItems = [
        {
            image: banner1,
            title: "Vote for Your Favorites",
            description: "Upvote the products you love and help them gain the recognition they deserve. Your vote matters in highlighting the best innovations."
        },
        {
            image: banner2,
            title: "Share Your Creations",
            description: "Got an awesome product? Submit it now and let our community of tech enthusiasts discover, upvote, and review your creation."
        }, {
            image: banner3,
            title: "Trending Tech Tools",
            description: "Check out the top trending products making waves in the tech world. These are the tools and apps everyone is talking about."
        }
    ]
    return (
        <div className="w-full">
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${banner1})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-2xl">
                        <h1 className="mb-5 text-5xl font-bold">Discover the Next Big Thing in Tech and Innovation</h1>
                        <p className="mb-5">Join our vibrant community of innovators and early adopters. Explore, upvote, and support the latest products and groundbreaking ideas shaping the future. Your next favorite discovery is just a click away!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel