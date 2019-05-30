import { Icon, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'

interface Props {
  peer: TransmissionPeer
}

// tslint:disable-next-line:function-name
function PeerListItem(props: Props) {
  const icon = props.peer.isEncrypted ? (
    <Icon fontSize="inherit">lock</Icon>
  ) : (
    undefined
  )

  return (
    <ListItem>
      <ListItemText
        primary={
          <span>
            {icon}
            {props.peer.address}
          </span>
        }
        secondary={`${props.peer.rateToPeer} ${props.peer.clientName}`}
        secondaryTypographyProps={{ component: 'div' }}
      />
    </ListItem>
  )
}

export default React.memo(PeerListItem)
