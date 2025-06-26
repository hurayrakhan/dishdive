import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import slider1 from '../../assets/slider1.jpg'
import slider2 from '../../assets/slider2.jpg'
import slider3 from '../../assets/slider3.jpg'
import slider4 from '../../assets/slider4.jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './hero.css'

// import required modules
import { Parallax, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router';

const Hero = () => {
    return (
            <div className=' overflow-hidden -m-top-16'>
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    speed={600}
                    parallax={true}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    navigation={true}
                    modules={[Parallax, Pagination, Navigation, Autoplay]}
                    className="mySwiper"
                >

                    <SwiperSlide
                        style={{ backgroundImage: `url(${slider1})` }}
                        className="bg-cover bg-no-repeat  relative"
                    >
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40 text-center px-4">
                            <h1 className=" text-5xl text-gray-300 font-bold mb-2 opacity-70" data-swiper-parallax="-300">
                                Discover Recipes That Bring Families Together
                            </h1>

                            <div className="max-w-2xl text-gray-300" data-swiper-parallax="-100">

                                From cozy classics to bold new tastes, find dishes that turn everyday meals into memorable moments. Whether you're a home cook or a kitchen newbie, DishDive has something for every craving.

                            </div>
                            <Link to={'/allRecipes'} className='btn btn-outline font-bold border mt-3 px-8 text-green-600 hover:bg-green-600 hover:text-white hover:font-bold hover:border hover:border-white'><button>Explore</button></Link>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide
                        style={{ backgroundImage: `url(${slider2})` }}
                        className="bg-cover bg-no-repeat  relative"
                    >
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40 text-center px-4">
                            <h1 className=" text-5xl text-gray-300 font-bold mb-2 opacity-70" data-swiper-parallax="-300">
                                Healthy Meals in Under 30 Minutes
                            </h1>

                            <div className="max-w-2xl text-gray-300" data-swiper-parallax="-100">
                                <p>
                                    Cooking doesn't have to be a hassle. Explore our collection of nutritious, delicious recipes that are quick to make and even quicker to disappear from your plate.
                                </p>
                            </div>
                            <Link to={'/allRecipes'} className='btn btn-outline font-bold border mt-3 px-8 text-green-600 hover:bg-green-600 hover:text-white hover:font-bold hover:border hover:border-white'><button>Explore</button></Link>

                        </div>
                    </SwiperSlide>
                    <SwiperSlide
                        style={{ backgroundImage: `url(${slider3})` }}
                        className="bg-cover bg-no-repeat  relative"
                    >
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40 text-center px-4">
                            <h1 className=" text-5xl text-gray-300 font-bold mb-2 opacity-70" data-swiper-parallax="-300">
                                International Recipes at Your Fingertips
                            </h1>
                            <div className="max-w-2xl text-gray-300" data-swiper-parallax="-100">
                                <p>
                                    Travel the globe without leaving your kitchen. Try recipes inspired by global cuisines and bring international flavor to your dinner table tonight.
                                </p>
                            </div>
                            <Link to={'/allRecipes'} className='btn btn-outline font-bold border mt-3 px-8 text-green-600 hover:bg-green-600 hover:text-white hover:font-bold hover:border hover:border-white'><button>Explore</button></Link>

                        </div>
                    </SwiperSlide>
                    <SwiperSlide
                        style={{ backgroundImage: `url(${slider4})` }}
                        className="bg-cover bg-no-repeat  relative"
                    >
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40 text-center px-4">
                            <h1 className=" text-5xl text-gray-300 font-bold mb-2 opacity-70" data-swiper-parallax="-300">
                                Sweet Cravings? Solved.
                            </h1>
                            <div className="max-w-2xl text-gray-300" data-swiper-parallax="-100">
                                <p>
                                    Satisfy your sweet tooth with irresistible desserts. From gooey brownies to creamy cheesecakes, every treat is a celebration in itself.
                                </p>
                            </div>
                            <Link to={'/allRecipes'} className='btn btn-outline font-bold border mt-3 px-8 text-green-600 hover:bg-green-600 hover:text-white hover:font-bold hover:border hover:border-white'><button>Explore</button></Link>

                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        
    );
};

export default Hero;