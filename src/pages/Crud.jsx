import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { Container, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const Crud = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
    });

    const [editID, setEditID] = useState();
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0);

    const { firstName, lastName, email, phone, address } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const parseAddress = (addressString) => {
        const [address, city, state, stateCode, postalCode, country] = addressString.split(',').map(item => item.trim());
        return { address, city, state, stateCode, postalCode, country };
    };

    const formatAddress = (address) => {
        return `${address.address}, ${address.city}, ${address.state}, ${address.stateCode}, ${address.postalCode}, ${address.country}`;
    };

    const handleSubmit = (e) => { 
        e.preventDefault();
        if (firstName && lastName && email && phone && address) {
            const formDataWithParsedAddress = {
                ...formData,
                address: parseAddress(address)
            };
            Axios.post('https://dummyjson.com/users/add', formDataWithParsedAddress)
                .then(res => {
                    setData([...data, res.data]); //updates state with new contact
                    setFormData({ firstName: "", lastName: "", email: "", phone: "", address: "" });
                    console.log('added record:', res);
                })
                .catch(err => console.log(err));
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (firstName && lastName && email && phone && address && editID) {
            const formDataWithParsedAddress = {
                ...formData,
                address: parseAddress(address)
            };
            Axios.put(`https://dummyjson.com/users/${editID}`, formDataWithParsedAddress)
                .then(res => {
                    const updatedData = data.map(user =>
                        user.id === editID ? res.data : user
                    );
                    setData(updatedData); // Updates state with modified contact
                    setFormData({ firstName: "", lastName: "", email: "", phone: "", address: "" });
                    setEditID(null);
                    console.log('updated record:', res);
                })
                .catch(err => console.log(err));
        }
    };

    const handleDelete = (deleteID) => {
        Axios.delete(`https://dummyjson.com/users/${deleteID}`)
            .then(res => {
                console.log('Deleted record:', res);
                // Update the state to remove the deleted record
                setData(data.filter(item => item.id !== deleteID));
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (editIDNotState) => {
        Axios.get(`https://dummyjson.com/users/${editIDNotState}`)
            .then(res => {
                setFormData({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    phone: res.data.phone,
                    address: formatAddress(res.data.address)
                });
                setEditID(editIDNotState);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        Axios.get('https://dummyjson.com/users')
            .then(res => {
                setData(res.data.users);
            })
            .catch(err => console.log(err));
    }, [refresh]);

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={6} mx="auto">
                    <Typography variant="h4"> Datos de contacto</Typography>
                    <form onSubmit={editID ? handleUpdate : handleSubmit}>
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="firstName"
                            value={firstName}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Apellido"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="lastName"
                            value={lastName}
                            onChange={handleChange}
                        />

                        <TextField
                            label="E-Mail"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Teléfono"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="phone"
                            value={phone}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Dirección"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="address"
                            value={address}
                            onChange={handleChange}
                            placeholder="Escribe calle, ciudad, estado, código postal, país"
                        />

                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {editID ? 'Actualizar' : 'Enviar'}
                        </Button>
                    </form>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Apellido</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>E-Mail</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Dirección</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(data) && data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{formatAddress(user.address)}</TableCell>
                                    <TableCell>
                                    <Box display="flex" justifyContent="space-between">
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                onClick={() => handleEdit(user.id)}
                                                style={{ flexGrow: 1, marginRight: '5px' }}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleDelete(user.id)}
                                                style={{ flexGrow: 1, marginLeft: '5px' }}
                                            >
                                                Borrar
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        );
}

export default Crud;
