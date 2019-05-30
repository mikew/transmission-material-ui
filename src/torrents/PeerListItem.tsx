import Icon from '@material-ui/core/Icon/Icon'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
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
