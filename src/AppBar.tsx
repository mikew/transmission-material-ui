import {
  AppBar as MuiAppBar,
  Button,
  createStyles,
  Icon,
  IconButton,
  Theme,
  Toolbar,
} from '@material-ui/core'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { AppDispatch, RootState } from '@src/redux/types'
import React from 'react'
import { connect } from 'react-redux'

import * as actions from './torrents/actions'

// tslint:disable-next-line:function-name
function AppBar(
  props: ReturnType<typeof mapState> &
    ReturnType<typeof mapDispatch> &
    WithStyles<typeof styles>,
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
          <Button
            variant="fab"
            color="secondary"
            aria-label="Add"
            className={classes.fabButton}
            onClick={props.toggleAddDialog}
          >
            <Icon>add</Icon>
          </Button>
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
  isInspectorOpen: state.torrents.isInspectorOpen,
})

const mapDispatch = (dispatch: AppDispatch) => ({
  toggleInspector: () => dispatch(actions.toggleInspector()),
  toggleAddDialog: () => dispatch(actions.toggleAddDialog()),
})

const styles = (theme: Theme) =>
  createStyles({
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
  })

export default connect(
  mapState,
  mapDispatch,
)(withStyles(styles)(AppBar))
