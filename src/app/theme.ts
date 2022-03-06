import { createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Theme } from '@mui/material/styles'

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#455a64',
    },
    secondary: {
      main: '#b71c1c',
    },
    background: {
      default: grey[50],
    },
    // type: 'dark',
  },
  typography: {
    fontSize: 14,
  },
  components: {
    // HACK https://github.com/mui/material-ui/issues/29689
    MuiIcon: {
      styleOverrides: {
        fontSizeInherit: () => ({
          fontSize: 'inherit !important',
        }),
        fontSizeSmall: ({ theme }) => ({
          fontSize: `${theme.typography.pxToRem(20)} !important`,
        }),
        fontSizeLarge: ({ theme }) => ({
          fontSize: `${theme.typography.pxToRem(36)} !important`,
        }),
      },
    },
  },
})

export default theme
