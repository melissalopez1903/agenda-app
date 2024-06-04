import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Axios from 'axios';
import { Typography } from '@mui/material';

import UsersList from '../components/UsersList';

const SearchResults = () => {
    const [searchParams] = useSearchParams();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        Axios.get(`https://dummyjson.com/users/search?q=${searchParams.get("keyword")}`)
            .then(res => setUsers(res.data.users))
    }, [searchParams])

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Resultados de búsqueda
            </Typography>
            {users.length == 0 && <em>No se encontraron resultados </em>}
            {users.length && <UsersList users={users} />}
        </div>
    );
}

export default SearchResults;