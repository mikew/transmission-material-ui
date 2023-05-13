import { Box } from '@mui/material'

/**
 * Gives some extra spacing at the bottom, useful for getting elements placed at
 * the bottom of the screen away from modern mobile OS navigation bars.
 */
const MobileNavigationSpacer: React.FC<{ children?: React.ReactNode }> = (
  props,
) => {
  return (
    <Box
      sx={{
        paddingBottom: {
          xxs: 0,
          xs: 4,
          sm: 0,
        },
      }}
    >
      {props.children}
    </Box>
  )
}

export default MobileNavigationSpacer
