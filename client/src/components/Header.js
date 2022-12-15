import { AppBar, Box, Typography, Button, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import Nav from './Nav';

const theme = createTheme({
  palette: {
    primary: {
      main: '#a9d1db',
    },
    secondary: {
      main: '#ffc529',
    },
    neutral: {
      main: '#161616',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          color: '#161616',
        },
      },
    },
  },
});

export default function Header() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position='static'
          sx={{ backgroundColor: '#a9d1db' }}>
          <Toolbar>
            <Nav />
            <Typography
              variant='h5'
              component='div'
              color='neutral'
              sx={{ flexGrow: 1, color: '#161616' }}>
              Yoked
            </Typography>
            <img
              src='EggLogo.png'
              alt='EggLogo'
              width='50'
              height='50'></img>
            <Button
              component={RouterLink}
              style={{ color: '#161616' }}
              to='/signup'>
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
