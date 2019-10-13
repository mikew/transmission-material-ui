import List from '@material-ui/core/List/List'
import ListHeaderTopBar from '@src/util/ListHeaderTopBar'
import React from 'react'

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

export default React.memo(TorrentTrackerList)
