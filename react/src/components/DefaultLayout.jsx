import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { GlobalContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { IoLogOutOutline } from "react-icons/io5";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
const DefaultLayout = () => {
    // to use context inside the provider
    // const {user, token } = useStateContext();
    const { user, token, setUser, setToken, theme, toggleTheme } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);

    const onLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosClient.post("/logout");
            setUser({});
            setToken(null);
        } catch (error) {
            console.log("Error Logout", error);

        }
    };
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await axiosClient.get('/users');
            setUser(res.data);
        } catch (error) {
            console.error("Error fetch users:", error);

        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (token) {
            fetchUsers();
        }
    }, [token]);
    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        loading ?
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">
                    Please wait ....
                </div>
            </div> :
            (
                <div className="flex  w-8xl mx-auto min-h-screen font-hanken fade-in ">
                    <aside className=" w-80 flex flex-col items-start gap-4  px-2 pt-4  font-bold border-r border-gray-400">
                        <Link
                            to="/dashboard"
                            className="relative w-full py-2 px-6 rounded-lg cursor-pointer group "
                        >
                            <span className={`absolute inset-0 ${theme === 'dark' ? ' bg-white/80 ' : ' bg-black/80'} rounded-lg translate-x-[-120%]  group-hover:translate-x-0 transition-transform duration-500 `}></span>
                            <span className={`z-10 relative  transtion-colors duration-500 ${theme === 'dark' ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
                                Dashboard
                            </span>
                        </Link>

                        {
                            <Link
                                to="/users"
                                className={`hover:bg-black/80 transtion duration-500 w-full py-2 px-6 rounded-lg hover:translate-x-2.5  ${theme === 'dark' ? "hover:text-black hover:bg-white/80" : 'hover:bg-black/80  hover:text-white'} `}
                            >
                                {" "}
                                Users
                            </Link>
                        }
                    </aside>
                    <div className="w-full  ">
                        <header className={`flex justify-between h-20 border-b shadow-xl items-center p-10 ${theme === 'dark' ? 'border-white/70' : 'border-gray-300'}`}>
                            <div>Header</div>
                            <div className="flex space-x-4 items-center">
                                <h2> {loading ? "loading..." : user?.name}</h2>
                                <IoLogOutOutline size={30} width={30} height={30} className="text-center cursor-pointer " onClick={onLogout} />
                                <div className="flex items-center">
                                    <button onClick={toggleTheme}>
                                        {
                                            theme === 'dark' ?
                                                <FaToggleOn className="text-3xl hover-text-cyan-500 duration-500" /> : <FaToggleOff className="text-3xl hover-text-cyan-500 duration-500" />

                                        }
                                    </button>
                                </div>
                            </div>
                        </header>
                        <main className="p-10">
                            <Outlet />
                        </main>
                    </div>
                </div>
            )
    );
};

export default DefaultLayout;
