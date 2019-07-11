import ListSubheader, {
  ListSubheaderProps,
} from '@material-ui/core/ListSubheader'
import { AppStyles, appStyles } from '@src/styles'
import React from 'react'

// tslint:disable-next-line:function-name
function ListHeaderTopBar(
  props: ListSubheaderProps & AppStyles<typeof styles>,
) {
  return <ListSubheader {...props} />
}

const styles = appStyles({
  root: {
    top: 48,
    wordBreak: 'break-all',
    lineHeight: 2,
  },
})

export default React.memo(styles(ListHeaderTopBar))
