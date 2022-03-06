import { createTheme, adaptV4Theme } from '@mui/material'

const theme = createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        main: '#455a64',
      },
      secondary: {
        main: '#b71c1c',
      },
      // type: 'dark',
    },
    typography: {
      fontSize: 14,
    },
  }),
)

export default theme
