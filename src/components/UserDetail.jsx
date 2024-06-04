import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const UserDetail = () => {
    const [user, setUsers] = useState(null);

    const { userId } = useParams();

    useEffect(() => {
        Axios.get(`https://dummyjson.com/users/${userId}`)
            .then(res => setUsers(res.data))
    }, [userId]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            {user && (
                <Card sx={{ maxWidth: 600 }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Detalles de contacto:
                        </Typography>
                        <Typography variant="body1"><strong>Nombre:</strong> {user.firstName}</Typography>
                        <Typography variant="body1"><strong>Apellido:</strong> {user.lastName}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
                        <Typography variant="body1"><strong>Teléfono:</strong> {user.phone}</Typography>
                        <Typography variant="body1"><strong>Dirección:</strong> {user.address.address}, {user.address.city}, {user.address.state}, {user.address.stateCode}, {user.address.postalCode}, {user.address.country}</Typography>
                        <Button
                            component={Link}
                            to="/users"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Regresar a contactos
                        </Button>
                    </CardContent>
                </Card>   
            )}
        </Box>
    );
}

export default UserDetail;