import ModeChanger from './ModeChanger';
import logo from '../../assets/logo1.png'
import { Link, NavLink, useNavigate } from 'react-router';
import { use } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const Header = () => {


    const { user, signOutUser } = use(AuthContext);


    const navigate = useNavigate()

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                navigate('/login')
                Swal.fire({
                    title: "LogOut Successful!",
                    text: `Welcome, ${user.displayName || 'User'}!`,
                    icon: "success",
                    confirmButtonText: "Continue"
                })
            })
            .catch(error => {
                Swal.fire({
                    title: "LogOut Failed",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Retry"
                });
            })

    }

    const links = <>

        <li className='font-semibold'><NavLink to={'/'} className={({ isActive }) => isActive ? 'border border-green-600 rounded text-green-600 font-bold  ' : ' hover:border-green-600 hover:border hover:text-green-600'}>Home</NavLink></li>
        <li className='font-semibold'><NavLink to={'/allRecipes'} className={({ isActive }) => isActive ? 'border border-green-600 rounded text-green-600 font-bold  ' : ' hover:border-green-600 hover:border hover:text-green-600'}>All Recipes</NavLink></li>
        <li className='font-semibold'><NavLink to={'/addRecipe'} className={({ isActive }) => isActive ? 'border border-green-600 rounded text-green-600 font-bold  ' : ' hover:border-green-600 hover:border hover:text-green-600'}>Add Recipe</NavLink></li>
        {
            user ? <><li className='font-semibold'><NavLink to={'/myRecipes'} className={({ isActive }) => isActive ? 'border border-green-600 rounded text-green-600 font-bold  ' : ' hover:border-green-600 hover:border hover:text-green-600'}>My Recipes</NavLink></li> </>: ""
        }
        <li className='font-semibold'><NavLink to={'/aboutUs'} className={({ isActive }) => isActive ? 'border border-green-600 rounded text-green-600 font-bold  ' : ' hover:border-green-600 hover:border hover:text-green-600'}>About</NavLink></li>

    </>

    return (
        <div className="navbar backdrop-blur-sm sticky z-50 top-0 w-11/12 mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm space-y-1 dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            links
                        }
                    </ul>
                </div>
                <a className="flex items-center gap-2 relative"><img className='h-10 w-18' src={logo} alt="" /> <p className=' font-bold hidden lg:block'><span className='text-2xl'>Dish</span><span className='absolute top-2 text-green-500 text-3xl'>Dive</span></p></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-2">
                    {
                        links
                    }
                </ul>
            </div>

            <div className="navbar-end gap-2">
                {/* <div className='hidden md:block'>
                    < ModeChanger />
                </div> */}
                {
                    user ? <><div className="flex-none space-x-3">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                                    <span className="badge badge-sm indicator-item">8</span>
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                                <div className="card-body">
                                    <span className="text-lg font-bold">8 Items</span>
                                    <span className="text-info">Subtotal: $999</span>
                                    <div className="card-actions">
                                        <button className="btn btn-primary btn-block">View cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={
                                            user.photoURL ? user.photoURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                        } />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-green-300 text-black rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <p className='text-xl font-bold p-2'>{user.displayName}</p>
                                <li>
                                    <a onClick={() => {
                                        navigate('/profile')
                                    }}
                                        className="justify-between">
                                        Profile
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li onClick={handleLogOut}><a>Logout</a></li>
                            </ul>
                        </div>
                    </div></> : <><Link to={'/login'} className='btn border border-green-600 bg-slate-900 rounded'><button>Login</button></Link>
                        <Link to={'/register'} className='btn bg-slate-800 border border-green-600'><button>Register</button></Link></>
                }
            </div>
        </div>
    );
};

export default Header;