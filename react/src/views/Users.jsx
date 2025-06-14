import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { Link } from 'react-router-dom';
const Users = () => {
    const [users, setUsers] = useState([]);
    const { loading, setLoading, theme } = useContext(GlobalContext);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get('/users');
            console.log(response);
            setUsers(response.data.users.data);

        } catch (error) {

        } finally {
            setLoading(false);
        }
    };
    const onDelete = async (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        try {
            const res = await axiosClient.delete(`/users/${user.id}`);
            getUsers();
        } catch (error) {

        }
    };
    const themeClasses = {
        container: theme === 'dark' ? 'bg-white/4' : 'bg-white/60',
        tableHeader: theme === 'dark' ? 'bg-black/20 border-white/20' : 'border-gray-200 bg-gray-200',
        tableBody: theme === 'dark' ? 'bg-black/2' : 'bg-white',
        tableRow: theme === 'dark' ? 'hover:bg-gray-900' : 'hover:bg-gray-100',
        text: theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
    };
    return (
        <div className="fade-in ease-in-out" >
            <div className="flex justify-between items-center mb-6 ">
                <h1 className="font-bold text-3xl">Users</h1>
                <Link to={'/users/create'} className="px-4 py-1 bg-green-500 rounded text-white font-bold"> Add Users </Link>
            </div>
            <div className={`${themeClasses.container} p-8 rounded-lg shadow-xl max-w-7xl mx-auto`}>
                <table className="w-full border-collapse ">
                    <thead className={`${themeClasses.tableHeader} border-b  `}>
                        <tr className="">
                            <th className="px-6 py-4 text-left text-md font-semibold">ID</th>
                            <th className="px-6 py-4 text-left text-md font-semibold">Email</th>
                            <th className="px-6 py-4 text-left text-md font-semibold">Name</th>
                            <th className="px-6 py-4 text-left text-md font-semibold"> Date</th>
                            <th className="px-6 py-4 text-left text-md font-semibold">Actions</th>
                        </tr>
                    </thead>
                    {loading && <tbody>
                        <tr>
                            <td colSpan={5} className="text-center text-2xl py-2">
                                loading...
                            </td>
                        </tr>
                    </tbody>}
                    {!loading && <tbody className={`${themeClasses.tableBody}  divide-gray-600`}>
                        {
                            users.map((user) =>
                            (
                                <tr key={user.id} className={`${themeClasses.tableRow} border-b border-black/20transition-colors`}>
                                    <td className={`${themeClasses.text} px-6 py-2 text-left `}>{user.id}</td>
                                    <td className={`${themeClasses.text} px-6 py-2 text-left `}>{user.name}</td>
                                    <td className={`${themeClasses.text} px-6 py-2 text-left `}>{user.email}</td>
                                    <td className={`${themeClasses.text} px-6 py-2 text-left `}>{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td className={`${themeClasses.text} px-6 py-2 text-left `}>
                                        <div className="flex justify-center items-center space-x-2">
                                            <Link to={'/users/' + user.id} className="bg-blue-400 text-white px-4 py-1 rounded hover:bg-blue-500 text-sm font-medium transition-colors duration-500" >Edit</Link>
                                            <button onClick={(e) => onDelete(user)} className="px-4 py-1 bg-red-400 text-white rounded font-medium text-sm hover:bg-red-500 transition-colors duration-300">
                                                Delete
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            )
                            )
                        }
                    </tbody>}
                </table>
            </div>
        </div>);
};

export default Users;
