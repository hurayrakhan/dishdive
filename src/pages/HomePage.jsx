import React from 'react';
import Hero from '../Components/Banner/Hero';
import Header from '../Components/Header/Header';
import TopRecipes from '../Components/TopRecipes';
import Newsletter from '../Components/Newsletter';
import UpcomingRecipes from '../Components/UpcomingRecipes';

const HomePage = () => {
    return (
        <div className=''>

            <Header>
                <div className='-mt-16'>
                    <Hero></Hero>
                </div>
                <TopRecipes></TopRecipes>
                <UpcomingRecipes></UpcomingRecipes>
                <Newsletter></Newsletter>
            </Header>


        </div>
    );
};

export default HomePage;