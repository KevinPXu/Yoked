import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Drawer,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        sx={{ mr: 2 }}
        onClick={() => setIsOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        PaperProps={{ sx: { width: '200px', backgroundColor: '#a9d1db' } }}
        anchor='left'
        open={isOpen}
        onClose={() => setIsOpen(false)}>
        <Box>
          <List>
            <ListItem>
              <ListItemButton
                component={RouterLink}
                to='/templates'>
                <ListItemText
                  primary='Templates'
                  sx={{ color: 'black' }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                component={RouterLink}
                to='/history'>
                <ListItemText
                  primary='History'
                  sx={{ color: 'black' }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
