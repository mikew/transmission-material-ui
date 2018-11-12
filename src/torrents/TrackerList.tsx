import { List, ListSubheader } from '@material-ui/core'
import ListHeaderTopBar from '@src/util/ListHeaderTopBar'
import React from 'react'

import TrackerListItem from './TrackerListItem'

interface Props {
  torrent: TransmissionTorrent
}

// tslint:disable-next-line:function-name
function TrackerList(props: Props) {
  return (
    <List>
      <ListHeaderTopBar style={{ backgroundColor: '#fff' }}>
        {props.torrent.name}
      </ListHeaderTopBar>
      {props.torrent.trackerStats.map((x) => (
        <TrackerListItem key={x.id} tracker={x} />
      ))}
    </List>
  )
}

export default TrackerList
