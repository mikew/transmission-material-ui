import Lock from '@mui/icons-material/Lock'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { memo } from 'react'

interface Props {
  peer: TransmissionPeer
}

function PeerListItem(props: Props) {
  const icon = props.peer.isEncrypted ? (
    <Lock fontSize="inherit">lock</Lock>
  ) : undefined

  return (
    <ListItem divider>
      <ListItemText
        primary={props.peer.address}
        secondary={props.peer.clientName}
      />
      {icon}
    </ListItem>
  )
}

export default memo(PeerListItem)
