import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { Link } from 'react-router-dom';
const Users = () => {
    const [users, setUsers] = useState([]);
    const { loading, setLoading } = useContext(GlobalContext);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get('/users');
            console.log(response);

        } catch (error) {

        } finally {
            setLoading(false);
        }
    };
    return (
        <div >
            <div className="flex justify-between items-center">
                <h1>Users</h1>
                <Link to={'/users/create'}> Add New Users </Link>
            </div>
        </div>);
};

export default Users;
