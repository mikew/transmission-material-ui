import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { default as MuiAppBar } from '@material-ui/core/AppBar/AppBar'
import Icon from '@material-ui/core/Icon/Icon'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'
import { RootState } from '@src/redux/types'
import React from 'react'
import { connect } from 'react-redux'

import CheckAllTorrents from './torrents/CheckAllTorrents'
import DeleteAllTorrents from './torrents/DeleteAllTorrents'
import * as selectors from './torrents/selectors'
import StartAllTorrents from './torrents/StartAllTorrents'

// tslint:disable-next-line:function-name
function TopAppBar(
  props: ReturnType<typeof mapState> & WithStyles<typeof styles>,
) {
  const { classes } = props

  return (
    <MuiAppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar variant="dense">
        <div style={{ flexGrow: 1 }}>
          <CheckAllTorrents color="inherit" />
          <StartAllTorrents color="inherit" />
          <DeleteAllTorrents color="inherit" />
        </div>
        <div>
          <Typography color="inherit">
            {formatBytes(props.rateDownload)}/s{' '}
            <Icon fontSize="inherit" style={{ verticalAlign: 'text-bottom' }}>
              arrow_downward
            </Icon>
            {' | '}
            <Icon fontSize="inherit" style={{ verticalAlign: 'text-bottom' }}>
              arrow_upward
            </Icon>{' '}
            {formatBytes(props.rateUpload)}/s
          </Typography>
        </div>
      </Toolbar>
    </MuiAppBar>
  )
}

function formatBytes(bytes: number | string, decimals = 2) {
  if (!bytes) {
    return '0 B'
  }

  // tslint:disable-next-line:no-parameter-reassignment
  bytes = Number(bytes)
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)

  return `${value.toFixed(decimals)} ${sizes[i]}`
}

const mapState = (state: RootState) => ({
  rateUpload: selectors.getRateUpload(state),
  rateDownload: selectors.getRateDownload(state),
})

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  })

export default connect(mapState)(withStyles(styles)(TopAppBar))
