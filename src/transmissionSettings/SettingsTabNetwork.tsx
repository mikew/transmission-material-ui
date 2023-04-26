import { Box, List, ListSubheader } from '@mui/material'

import { useRootSelector } from '@src/redux/helpers'

import SettingsCheckbox from './SettingsCheckbox'
import SettingsTextField from './SettingsTextField'

const SettingsTabNetwork = () => {
  const portStatus = useRootSelector(
    (state) => state.transmissionSettings.portStatus,
  )

  return (
    <>
      <List dense>
        <ListSubheader>Port</ListSubheader>
        <SettingsTextField
          name={'peer-port'}
          label="Peer listening port"
          type="number"
          color={
            portStatus === 'loading'
              ? 'info'
              : portStatus === 'closed'
              ? 'error'
              : portStatus === 'open'
              ? 'success'
              : undefined
          }
          focused
          helperText={
            <>
              Port Status:{' '}
              <Box
                color={
                  portStatus === 'loading'
                    ? 'info.main'
                    : portStatus === 'closed'
                    ? 'error.main'
                    : portStatus === 'open'
                    ? 'success.main'
                    : undefined
                }
                component="span"
              >
                {portStatus}
              </Box>
            </>
          }
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
