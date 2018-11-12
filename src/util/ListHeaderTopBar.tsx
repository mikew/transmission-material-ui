import ListSubheader, {
  ListSubheaderProps,
} from '@material-ui/core/ListSubheader'
import React from 'react'

// tslint:disable-next-line:function-name
function ListHeaderTopBar(props: ListSubheaderProps & WithStyles<ClassKey>) {
  return <ListSubheader {...props} classes={{ root: props.classes.root }} />
}

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'

type ClassKey = 'root'
const decorator = withStyles<ClassKey>((theme) => ({
  root: {
    top: 48,
    wordBreak: 'break-all',
  },
}))

export default decorator(ListHeaderTopBar)
