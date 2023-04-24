import { List, ListSubheader } from '@mui/material'
import React from 'react'

import SettingsCheckbox from './SettingsCheckbox'
import SettingsCheckboxComboWithTextField from './SettingsCheckboxComboWithTextField'
import SettingsTextField from './SettingsTextField'

export function SettingsTabBandwidth() {
  return (
    <>
      <List dense>
        <ListSubheader>Speed Limit</ListSubheader>
        <SettingsCheckboxComboWithTextField
          checkboxFieldName={'speed-limit-down-enabled'}
          textFieldName={'speed-limit-down'}
          label="Limit download rate ..."
          helperText="KB/s"
        />

        <SettingsCheckboxComboWithTextField
          checkboxFieldName={'speed-limit-up-enabled'}
          textFieldName={'speed-limit-up'}
          label="Limit upload rate ..."
          type="number"
          helperText="KB/s"
        />
      </List>

      <List dense>
        <ListSubheader>Alternate Speed Limit</ListSubheader>
        <SettingsCheckboxComboWithTextField
          checkboxFieldName={'alt-speed-enabled'}
          textFieldName={'alt-speed-down'}
          label="Alternate limit download rate"
          type="number"
          helperText="KB/s"
        />

        <SettingsCheckboxComboWithTextField
          checkboxFieldName={'alt-speed-enabled'}
          textFieldName={'alt-speed-up'}
          label="Alternate limit upload rate"
          type="number"
          helperText="KB/s"
        />
      </List>

      <List dense>
        <ListSubheader>Alternate Speed Limit Schedule</ListSubheader>
        <SettingsCheckbox
          name={'alt-speed-time-enabled'}
          label="Schedule speed limit"
        />
        <SettingsTextField
          name={'alt-speed-time-begin'}
          label="Schedule speed limit start"
          type="date"
        />
        <SettingsTextField
          name={'alt-speed-time-end'}
          label="Schedule speed limit end"
          type="date"
        />
      </List>
    </>
  )
}
