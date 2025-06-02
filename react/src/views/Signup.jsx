import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        };
        console.log(payload);

    };
    return (
        <div className='h-screen'>
            <div className='flex justify-center items-center h-full flex-col  fade-in'>

                <form action=" " onSubmit={onSubmit} className='flex flex-col p-10 shadow-2xl  rounded-lg w-[400px] space-y-4'>
                    {/* form title */}
                    <h1 className='text-center font-bold text-2xl '>Login into your account</h1>
                    <input ref={nameRef} type="text" placeholder='Full Name' className=' px-6 py-3  rounded shadow border border-black/10 hover:bg-blue-100' />
                    <input ref={emailRef} type="email" placeholder='Email Address' className=' px-6 py-3  rounded shadow border border-black/10 hover:bg-blue-100' />
                    <input
                        ref={passwordRef} type="password"
                        placeholder="Password"
                        className="px-6 py-3 rounded shadow border border-black/10 hover:bg-blue-100"
                    />
                    <input
                        ref={passwordConfirmationRef} type="password"
                        placeholder="Password Confirmation"
                        className="px-6 py-3 rounded shadow border border-black/10 hover:bg-blue-100"
                    />

                    <button className=' bg-violet-700 py-3 rounded-lg text-white font-bold hover:bg-violet-800 hover:text-violet-100'>
                        Sign Up
                    </button>
                    <p className='text-center text-gray-400'>Already Registered?
                        <Link to='/login' className='text-violet-600 font-bold' > Sign in
                        </Link></p>
                </form>
            </div>
        </div>
    );
};

export default Signup;