import React from 'react';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    return (

        <div>
            Default Layout here
            <Outlet />
        </div>
    );
};

export default DefaultLayout;