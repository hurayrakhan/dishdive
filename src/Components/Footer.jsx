import React, { use } from 'react';
import logo from '../assets/logo1.png'
import { Link, NavLink } from 'react-router';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AuthContext } from '../Provider/AuthProvider';

const Footer = () => {

    const { user } = use(AuthContext);
    const links = (
        <>
            <NavLink
                to={'/'}
                className={({ isActive }) =>
                    isActive
                        ? 'underline text-green-600 font-bold '
                        : 'hover:bg-transparent hover:text-green-600 text-gray-300'
                }
            >
                Home
            </NavLink>


            <NavLink
                to={'/allRecipes'}
                className={({ isActive }) =>
                    isActive
                        ? 'underline text-green-600 font-bold'
                        : 'hover:bg-transparent hover:text-green-600 text-gray-300'
                }
            >
                All Recipes
            </NavLink>


            <NavLink
                to={'/addRecipe'}
                className={({ isActive }) =>
                    isActive
                        ? 'underline text-green-600 font-bold'
                        : 'hover:bg-transparent hover:text-green-600 text-gray-300'
                }
            >
                Add Recipe
            </NavLink>

            {user && (

                <NavLink
                    to={'/myRecipes'}
                    className={({ isActive }) =>
                        isActive
                            ? 'underline text-green-600 font-bold'
                            : 'hover:bg-transparent hover:text-green-600 text-gray-300'
                    }
                >
                    My Recipes
                </NavLink>

            )}

            <NavLink
                to={'/aboutUs'}
                className={({ isActive }) =>
                    isActive
                        ? 'underline text-green-600 font-bold'
                        : 'hover:bg-transparent hover:text-green-600 text-gray-300'
                }
            >
                About
            </NavLink>

        </>
    );

    return (
        <footer className=" bg-slate-800 text-neutral-content p-10">
            <div className='footer sm:footer-horizontal w-10/12 mx-auto'>
                <aside>
                    <img className='h-12' src={logo} alt="" />
                    <p className='text-xl font-bold'> DishDive Industries Ltd.</p>
                    <p className=' text-gray-400'> Providing taste and food since 1992.</p>
                    <p className='text-xl font-medium text-gray-400 '>Contact</p>
                    <p className='text-gray-400'>Email: imhurayrakhan@gmail.com</p>
                </aside>
                <div className='flex flex-col justify-end'>
                    <div className='flex gap-3 mt-6'>
                        {links}
                    </div>
                    <h5 className='text-xl font-medium text-gray-400 py-2'>Social</h5>
                    <div className='flex gap-2'>
                        <Link className='hover:text-green-600' target='_blank' to={"https://www.facebook.com/hurayra.khan.965/"}><FaFacebook className='text-2xl ' /></Link>
                        <Link className='hover:text-green-600' target='_blank' to={"https://www.linkedin.com/in/hurayrakhan/"}><FaLinkedin className='text-2xl' /></Link>
                        <Link className='hover:text-green-600' target='_blank' to={"https://github.com/hurayrakhan"}><FaGithub className='text-2xl' /></Link>


                    </div>
                </div>

            </div>
            <p className='text-center text-lg text-gray-500 mt-8'>&copy;All Right Reserved -2025</p>
        </footer>
    );
};

export default Footer;