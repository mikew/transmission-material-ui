import { List, ListSubheader, MenuItem } from '@mui/material'

import SettingsCheckbox from './SettingsCheckbox'
import SettingsCheckboxComboWithTextField from './SettingsCheckboxComboWithTextField'
import SettingsTextField from './SettingsTextField'
import TransmissionTimeField from './TransmissionTimeField'

let TR_SCHED_SUN = 1 << 0
let TR_SCHED_MON = 1 << 1
let TR_SCHED_TUES = 1 << 2
let TR_SCHED_WED = 1 << 3
let TR_SCHED_THURS = 1 << 4
let TR_SCHED_FRI = 1 << 5
let TR_SCHED_SAT = 1 << 6
let TR_SCHED_WEEKDAY =
  TR_SCHED_MON | TR_SCHED_TUES | TR_SCHED_WED | TR_SCHED_THURS | TR_SCHED_FRI
let TR_SCHED_WEEKEND = TR_SCHED_SUN | TR_SCHED_SAT
let TR_SCHED_ALL = TR_SCHED_WEEKDAY | TR_SCHED_WEEKEND

export function SettingsTabBandwidth() {
  return (
    <>
      <List dense>
        <ListSubheader>Speed Limit</ListSubheader>
        <SettingsCheckboxComboWithTextField
          checkboxFieldName={'speed-limit-down-enabled'}
          textFieldName={'speed-limit-down'}
          label="Limit download rate ..."
          type="number"
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
        <SettingsTextField
          // checkboxFieldName={'alt-speed-enabled'}
          name={'alt-speed-down'}
          label="Alternate limit download rate"
          type="number"
          helperText="KB/s"
        />

        <SettingsTextField
          // checkboxFieldName={'alt-speed-enabled'}
          name={'alt-speed-up'}
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
          name={'alt-speed-time-day'}
          label="Schedule speed on ..."
          select
        >
          <MenuItem value={TR_SCHED_SUN}>Sunday</MenuItem>
          <MenuItem value={TR_SCHED_MON}>Monday</MenuItem>
          <MenuItem value={TR_SCHED_TUES}>Tuesday</MenuItem>
          <MenuItem value={TR_SCHED_WED}>Wednesday</MenuItem>
          <MenuItem value={TR_SCHED_THURS}>Thursday</MenuItem>
          <MenuItem value={TR_SCHED_FRI}>Friday</MenuItem>
          <MenuItem value={TR_SCHED_SAT}>Sunday</MenuItem>
          <MenuItem value={TR_SCHED_WEEKDAY}>Weekdays</MenuItem>
          <MenuItem value={TR_SCHED_WEEKEND}>Weekends</MenuItem>
          <MenuItem value={TR_SCHED_ALL}>Every Day</MenuItem>
        </SettingsTextField>
        <SettingsTextField
          name={'alt-speed-time-begin'}
          label="Schedule speed limit start"
          component={TransmissionTimeField}
        />
        <SettingsTextField
          name={'alt-speed-time-end'}
          label="Schedule speed limit end"
          component={TransmissionTimeField}
        />
      </List>
    </>
  )
}
