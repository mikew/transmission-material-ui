import List from '@material-ui/core/List/List'
import { memo } from 'react'

import ListHeaderTopBar from '@src/util/ListHeaderTopBar'

import TrackerListItem from './TrackerListItem'

interface Props {
  torrent: TransmissionTorrent
}

function TorrentTrackerList(props: Props) {
  return (
    <List dense={true}>
      <ListHeaderTopBar>{props.torrent.name}</ListHeaderTopBar>
      {props.torrent.trackerStats.map((x) => (
        <TrackerListItem key={x.id} tracker={x} />
      ))}
    </List>
  )
}

export default memo(TorrentTrackerList)
