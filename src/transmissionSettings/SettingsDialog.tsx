import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Formik } from 'formik'
import React, { useState } from 'react'

import { useRootDispatch, useRootSelector } from '@src/redux/helpers'

import actions from './actions'
import { SettingsTabBandwidth } from './SettingsTabBandwidth'
import SettingsTabNetwork from './SettingsTabNetwork'
import { SettingsTabPeers } from './SettingsTabPeers'
import { SettingsTabTransfers } from './SettingsTabTransfers'

type SETTINGS_TAB = 'transfers' | 'bandwidth' | 'peers' | 'network'

const SettingsDialog = () => {
  const [selectedTab, setSelectedTab] = useState<SETTINGS_TAB>('transfers')
  const wut = useRootSelector((state) => state.transmissionSettings.settings)
  const dispatch = useRootDispatch()

  let children: React.ReactNode = undefined

  switch (selectedTab) {
    case 'transfers':
      children = <SettingsTabTransfers />

      break
    case 'bandwidth':
      children = <SettingsTabBandwidth />
      break
    case 'peers':
      children = <SettingsTabPeers />
      break
    case 'network':
      children = <SettingsTabNetwork />
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'))
  const isVisible = useRootSelector(
    (state) => state.transmissionSettings.isSettingsDialogVisible,
  )
  const hideDialog = () => {
    dispatch(actions.hideDialog())
  }

  return (
    <Formik
      enableReinitialize
      initialValues={wut}
      onSubmit={async (values, formik) => {
        try {
          await dispatch(actions.update(values))
          hideDialog()
        } catch (err) {
          console.error(err)
        }
        formik.setSubmitting(false)
      }}
    >
      {({ submitForm }) => {
        return (
          <Dialog
            open={isVisible}
            onClose={hideDialog}
            maxWidth="sm"
            fullWidth
            fullScreen={isMobile}
          >
            <DialogTitle>Settings</DialogTitle>
            <Tabs
              value={selectedTab}
              onChange={(_event, value) => {
                setSelectedTab(value)
              }}
              variant="fullWidth"
            >
              <Tab value="transfers" label="Transfers" />
              <Tab value="bandwidth" label="Bandwidth" />
              <Tab value="peers" label="Peers" />
              <Tab value="network" label="Network" />
            </Tabs>
            <DialogContent
              // The children in the settings section are expected to manage
              // their own padding.
              sx={{ padding: 0 }}
              // Setting this is an easy way to reset the scroll when switching
              // tabs.
              key={selectedTab}
            >
              {children}
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={hideDialog}>
                Cancel
              </Button>
              <Button color="primary" variant="contained" onClick={submitForm}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )
      }}
    </Formik>
  )
}

export default SettingsDialog
