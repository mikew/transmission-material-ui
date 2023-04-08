import Icon from '@mui/material/Icon/Icon'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { DistributiveOmit } from '@mui/types'
import { memo } from 'react'

import { TorrentStatus } from '@src/api'
import {
  useRootDispatch,
  useRootSelectorShallowEqual,
} from '@src/redux/helpers'

import actions from './actions'
import * as selectors from './selectors'

type Props = DistributiveOmit<IconButtonProps, 'onClick'>

function StartAllTorrents(props: Props) {
  const dispatch = useRootDispatch()
  const mappedState = useRootSelectorShallowEqual(mapState)

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
    <IconButton {...props} onClick={handleClick} size="large">
      <Icon>{areAllStopped ? 'play_arrow' : 'stop'}</Icon>
    </IconButton>
  )
}

const mapState = (state: RootState) => ({
  torrents: selectors.getAll(state),
  contextIds: selectors.getSelectedOrAllIds(state),
})

export default memo(StartAllTorrents)
