import React, { use } from 'react';
import logo from '../assets/logo1.png'
import { Link, Navigate, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const Register = () => {
    const { createUser, setUser, updateUser } = use(AuthContext);
    const navigate = useNavigate();
    
    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const entries = new FormData(form);
        const formData = Object.fromEntries(entries);
        const { email, password, name, photo } = formData;

        createUser(email, password)
            .then(result => {
                const user = result.user;
                if (user) {
                    updateUser({ displayName: name, photoURL: photo }).then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                    }).catch((error) => {
                        alert(error.message)
                    });
                    navigate('/')
                        .then(() => {
                            Swal.fire({
                                title: "Register Successful!",
                                text: `Welcome, ${user.displayName || 'User'}!`,
                                icon: "success",
                                confirmButtonText: "Continue"
                            })
                            setUser(user)
                        })
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Register Failed",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Retry"
                });
            })
    };

    return (
        <div className='flex justify-center items-center h-screen  bg-[url(https://i.ibb.co/hJky57qh/bg6.jpg)] bg-cover '>
            
            <div className="card flex flex-col-reverse md:flex-row w-xl md:w-2xl lg:w-7xl  shrink-0  shadow-2xl  p-12  backdrop-blur-3xl rounded-xl  border-2 border-gray-400 ">
                
                <div className='flex-1'>
                    <div className='place-items-center  '>
                        <img className='h-16 ' src={logo} alt="" />
                    </div>
                    <div className=''>
                        <h1 className="text-3xl font-bold text-center py-4 text-gray-300">Register now!</h1>

                        <form onSubmit={handleRegister} className="fieldset">
                            <label className="label text-white">Name</label>
                            <input type="text" className="input w-full bg-white text-black" name='name' required placeholder="Your name" />
                            <label className="label text-white">Email</label>
                            <input type="email" className="input w-full bg-white text-black" name='email' required placeholder="Email" />
                            <label className="label text-white">Photo URL</label>
                            <input type="url" className="input w-full bg-white text-black" name='photo' required placeholder="Photo URL" />
                            <label className="label text-white">Password</label>
                            <input type="password" className="input w-full bg-white text-black validator" required placeholder="Password" minlength="8"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                                title="Must be more than 6 characters, including number, lowercase letter, uppercase letter" />
                            <div><a className="link link-hover text-white">Forgot password?</a></div>
                            <button type='submit' className="btn bg-[#006400] mt-4 text-white font-bold border-0">Register</button>
                        </form>
                        

                        <p className='text-sm text-white pt-5 text-center'>Don't have an account?
                            <Link className='text-blue-500 underline' to={'/login'}>  login</Link></p>

                    </div>

                </div>
                <div className='flex-1 '>
                    <div className='flex h-full justify-center items-center px-5'>
                        <h1 className='text-center text-5xl font-bold text-gray-300'>Sign Up & Start Sharing Your Signature Dishes.</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;