import React, { useState } from 'react';
import ModeChanger from './ModeChanger';
import logo from '../../assets/logo1.png';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const Header = ({ children }) => {
    const { user, signOutUser } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                navigate('/login');
                Swal.fire({
                    title: "LogOut Successful!",
                    text: `Welcome, ${user?.displayName || 'User'}!`,
                    icon: "success",
                    confirmButtonText: "Continue",
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "LogOut Failed",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Retry",
                });
            });
    };

    const links = (
        <>

            <li className="font-semibold">
                <NavLink
                    to={'/'}
                    className={({ isActive }) =>
                        isActive
                            ? 'border border-green-600 rounded text-gray-300 font-bold '
                            : 'hover:bg-transparent hover:text-gray-300 text-green-600'
                    }
                    onClick={() => setSidebarOpen(false)}
                >
                    Home
                </NavLink>
            </li>
            <li className="font-semibold">
                <NavLink
                    to={'/allRecipes'}
                    className={({ isActive }) =>
                        isActive
                            ? 'border border-green-600 rounded text-gray-300 font-bold'
                            : 'hover:bg-transparent hover:text-gray-300 text-green-600'
                    }
                    onClick={() => setSidebarOpen(false)}
                >
                    All Recipes
                </NavLink>
            </li>
            <li className="font-semibold">
                <NavLink
                    to={'/addRecipe'}
                    className={({ isActive }) =>
                        isActive
                            ? 'border border-green-600 rounded text-gray-300 font-bold'
                            : 'hover:bg-transparent hover:text-gray-300 text-green-600'
                    }
                    onClick={() => setSidebarOpen(false)}
                >
                    Add Recipe
                </NavLink>
            </li>
            {user && (
                <li className="font-semibold">
                    <NavLink
                        to={'/myRecipes'}
                        className={({ isActive }) =>
                            isActive
                                ? 'border border-green-600 rounded text-gray-300 font-bold'
                                : 'hover:bg-transparent hover:text-gray-300 text-green-600'
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        My Recipes
                    </NavLink>
                </li>
            )}
            <li className="font-semibold">
                <NavLink
                    to={'/aboutUs'}
                    className={({ isActive }) =>
                        isActive
                            ? 'border border-green-600 rounded text-gray-300 font-bold'
                            : 'hover:bg-transparent hover:text-gray-300 text-green-600'
                    }
                    onClick={() => setSidebarOpen(false)}
                >
                    About
                </NavLink>
            </li>
        </>
    );

    return (
        <>
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 overflow-scroll ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSidebarOpen(false)}>
                            <img src={logo} alt="DishDive Logo" className="h-10 w-auto" />
                            <p className="font-bold text-2xl text-green-600 relative">
                                Dish
                                <span className="absolute top-2 left-full ml-1 text-3xl text-green-500">Dive</span>
                            </p>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                            aria-label="Close sidebar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {user ? <ul className="flex-grow space-y-6 text-lg text-gray-700">
                        <li className="font-semibold">
                            <NavLink
                                to={'/dashboard'}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'border border-green-600 rounded text-gray-300 font-bold'
                                        : 'hover:bg-transparent hover:text-gray-300 text-green-600'
                                }
                                onClick={() => setSidebarOpen(false)}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        {links}
                    </ul> : <ul className="flex-grow space-y-6 text-lg text-gray-700">
                        {links}
                        </ul>
                    }


                    {/* Auth Buttons or Profile */}
                    <div className="mt-auto">
                        {user ? (
                            <>
                                <p className="font-semibold mb-3 text-gray-800">{user.displayName}</p>
                                <button
                                    onClick={() => {
                                        setSidebarOpen(false);
                                        navigate('/profile');
                                    }}
                                    className="btn btn-sm w-full mb-2 bg-green-600 hover:bg-green-700 text-white rounded"
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={() => {
                                        handleLogOut();
                                        setSidebarOpen(false);
                                    }}
                                    className="btn btn-sm w-full bg-red-600 hover:bg-red-700 text-white rounded"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link
                                    to="/login"
                                    onClick={() => setSidebarOpen(false)}
                                    className="btn btn-sm w-full bg-green-600 hover:bg-green-700 text-white rounded"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setSidebarOpen(false)}
                                    className="btn btn-sm w-full bg-gray-600 hover:bg-gray-700 text-white rounded"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Page content shifted right when sidebar is open */}
            <div
                className={`transition-margin duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'
                    } min-h-screen`}
            >
                {/* Navbar */}
                <div className="navbar backdrop-blur-sm sticky top-0 z-40 w-full bg-white/30 border-b border-gray-200">
                    <div className="navbar-start flex items-center gap-2 px-4">
                        <div
                            className={`flex items-center gap-2 cursor-pointer ${sidebarOpen? 'hidden' : ''}`}
                            onClick={() => setSidebarOpen(true)}
                        >
                            <img src={logo} alt="DishDive Logo" className="h-10 w-auto" />
                            <p className="font-bold text-2xl text-gray-300 relative hidden lg:block">
                                Dish
                                <span className="absolute top-2 left-full ml-1 text-3xl text-green-500">Dive</span>
                            </p>
                        </div>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 space-x-2">{links}</ul>
                    </div>

                    <div className="navbar-end flex items-center gap-2 px-4">
                        {/* Uncomment below if you want mode changer here */}
                        {/* <div className='hidden md:block'>
              <ModeChanger />
            </div> */}

                        {user ? (
                            <>
                                <div className="dropdown dropdown-end">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn btn-ghost btn-circle avatar"
                                    >
                                        <div className="w-10 rounded-full overflow-hidden">
                                            <img
                                                alt="User Avatar"
                                                src={
                                                    user.photoURL
                                                        ? user.photoURL
                                                        : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                                                }
                                            />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-green-300 text-black rounded-box z-50 mt-3 w-52 p-2 shadow"
                                    >
                                        <p className="text-xl font-bold p-2">{user.displayName}</p>
                                        <li>
                                            <a
                                                onClick={() => {
                                                    navigate('/profile');
                                                }}
                                                className="justify-between"
                                            >
                                                Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a>Settings</a>
                                        </li>
                                        <li onClick={handleLogOut}>
                                            <a>Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to={'/login'}
                                    className="btn border border-green-600 bg-slate-900 rounded"
                                >
                                    <button>Login</button>
                                </Link>
                                <Link
                                    to={'/register'}
                                    className="btn bg-slate-800 border border-green-600"
                                >
                                    <button>Register</button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Render children or main content here */}
                {children}
            </div>
        </>
    );
};

export default Header;
