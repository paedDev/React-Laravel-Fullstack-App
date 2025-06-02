import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const onSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className='h-screen'>
            <div className='flex justify-center items-center h-full flex-col fade-in'>

                <form action=" " onSubmit={onSubmit} className='flex flex-col p-10 shadow-2xl  rounded-lg w-[400px] space-y-4'>
                    {/* form title */}
                    <h1 className='text-center font-bold text-2xl '>Sign Up for free</h1>
                    <input type="email" placeholder='Email' className=' px-6 py-3  rounded shadow border border-black/10 hover:bg-blue-100' />
                    <input
                        type="password"
                        placeholder="Password"
                        className="px-6 py-3 rounded shadow border border-black/10 hover:bg-blue-100"
                    />

                    <button className=' bg-violet-700 py-3 rounded-lg text-white font-bold hover:bg-violet-800 hover:text-violet-100'>
                        Login
                    </button>
                    <p className='text-center text-gray-400'>Not Registered?
                        <Link to='/signup' className='text-violet-600 font-bold' > Create an Account
                        </Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;