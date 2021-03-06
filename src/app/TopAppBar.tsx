import { default as MuiAppBar } from '@material-ui/core/AppBar/AppBar'
import Icon from '@material-ui/core/Icon/Icon'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'
import React from 'react'

import { RootState } from '@src/redux/types'
import useShallowEqualSelector from '@src/redux/useShallowEqualSelector'
import CheckAllTorrents from '@src/torrents/CheckAllTorrents'
import DeleteAllTorrents from '@src/torrents/DeleteAllTorrents'
import * as selectors from '@src/torrents/selectors'
import StartAllTorrents from '@src/torrents/StartAllTorrents'

function TopAppBar() {
  const mappedState = useShallowEqualSelector(mapState)
  const classes = useStyles()

  return (
    <MuiAppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar variant="dense">
        <div style={{ flexGrow: 1 }}>
          <CheckAllTorrents color="inherit" />
          <StartAllTorrents color="inherit" />
          <DeleteAllTorrents color="inherit" />
        </div>
        <div>
          <Typography color="inherit" variant="body2">
            {formatBytes(mappedState.rateDownload)}/s{' '}
            <Icon fontSize="inherit" style={{ verticalAlign: 'text-bottom' }}>
              arrow_downward
            </Icon>
            {' | '}
            <Icon fontSize="inherit" style={{ verticalAlign: 'text-bottom' }}>
              arrow_upward
            </Icon>{' '}
            {formatBytes(mappedState.rateUpload)}/s
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

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}))

export default React.memo(TopAppBar)
