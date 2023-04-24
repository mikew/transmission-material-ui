import { List, ListSubheader } from '@mui/material'

import SettingsCheckbox from './SettingsCheckbox'
import SettingsTextField from './SettingsTextField'

const SettingsTabNetwork = () => {
  return (
    <>
      <List dense>
        <ListSubheader>Port</ListSubheader>
        <SettingsTextField
          name={'peer-port'}
          label="Peer listening port"
          type="number"
        />
        <SettingsCheckbox
          name={'peer-port-random-on-start'}
          label="Randomize port on launch"
        />
        <SettingsCheckbox
          name={'port-forwarding-enabled'}
          label="Automatically map port"
          helperText="NAT traversal uses either NAT-PMP or UPnP"
        />
      </List>

      <List dense>
        <ListSubheader>Protocol</ListSubheader>
        <SettingsCheckbox
          name={'utp-enabled'}
          label="Enable Miro Transport Protocol µTP"
        />
      </List>
    </>
  )
}

export default SettingsTabNetwork
