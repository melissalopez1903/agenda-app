import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText, Button, Box, Typography } from '@mui/material';

const UsersList = ({ users }) => {
    
    return (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}> 
            <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>  
                {users.map(user => (
                    <ListItem key={user.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <ListItemText
                            primary={`${user.firstName} ${user.lastName}`}
                            primaryTypographyProps={{ variant: 'body1', fontWeight: 'bold' }}
                        />
                        <Button
                            component={Link}
                            to={`/users/${user.id}`}
                            variant="contained"
                            color="primary"
                        >
                            Más detalles
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default UsersList;