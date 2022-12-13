import {
    AppBar,
    Box,
    Typography,
    Button,
    Toolbar
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import Nav from './Nav';

export default function Header() {
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <Nav />
                    <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
                        Yoked
                    </Typography>
                    <Button component={RouterLink} to='/signup' color='inherit'>Sign Up</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
};