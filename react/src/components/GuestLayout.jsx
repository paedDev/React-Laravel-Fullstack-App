import React from 'react';
import { Outlet } from 'react-router-dom';
const GuestLayout = () => {
    return (
        <>
            Guest Layout here
            <Outlet />
        </>
    );
};

export default GuestLayout;