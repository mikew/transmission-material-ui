import { createStyles } from '@material-ui/core'
import ListSubheader, {
  ListSubheaderProps,
} from '@material-ui/core/ListSubheader'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import React from 'react'

// tslint:disable-next-line:function-name
function ListHeaderTopBar(
  props: ListSubheaderProps & WithStyles<typeof styles>,
) {
  return <ListSubheader {...props} classes={{ root: props.classes.root }} />
}

const styles = createStyles({
  root: {
    top: 48,
    wordBreak: 'break-all',
  },
})

export default withStyles(styles)(ListHeaderTopBar)
