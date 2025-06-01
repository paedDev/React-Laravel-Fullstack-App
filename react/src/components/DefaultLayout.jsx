import React, { useContext } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { GlobalContext } from '../context/ContextProvider';
const DefaultLayout = () => {
    // to use context inside the provider
    // const {user, token } = useStateContext();
    const { user, token } = useContext(GlobalContext);

    if (!token) {
        return <Navigate to='/login' />;
    }
    const onLogout = (e) => {
        e.preventDefault();
    };
    return (

        <div className='flex  w-8xl mx-auto min-h-screen font-hanken  '>
            <aside className=' w-80 flex flex-col items-start gap-4 bg-purple-700 px-2 pt-4  text-white font-bold'>
                <Link to="/dashboard" className='hover:bg-black/20 transtion duration-500 transform hover:translate-x-2.5 w-full py-2 px-6 rounded-lg'> Dashboard</Link>
                <Link to="/users" className='hover:bg-black/20 transtion duration-500 w-full py-2 px-6 rounded-lg hover:translate-x-2.5 '> Users</Link>
            </aside>
            <div className='w-full  '>
                <header className='flex justify-between h-20 border-b border-black/30 shadow-xl items-center p-10'>
                    <div>
                        Header
                    </div>
                    <div className='flex space-x-4'>
                        <h2>  {user.name}</h2>
                        <a href="#" onClick={onLogout} className=''>Logout</a>
                    </div>
                </header>
                <main className='p-10'>
                    <Outlet />
                </main>
            </div>

        </div>
    );
};

export default DefaultLayout;