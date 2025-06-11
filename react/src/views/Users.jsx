import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
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
    return <div>Users</div>;
};

export default Users;
