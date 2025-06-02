import React from 'react';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { GlobalContext } from '../context/ContextProvider';
const GuestLayout = () => {
    const { token } = useContext(GlobalContext);
    if (token) {
        return <Navigate to='/' />;
    }
    return (
        // <div className='h-screen'>
        //     <div className='flex justify-center items-center h-full flex-col '>
        <div>
            <Outlet />
        </div>

    );
};

export default GuestLayout;