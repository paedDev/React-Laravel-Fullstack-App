import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        try {
            const { data } = await axiosClient.post("/login", payload);
            console.log("Login response", data);
            setUser(data.user);
            setToken(data.token);
            setErrors(null);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors);
            }
            console.log("Login Error:", error);

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
            <div className="flex justify-center items-center h-full flex-col fade-in">
                <form
                    action=" "
                    onSubmit={onSubmit}
                    className="flex flex-col p-10 shadow-2xl  rounded-lg w-[400px] space-y-4"
                >
                    {/* form title */}
                    <h1 className="text-center font-bold text-2xl ">
                        Login into your account
                    </h1>
                    {/* {errors && (
                        <div className="text-red-500 text-sm w-full">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key]}</p>
                            ))}
                        </div>)} */}
                    <input
                        type="email"
                        ref={emailRef}
                        placeholder="Email"
                        className=" px-6 py-3  rounded shadow border border-black/10 hover:bg-blue-100"
                    />
                    {getError('email') && (
                        <p className="text-red-500 text-sm">{getError('email')}</p>
                    )}
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        className="px-6 py-3 rounded shadow border border-black/10 hover:bg-blue-100"
                    />
                    {getError('password') && (
                        <p className="text-red-500 text-sm">{getError('password')}</p>
                    )}

                    <button className="relative py-3 rounded-lg text-violet-700 font-bold border border-violet-600 group overflow-hidden">
                        <span className="absolute bg-violet-700 inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-400"></span>
                        <span className="relative z-10 group-hover:text-white transtion-colors duration-500">
                            Login
                        </span>
                    </button>
                    <p className="text-center text-gray-400">
                        Not Registered?
                        <Link
                            to="/signup"
                            className="text-violet-600 font-bold"
                        >
                            {" "}
                            Create an Account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
