import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#6e6f91',
    },
    secondary: {
      main: '#a81515',
    },
    info: {
      main: '#006ab8',
    },
    success: {
      main: '#569805',
    },
    warning: {
      main: '#ffbb57',
    },
    error: {
      main: '#ec0263',
    },
    background: {
      paper: '#1d151e',
      default: '#070807',
    },
    mode: 'dark',
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontSize: 14,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
})

export default theme
