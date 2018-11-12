import {
  AppBar as MuiAppBar,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { AppDispatch, RootState } from '@src/redux/types'
import React from 'react'
import { connect } from 'react-redux'

import * as actions from './torrents/actions'
import CheckAllTorrents from './torrents/CheckAllTorrents'
import * as selectors from './torrents/selectors'
import StartAllTorrents from './torrents/StartAllTorrents'

// tslint:disable-next-line:function-name
function TopAppBar(props: ReturnType<typeof mapState> & WithStyles<ClassKey>) {
  const { classes } = props

  return (
    <MuiAppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar variant="dense">
        <div style={{ flexGrow: 1 }}>
          <CheckAllTorrents />
          <StartAllTorrents />
          <IconButton color="inherit">
            <Icon>play_arrow</Icon>
          </IconButton>
          <IconButton color="inherit">
            <Icon>stop</Icon>
          </IconButton>
          <IconButton color="inherit">
            <Icon>delete</Icon>
          </IconButton>
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

type ClassKey = 'appBar'
const decorator = withStyles<ClassKey>((_theme) => ({
  appBar: {
    // top: 'auto',
    // bottom: 0,
    zIndex: _theme.zIndex.drawer + 1,
  },
  // toolbar: {
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
  // fabContainer: {
  //   transform: 'translateY(-30px)',
  // },
  // fabButton: {},
}))

export default connect(mapState)(decorator(TopAppBar))
