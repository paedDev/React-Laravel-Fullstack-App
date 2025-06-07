import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const onSubmit = (e) => {
        e.preventDefault();
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
                    <inpu
                        type="email"
                        placeholder="Email"
                        className=" px-6 py-3  rounded shadow border border-black/10 hover:bg-blue-100"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="px-6 py-3 rounded shadow border border-black/10 hover:bg-blue-100"
                    />

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
