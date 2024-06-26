import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#BDD9F9',
      hoverColor: '#A5C4F0',
    },
    secondary: {
      main: '#E0DEDE',
      hoverColor: '#D1D1D1',
    },
    info: { main: '#FDFBD8' },
    error: { main: '#f44336' },
    background: {
      default: '#FFFFFF',
      paper: '#EBF2F9',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
      placeholder: '#B7B7B7',
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    button: { textTransform: 'none' },
  },
  shape: {
    borderRadius: 8,
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    duration: {
      short: 300,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          minWidth: '320px',
          maxWidth: '375px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '20px',
          paddingRight: '20px',
          '@media (min-width: 600px)': {
            paddingLeft: '32px',
            paddingRight: '32px',
            maxWidth: '600px',
          },
          '@media (min-width: 960px)': {
            paddingLeft: '32px',
            paddingRight: '32px',
            maxWidth: '960px',
          },
          '@media (min-width: 1280px)': {
            paddingLeft: '100px',
            paddingRight: '100px',
            maxWidth: '1280px',
          },
          '@media (min-width: 1920px)': {
            paddingLeft: '100px',
            paddingRight: '100px',
            maxWidth: '1920px',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#666666',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            color: '#A6A6A6',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
          '&.MuiButton-containedPrimary:hover': {
            backgroundColor: '#A5C4F0',
          },
          '&.MuiButton-containedSecondary:hover': {
            backgroundColor: '#D1D1D1',
          },
        },
      },
    },
  },
});
