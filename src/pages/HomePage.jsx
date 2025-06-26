import React from 'react';
import Hero from '../Components/Banner/Hero';
import Header from '../Components/Header/Header';
import TopRecipes from '../Components/TopRecipes';
import Newsletter from '../Components/Newsletter';
import UpcomingRecipes from '../Components/UpcomingRecipes';

const HomePage = () => {
    return (
        <div className=''>
            <div className='sticky backdrop-blur-sm text-gray-300 top-0  z-50 w-full'>
                <Header></Header>
            </div>
            <div className='-mt-16'>
                <Hero></Hero>
            </div>
            <TopRecipes></TopRecipes>
            <UpcomingRecipes></UpcomingRecipes>
            <Newsletter></Newsletter>
        </div>
    );
};

export default HomePage;