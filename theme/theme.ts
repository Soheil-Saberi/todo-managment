import { createTheme } from '@mui/material/styles'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {},
})

export const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    ...lightTheme.palette,
    mode: 'dark',
    primary: {
      ...lightTheme.palette.primary,
      main: '#90caf9',
    },
    secondary: {
      ...lightTheme.palette.secondary,
      main: '#ffab91',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
  },
})
