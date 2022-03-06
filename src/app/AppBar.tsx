import { default as MuiAppBar } from '@mui/material/AppBar'
import Fab from '@mui/material/Fab/Fab'
import Icon from '@mui/material/Icon/Icon'
import IconButton from '@mui/material/IconButton/IconButton'
import Toolbar from '@mui/material/Toolbar/Toolbar'
import { memo } from 'react'

import inspectorActions from '@src/inspector/actions'
import useDispatch from '@src/redux/useDispatch'
import useSelector from '@src/redux/useSelector'
import { appMakeStyles } from '@src/styles/helpers'
import torrentsActions from '@src/torrents/actions'

function AppBar() {
  const { classes } = useStyles()
  const dispatch = useDispatch()
  const toggleInspector = () => dispatch(inspectorActions.toggleInspector())
  const toggleAddDialog = () => dispatch(torrentsActions.toggleAddDialog())
  const isInspectorOpen = useSelector(
    (state) => state.inspector.isInspectorOpen,
  )

  return (
    <MuiAppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolbar} variant="dense">
        <div>
          {/* <IconButton color="inherit">
            <Icon>search</Icon>
          </IconButton>
          <IconButton color="inherit">
            <Icon>filter_list</Icon>
          </IconButton> */}
        </div>
        <div className={classes.fabContainer}>
          <Fab
            color="secondary"
            aria-label="Add"
            className={classes.fabButton}
            onClick={toggleAddDialog}
          >
            <Icon>add</Icon>
          </Fab>
        </div>
        <div>
          <IconButton color="inherit" onClick={toggleInspector} size="large">
            <Icon>{isInspectorOpen ? 'close' : 'info'}</Icon>
          </IconButton>
          {/* <IconButton color="inherit" aria-label="Open drawer">
            <Icon>menu</Icon>
          </IconButton> */}
        </div>
      </Toolbar>
    </MuiAppBar>
  )
}

const useStyles = appMakeStyles()((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabContainer: {
    transform: 'translateY(-30px)',
  },
  fabButton: {},
}))

export default memo(AppBar)
