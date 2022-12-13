import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Drawer,
    Box,
    Typography,
    IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
            <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr:2 }} onClick={() => setIsOpen(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor='left'
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <Box >
                    <Typography variant='h6' component='div'>
                        Templates
                    </Typography>
                    <Typography variant='h6' component='div'>
                        History
                    </Typography>
                </Box>
            </Drawer>
        </>
    )
}