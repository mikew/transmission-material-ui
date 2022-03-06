import Icon from '@mui/material/Icon/Icon'
import ListItem from '@mui/material/ListItem/ListItem'
import ListItemText from '@mui/material/ListItemText/ListItemText'
import { memo } from 'react'

interface Props {
  peer: TransmissionPeer
}

function PeerListItem(props: Props) {
  const icon = props.peer.isEncrypted ? (
    <Icon fontSize="inherit">lock</Icon>
  ) : undefined

  return (
    <ListItem divider={true}>
      <ListItemText
        primary={props.peer.address}
        secondary={props.peer.clientName}
        secondaryTypographyProps={
          {
            component: 'div',
            // https://github.com/mui-org/material-ui/issues/19036
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        }
      />
      {icon}
    </ListItem>
  )
}

export default memo(PeerListItem)
