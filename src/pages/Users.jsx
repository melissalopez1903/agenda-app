import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Axios from "axios";

import UsersList from '../components/UsersList';
import UserDetail from '../components/UserDetail';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        Axios.get("https://dummyjson.com/users")
            .then(res => setUsers(res.data.users))
    }, []);

    return (
        <div>
            <Routes>
                <Route index element={<UsersList users={users} />} />
                <Route path=":userId" element={<UserDetail />} />
            </Routes>
        </div>
    );
}

export default Users;
