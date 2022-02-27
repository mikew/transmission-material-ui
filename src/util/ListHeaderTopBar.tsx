import ListSubheader from '@material-ui/core/ListSubheader'
import { memo } from 'react'

import { appStyles } from '@src/styles'

const styles = appStyles((theme) => ({
  root: {
    top: 48,
    wordBreak: 'break-all',
    lineHeight: 2,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default memo(styles(ListSubheader))
