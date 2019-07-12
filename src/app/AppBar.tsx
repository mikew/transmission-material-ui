import { default as MuiAppBar } from '@material-ui/core/AppBar/AppBar'
import Fab from '@material-ui/core/Fab/Fab'
import Icon from '@material-ui/core/Icon/Icon'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import * as inspectorActions from '@src/inspector/actions'
import { AppDispatch, RootState } from '@src/redux/types'
import { appStyles, AppStyles } from '@src/styles'
import * as torrentsActions from '@src/torrents/actions'
import React from 'react'
import { connect } from 'react-redux'

function AppBar(
  props: ReturnType<typeof mapState> &
    ReturnType<typeof mapDispatch> &
    AppStyles<typeof styles>,
) {
  const { classes } = props

  return (
    <MuiAppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolbar} variant="dense">
        <div>
          <IconButton color="inherit">
            <Icon>search</Icon>
          </IconButton>
          <IconButton color="inherit">
            <Icon>filter_list</Icon>
          </IconButton>
        </div>
        <div className={classes.fabContainer}>
          <Fab
            color="secondary"
            aria-label="Add"
            className={classes.fabButton}
            onClick={props.toggleAddDialog}
          >
            <Icon>add</Icon>
          </Fab>
        </div>
        <div>
          <IconButton color="inherit" onClick={props.toggleInspector}>
            <Icon>{props.isInspectorOpen ? 'close' : 'info'}</Icon>
          </IconButton>
          <IconButton color="inherit" aria-label="Open drawer">
            <Icon>menu</Icon>
          </IconButton>
        </div>
      </Toolbar>
    </MuiAppBar>
  )
}

const mapState = (state: RootState) => ({
  isInspectorOpen: state.inspector.isInspectorOpen,
})

const mapDispatch = (dispatch: AppDispatch) => ({
  toggleInspector: () => dispatch(inspectorActions.toggleInspector()),
  toggleAddDialog: () => dispatch(torrentsActions.toggleAddDialog()),
})

const styles = appStyles((theme) => ({
  appBar: {
    top: 'auto !important',
    bottom: '0 !important',
    zIndex: `${theme.zIndex.drawer + 1} !important` as any,
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

export default connect(
  mapState,
  mapDispatch,
)(styles(AppBar))
