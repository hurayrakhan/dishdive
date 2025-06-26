import React from 'react';
import Header from '../Components/Header/Header';
import { Outlet } from 'react-router';
import { Bounce, ToastContainer } from 'react-toastify';

const Root = () => {
    return (
        <>

            <Outlet></Outlet>
            
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </>
    );
};

export default Root;