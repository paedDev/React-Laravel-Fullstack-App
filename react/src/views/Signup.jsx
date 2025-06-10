import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { GlobalContext } from "../context/ContextProvider";
const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const { setUser, setToken } = useContext(GlobalContext);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        try {
            const { data } = await axiosClient.post("/signup", payload);
            setUser(data.user);
            setToken(data.token);
            setErrors(null);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
        console.log(payload);

    };
    const getError = (field) => {
        if (!errors || !errors[field]) return null;
        return Array.isArray(errors[field]) ? errors[field][0] : errors[field];
    };

    return (
        <div className="h-screen">
            <div className="flex justify-center items-center h-full flex-col  fade-in">
                <form
                    action=" "
                    onSubmit={onSubmit}
                    className="flex flex-col p-10 shadow-2xl  rounded-lg w-[400px] space-y-3"
                >
                    {/* form title */}
                    <h1 className="text-center font-bold text-2xl ">
                        Sign Up for Free
                    </h1>
                    {/* Looping the error */}
                    {/* {errors && (
                        <div className="text-white text-sm w-full bg-red-400 p-5 rounded-xl">
                            {Object.keys(errors).map((key) => {
                                const error = errors[key];
                                return error ? (
                                    <p key={key}>{error}</p>
                                ) : null;
                            })}
                        </div>
                    )} */}
                    <input
                        ref={nameRef}
                        type="text"
                        placeholder="Full Name"
                        className=" px-6 py-3  rounded shadow border border-black/10 hover:bg-blue-100"
                    />
                    {getError('name') && (
                        <p className="text-red-500 text-sm">{getError('name')}</p>   // ✅ shows 'name' error for 'name' field
                    )}
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email Address"
                        className=" px-6 py-3  rounded shadow border border-black/10 hover:bg-blue-100"
                    />
                    {
                        getError('email') && (
                            <p className="text-red-500 text-sm">{getError('email')}</p>
                        )
                    }
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        className="px-6 py-3 rounded shadow border border-black/10 hover:bg-blue-100"
                    />
                    {getError('password') && (
                        <p className="text-red-600 text-sm">{getError('password')}</p>
                    )}
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Password Confirmation"
                        className="px-6 py-3 rounded shadow border border-black/10 hover:bg-blue-100"
                    />

                    <button className="relative border-violet-800 border-2 text-black py-3 rounded-lg  font-bold  overflow-hidden group cursor-pointer">
                        <span className="absolute inset-0 bg-violet-700 translate-x-[-100%] group-hover:translate-x-0 rounded-lg transition duration-500"></span>
                        <span className="z-10 relative text-violet-800 group-hover:text-violet-200 transition-colors duration-400">
                            Sign Up
                        </span>
                    </button>
                    <p className="text-center text-gray-400">
                        Already Registered?
                        <Link to="/login" className="text-violet-600 font-bold">
                            {" "}
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
