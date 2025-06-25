import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Components/Loading';
import { Navigate, useLocation } from 'react-router';


const PrivateRouter = ({children}) => {
    const { loading, user } = use(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }
    return children;
};

export default PrivateRouter;