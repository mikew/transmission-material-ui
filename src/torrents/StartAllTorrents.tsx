import Icon from '@material-ui/core/Icon/Icon'
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton'
import { Omit } from '@material-ui/types'
import React from 'react'

import { TorrentStatus } from '@src/api'
import { RootState } from '@src/redux/types'
import useDispatch from '@src/redux/useDispatch'
import useShallowEqualSelector from '@src/redux/useShallowEqualSelector'

import actions from './actions'
import * as selectors from './selectors'

type Props = Omit<IconButtonProps, 'onClick'>

function StartAllTorrents(props: Props) {
  const dispatch = useDispatch()
  const mappedState = useShallowEqualSelector(mapState)

  const areAllStopped = mappedState.contextIds.every(
    (x) => mappedState.torrents[x].status === TorrentStatus.STOPPED,
  )

  const handleClick = () => {
    if (areAllStopped) {
      dispatch(actions.startTorrent(mappedState.contextIds))
    } else {
      dispatch(actions.stopTorrent(mappedState.contextIds))
    }
  }

  return (
    <IconButton {...props} onClick={handleClick}>
      <Icon>{areAllStopped ? 'play_arrow' : 'stop'}</Icon>
    </IconButton>
  )
}

const mapState = (state: RootState) => ({
  torrents: selectors.getAll(state),
  contextIds: selectors.getSelectedOrAllIds(state),
})

export default React.memo(StartAllTorrents)
