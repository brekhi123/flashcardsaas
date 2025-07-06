// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366', // Deep Navy
    },
    secondary: {
      main: '#00B2A9', // Vibrant Teal
    },
    background: {
      default: '#F5F5F5', // Light Grey
    },
    text: {
      primary: '#003366', // Deep Navy
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h2: {
      fontWeight: 700,
      color: '#003366', // Deep Navy
    },
    h5: {
      fontWeight: 400,
      color: '#003366', // Deep Navy
    },
    h6: {
      fontWeight: 600,
      color: '#003366', // Deep Navy
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#003366', // Deep Navy
          color: '#FFFFFF', // White
          '&:hover': {
            backgroundColor: '#002244', // Darker Navy
          },
        },
        outlinedPrimary: {
          borderColor: '#00B2A9', // Vibrant Teal
          color: '#00B2A9', // Vibrant Teal
          '&:hover': {
            borderColor: '#003366', // Deep Navy
            color: '#003366', // Deep Navy
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#003366', // Deep Navy
          boxShadow: 'none',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '64px',
        },
      },
    },
  },
});

export default theme;
