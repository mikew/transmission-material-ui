import { List, ListSubheader } from '@mui/material'
import { useField } from 'formik'

import formatBytes from '@src/lib/formatBytes'
import { useRootSelector } from '@src/redux/helpers'

import SettingsCheckbox from './SettingsCheckbox'
import SettingsCheckboxComboWithTextField from './SettingsCheckboxComboWithTextField'
import SettingsTextField from './SettingsTextField'

export function SettingsTabTransfers() {
  const freeSpaceMap = useRootSelector(
    (state) => state.transmissionSettings.freeSpace,
  )

  // TODO This could be extracted to its own Formik Field component. That way we
  // wouldn't re-render the whole parent component when only that field should
  // care about changes.
  const [{ value: downloadDir }] = useField('download-dir')
  const freeSpace = freeSpaceMap[downloadDir]
  const freeSpaceRemaining = freeSpace
    ? formatBytes(freeSpace['size-bytes'])
    : '...'
  const driveSizeTotal = freeSpace
    ? formatBytes(freeSpace['total_size'])
    : '...'

  return (
    <>
      <List dense>
        <ListSubheader>New Torrents</ListSubheader>
        <SettingsTextField
          name="download-dir"
          label="Default location"
          helperText={`${freeSpaceRemaining} remaining (${driveSizeTotal} total)`}
        />

        <SettingsCheckbox
          name={'start-added-torrents'}
          label="Start when added"
        />
        <SettingsCheckbox
          name={'rename-partial-files'}
          label="Append .part to incomplete files"
        />
        <SettingsCheckboxComboWithTextField
          checkboxFieldName="incomplete-dir-enabled"
          textFieldName="incomplete-dir"
          label="Where to store incomplete downloads"
        />
      </List>

      <List dense>
        <ListSubheader>Automatic Seeding</ListSubheader>
        <SettingsCheckboxComboWithTextField
          checkboxFieldName={'seedRatioLimited'}
          textFieldName="seedRatioLimit"
          label="Stop seeding at ratio ..."
          type="number"
        />

        <SettingsCheckboxComboWithTextField
          checkboxFieldName={'idle-seeding-limit-enabled'}
          textFieldName="idle-seeding-limit"
          label="Stop seeding when inactive for ..."
          type="number"
          helperText="minutes"
        />
      </List>

      {/* TODO Does this exist in the API or is it a macOS client thing? */}
      {/* <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        Label={{
                          label: 'Remove from the transfer list when seeding completes',
                        }}
                      /> */}

      <List dense>
        <ListSubheader>Queue Size</ListSubheader>
        <SettingsCheckboxComboWithTextField
          checkboxFieldName={'download-queue-enabled'}
          textFieldName="download-queue-size"
          label="Download with a maximum of ..."
          type="number"
          helperText="active transfers"
        />

        <SettingsCheckboxComboWithTextField
          checkboxFieldName={'seed-queue-enabled'}
          textFieldName={'seed-queue-size'}
          helperText="active transfers"
          label="Seeding with a maximum of ..."
          type="number"
        />

        <SettingsCheckboxComboWithTextField
          checkboxFieldName={'queue-stalled-enabled'}
          textFieldName={'queue-stalled-minutes'}
          label="Transfer is stalled when inactive for ..."
        />
      </List>

      <List dense>
        <ListSubheader>Scripts</ListSubheader>
        <SettingsCheckboxComboWithTextField
          checkboxFieldName={'script-torrent-added-enabled'}
          textFieldName={'script-torrent-added-filename'}
          label="Call script when download is added ..."
        />

        <SettingsCheckboxComboWithTextField
          checkboxFieldName={'script-torrent-done-enabled'}
          textFieldName={'script-torrent-done-filename'}
          label="Call script when download completes ..."
        />

        <SettingsCheckboxComboWithTextField
          checkboxFieldName={'script-torrent-done-seeding-enabled'}
          textFieldName={'script-torrent-done-seeding-filename'}
          label="Call script when download is done seeding ..."
        />
      </List>
    </>
  )
}
