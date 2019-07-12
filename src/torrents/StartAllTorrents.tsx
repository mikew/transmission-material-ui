import Icon from '@material-ui/core/Icon/Icon'
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton'
import { Omit } from '@material-ui/types'
import { TorrentStatus } from '@src/api'
import { AppDispatchProps, RootState } from '@src/redux/types'
import React from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'
import * as selectors from './selectors'

type Props = Omit<IconButtonProps, 'onClick'> &
  ReturnType<typeof mapState> &
  AppDispatchProps

function StartAllTorrents(props: Props) {
  const { torrents, contextIds, dispatch, ...rest } = props

  const areAllStopped = props.contextIds.every(
    (x) => props.torrents[x].status === TorrentStatus.STOPPED,
  )

  const handleClick = async () => {
    if (areAllStopped) {
      props.dispatch(actions.startTorrent(props.contextIds))
    } else {
      props.dispatch(actions.stopTorrent(props.contextIds))
    }
  }

  return (
    <IconButton {...rest} onClick={handleClick}>
      <Icon>{areAllStopped ? 'play_arrow' : 'stop'}</Icon>
    </IconButton>
  )
}

const mapState = (state: RootState) => ({
  torrents: selectors.getAll(state),
  contextIds: selectors.getSelectedOrAllIds(state),
})

export default connect(mapState)(React.memo(StartAllTorrents))
