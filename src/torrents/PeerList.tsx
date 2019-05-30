import List from '@material-ui/core/List/List'
import ListHeaderTopBar from '@src/util/ListHeaderTopBar'
import React from 'react'

import PeerListItem from './PeerListItem'

interface Props {
  torrent: TransmissionTorrent
}

// tslint:disable-next-line:function-name
function PeerList(props: Props) {
  return (
    <List dense={true}>
      <ListHeaderTopBar style={{ top: 48, backgroundColor: '#fff' }}>
        {props.torrent.name}
      </ListHeaderTopBar>
      {props.torrent.peers.map((x) => (
        <PeerListItem key={x.address} peer={x} />
      ))}
    </List>
  )
}

export default React.memo(PeerList)
