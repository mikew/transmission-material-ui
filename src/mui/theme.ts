import { listItemClasses } from '@mui/material/ListItem'
import { createTheme } from '@mui/material/styles'

import SlideUp from '@src/lib/SlideUp'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxs: true
  }
}

const ROUNDED_BORDER_RADIUS = 9999

const theme = createTheme({
  breakpoints: {
    values: {
      // What we actually care about
      xxs: 0,
      // "If you change the default breakpoints's values, you need to provide
      // them all"
      xs: 321,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
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
  components: {
    MuiListSubheader: {
      styleOverrides: {
        root: {
          // Both ListSubheader and TextField's label have a z-index of 1, which
          // means the label will appear over the header.
          // We don't want that.
          zIndex: 2,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        divider: {
          '&:last-child': {
            borderBottomWidth: 0,
          },
        },
        container: {
          [`&:last-child .${listItemClasses.divider}`]: {
            borderBottomWidth: 0,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        divider: {
          '&:last-child': {
            borderBottomWidth: 0,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        TransitionComponent: SlideUp,
      },
    },
    MuiTextField: {
      defaultProps: {
        // Looks a little more modern than outlined.
        variant: 'filled',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // There's no need for buttons to yell at everyone.
          textTransform: 'initial',
        },
        contained: {
          borderRadius: ROUNDED_BORDER_RADIUS,
        },
        outlined: {
          borderRadius: ROUNDED_BORDER_RADIUS,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: ROUNDED_BORDER_RADIUS,
        },
        bar: {
          borderRadius: ROUNDED_BORDER_RADIUS,
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          pointerEvents: 'none',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          pointerEvents: 'initial',
        },
      },
    },
  },
})

export default theme
