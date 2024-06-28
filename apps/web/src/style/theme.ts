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
    modal: {
      accent: '#111111',
      // TODO: discuss with team about Login/Register hover color
      accentTransparentHover: '#11111159',
      hover: '#666666',
      text: {
        primary: '#666666',
        primaryTransparent: '#66666659',
        secondary: '#FFFFFF',
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    button: { textTransform: 'none' },
    modal: {
      fontFamily: '"Poppins", sans-serif',
      fontWeightRegular: 400,
      fontSize: '40px',
    },
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
      sm: 320,
      md: 768,
      lg: 1024,
      xl: 1240,
    },
  },
  spacing: 4,
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1240px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '16px',
          paddingRight: '16px',
          '@media (min-width: 1024px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
          },
          '@media (min-width: 1240px)': {
            paddingLeft: '32px',
            paddingRight: '32px',
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
    MuiList: {
      styleOverrides: { root: { padding: 0, width: 'auto' } },
    },
    MuiListItem: {
      styleOverrides: { root: { padding: 0, display: 'block', maxWidth: '100%', width: 'auto' } },
    },
  },
});
