import { List, ListSubheader, MenuItem } from '@mui/material'

import { useRootSelector } from '@src/redux/helpers'

import SettingsCheckbox from './SettingsCheckbox'
import SettingsCheckboxComboWithTextField from './SettingsCheckboxComboWithTextField'
import SettingsTextField from './SettingsTextField'

export function SettingsTabPeers() {
  const blocklistSize = useRootSelector(
    (state) => state.transmissionSettings.settings['blocklist-size'],
  )
  return (
    <>
      <List dense>
        <ListSubheader>Number of Peers</ListSubheader>
        <SettingsTextField
          name={'peer-limit-global'}
          label="Global maximum connections"
          type="number"
          helperText="peers"
        />
        <SettingsTextField
          name={'peer-limit-per-torrent'}
          label="Maximum connection for new transfers"
          type="number"
          helperText="High connection limits might significantly impact system performance"
        />
      </List>

      <List dense>
        <ListSubheader>Peer Discovery</ListSubheader>
        <SettingsCheckbox
          name={'pex-enabled'}
          label="Use peer exchange (PEX) for public torrents"
        />
        <SettingsCheckbox
          name={'dht-enabled'}
          label="Use distributed hash table (DHT) for public torrents"
        />
        <SettingsCheckbox
          name={'lpd-enabled'}
          label="Use local peer discovery for public torrents"
        />
      </List>

      <List dense>
        <ListSubheader>Encryption</ListSubheader>
        <SettingsTextField name="encryption" select label="Encryption">
          <MenuItem value="required">Required</MenuItem>
          <MenuItem value="preferred">Preferred</MenuItem>
          <MenuItem value="tolerated">Tolerated</MenuItem>
        </SettingsTextField>
      </List>

      <List dense>
        <ListSubheader>Blocklist</ListSubheader>
        <SettingsCheckboxComboWithTextField
          checkboxFieldName={'blocklist-enabled'}
          textFieldName={'blocklist-url'}
          label="Prevent peers in blocklist from connecting"
          helperText={blocklistSize}
        />
      </List>
    </>
  )
}
