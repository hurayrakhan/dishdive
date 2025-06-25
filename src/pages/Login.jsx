import React, { use } from 'react';
import logo from '../assets/logo1.png'
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
    const { signInWithGoogle, signInUser, setUser } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();




    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const entries = new FormData(form);
        const formData = Object.fromEntries(entries);
        const { email, password } = formData;

        // signin firebase
        signInUser(email, password)
            .then(result => {
                const user = result.user;
                if (user) {
                    navigate(location.state || '/')
                        .then(() => {
                            Swal.fire({
                                title: "Login Successful!",
                                text: ` ${user.displayName || 'User'}!`,
                                icon: "success",
                                confirmButtonText: "Continue"
                            })
                            setUser(user)
                        })

                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Login Failed",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Retry"
                });
            })
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                if (user) {
                    navigate(location.state || '/')
                        .then(() => {
                            setUser(user)
                            Swal.fire({
                                title: "Login Successful!",
                                text: `Welcome, ${user.displayName || 'User'}!`,
                                icon: "success",
                                confirmButtonText: "Continue"
                            })

                        })
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Login Failed",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Retry"
                });
            })
    }

    return (
        <div className='flex justify-center items-center h-screen  bg-[url(https://i.ibb.co/hJky57qh/bg6.jpg)] bg-cover '>
            <div className="card flex flex-col-reverse md:flex-row w-xl md:w-2xl lg:w-7xl  shrink-0  shadow-2xl  p-12  backdrop-blur-3xl rounded-xl  border-2 border-gray-400 ">
                <div className='flex-1'>
                    <div className='place-items-center  '>
                        <img className='h-16 ' src={logo} alt="" />
                    </div>
                    <div className=''>
                        <h1 className="text-3xl font-bold text-center py-4 text-gray-300">Login now!</h1>

                        <form onSubmit={handleLogin} className="fieldset">
                            <label className="label text-white">Email</label>
                            <input type="email" className="input w-full bg-white text-black" name='email' required placeholder="Email" />
                            <label className="label text-white">Password</label>
                            <input type="password" className="input w-full bg-white text-black validator" required placeholder="Password" minLength="8"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                                title="Must be more than 6 characters, including number, lowercase letter, uppercase letter" />
                            <div><a className="link link-hover text-white">Forgot password?</a></div>
                            <input type='submit' className="btn bg-[#006400] mt-4 text-white font-bold border-0" value='Login'></input>
                        </form>
                        <div className='flex flex-col text-center gap-2 pt-4'>
                            <p className='text-white text-lg'>or</p>

                            {/* Google */}
                            <button onClick={handleGoogleSignIn} className="btn btn-outline text-white border-white">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>
                        </div>
                        <p className='text-sm text-white pt-5 text-center'>Don't have an account?
                            <Link className='text-blue-500 underline' to={'/register'}>  Register</Link></p>

                    </div>

                </div>
                <div className='flex-1 '>
                    <div className='flex h-full justify-center items-center px-5'>
                        <h1 className='text-center text-5xl font-bold text-gray-300'>Dive into Flavor – <br /><span className='text-4xl'> Sign in to Discover, Share, and Savor!</span></h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;