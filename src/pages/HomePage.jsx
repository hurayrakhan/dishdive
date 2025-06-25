import React from 'react';
import Hero from '../Components/Banner/Hero';
import Header from '../Components/Header/Header';
import TopRecipes from '../Components/TopRecipes';
import Newsletter from '../Components/Newsletter';
import UpcomingRecipes from '../Components/UpcomingRecipes';

const HomePage = () => {
    return (
        <div className='relative'>
            <div className='absolute z-20 w-full'>
                <Header></Header>
            </div>
            <div className=''>
                <Hero></Hero>
            </div>
            <TopRecipes></TopRecipes>
            <UpcomingRecipes></UpcomingRecipes>
            <Newsletter></Newsletter>
        </div>
    );
};

export default HomePage;