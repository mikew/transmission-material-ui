import ListSubheader from '@mui/material/ListSubheader'
import withStyles from '@mui/styles/withStyles'
import { memo } from 'react'

const styles = withStyles((theme) => ({
  root: {
    top: 48,
    wordBreak: 'break-all',
    lineHeight: 2,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default memo(styles(ListSubheader))
