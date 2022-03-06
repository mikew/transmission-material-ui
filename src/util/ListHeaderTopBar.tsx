import ListSubheader from '@mui/material/ListSubheader'
import { memo } from 'react'

import { appWithStyles } from '@src/styles/helpers'

const ListHeaderTopBar = appWithStyles(ListSubheader, (theme) => ({
  root: {
    top: 48,
    wordBreak: 'break-all',
    lineHeight: 2,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default memo(ListHeaderTopBar)
