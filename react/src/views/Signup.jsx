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
    const onSubmit = async (e) => {
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
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response || error.response.data);
            } else {
                setErrors({
                    general: [
                        "Connection failed. Please check if the server is running.",
                    ],
                });
            }
        }
        console.log(payload);
    };

    return (
        <div className="h-screen">
            <div className="flex justify-center items-center h-full flex-col  fade-in">
                <form
                    action=" "
                    onSubmit={onSubmit}
                    className="flex flex-col p-10 shadow-2xl  rounded-lg w-[400px] space-y-4"
                >
                    {/* form title */}
                    <h1 className="text-center font-bold text-2xl ">
                        Sign Up for Free
                    </h1>
                    {errors && (
                        <div className="text-red-500 text-sm">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input
                        ref={nameRef}
                        type="text"
                        placeholder="Full Name"
                        className=" px-6 py-3  rounded shadow border border-black/10 hover:bg-blue-100"
                    />
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email Address"
                        className=" px-6 py-3  rounded shadow border border-black/10 hover:bg-blue-100"
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        className="px-6 py-3 rounded shadow border border-black/10 hover:bg-blue-100"
                    />
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
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
