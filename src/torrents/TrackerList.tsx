import List from '@material-ui/core/List/List'
import ListHeaderTopBar from '@src/util/ListHeaderTopBar'
import React from 'react'

import TrackerListItem from './TrackerListItem'

interface Props {
  torrent: TransmissionTorrent
}

// tslint:disable-next-line:function-name
function TrackerList(props: Props) {
  return (
    <List dense={true}>
      <ListHeaderTopBar style={{ backgroundColor: '#fff' }}>
        {props.torrent.name}
      </ListHeaderTopBar>
      {props.torrent.trackerStats.map((x) => (
        <TrackerListItem key={x.id} tracker={x} />
      ))}
    </List>
  )
}

export default React.memo(TrackerList)
