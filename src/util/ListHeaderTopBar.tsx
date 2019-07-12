import ListSubheader, {
  ListSubheaderProps,
} from '@material-ui/core/ListSubheader'
import { AppStyles, appStyles } from '@src/styles'
import React from 'react'

function ListHeaderTopBar(
  props: ListSubheaderProps & AppStyles<typeof styles>,
) {
  return <ListSubheader {...props} />
}

const styles = appStyles((theme) => ({
  root: {
    top: 48,
    wordBreak: 'break-all',
    lineHeight: 2,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default React.memo(styles(ListHeaderTopBar))
