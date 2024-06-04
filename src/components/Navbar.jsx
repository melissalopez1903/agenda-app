import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, TextField, Button, Box } from '@mui/material';

const Navbar = () => {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        setKeyword("");
        e.target.reset();
        navigate(`/search?keyword=${keyword}`);
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: '#fff', color: '#000' }}>
            <Toolbar>
                <Button color="inherit" component={Link} to="/crud">
                    CRUD
                </Button>
                <Button color="inherit" component={Link} to="/users">
                    Lista de contactos
                </Button>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                    <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Buscar contacto"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            sx={{ mr: 1 }}
                    />
                    <button type="submit" variant="contained" color="secondary">
                        Buscar
                    </button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;