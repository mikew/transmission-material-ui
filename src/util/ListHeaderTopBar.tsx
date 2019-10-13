import ListSubheader from '@material-ui/core/ListSubheader'
import { appStyles } from '@src/styles'
import React from 'react'

const styles = appStyles((theme) => ({
  root: {
    top: 48,
    wordBreak: 'break-all',
    lineHeight: 2,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default React.memo(styles(ListSubheader))
