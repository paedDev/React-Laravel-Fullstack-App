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
        <>
            Guest Layout here
            <Outlet />
        </>
    );
};

export default GuestLayout;