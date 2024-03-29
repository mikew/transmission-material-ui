import List from '@mui/material/List'
import { memo } from 'react'

import ListHeaderTopBar from '@src/lib/ListHeaderTopBar'

import PeerListItem from './PeerListItem'

interface Props {
  torrent: TransmissionTorrent
}

function TorrentPeerList(props: Props) {
  return (
    <List dense={true}>
      <ListHeaderTopBar>{props.torrent.name}</ListHeaderTopBar>
      {props.torrent.peers.map((x) => (
        <PeerListItem key={x.address} peer={x} />
      ))}
    </List>
  )
}

export default memo(TorrentPeerList)
