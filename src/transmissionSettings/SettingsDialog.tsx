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
import { useEffect, useState } from 'react'

import apiInstance from '@src/api/apiInstance'
import { useRootDispatch, useRootSelector } from '@src/redux/helpers'

import actions from './actions'
import { SettingsTabBandwidth } from './SettingsTabBandwidth'
import SettingsTabNetwork from './SettingsTabNetwork'
import { SettingsTabPeers } from './SettingsTabPeers'
import { SettingsTabTransfers } from './SettingsTabTransfers'

type SETTINGS_TAB = 'transfers' | 'bandwidth' | 'peers' | 'network'

const SettingsDialog = () => {
  const [selectedTab, setSelectedTab] = useState<SETTINGS_TAB>('transfers')
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

  // This is a little complicated:
  // - The values exist in redux, yes.
  // - Since SettingsDialog is only mounted once, ensure the freshest values
  //   make  it to the form, we'd need to use enableReinitialize.
  // - Since there's polling on the settings, values in the form would change as
  //   the user is editing them, which is just wrong to do to someone.
  // So, we:
  // - Fetch our own copy of the settings, that ensures the settings are up to
  //   date whenever the dialog opens.
  // - Manage our own key for formik so we don't need enableReinitialize.
  // The eventual submission _does_ use redux, so all values are dispersed
  // throughout the UI.
  const initialValueRedux = useRootSelector(
    (state) => state.transmissionSettings.settings,
  )
  const [initialValues, setInitialValues] = useState(initialValueRedux)
  const [formikKey, setFormikKey] = useState(1)
  useEffect(() => {
    async function run() {
      if (isVisible) {
        const response = await apiInstance.callServer('session-get', {})
        setInitialValues(response)
        setFormikKey((previous) => previous + 1)
      }
    }

    run()
  }, [isVisible])

  return (
    <Dialog
      open={isVisible}
      onClose={hideDialog}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
    >
      <Formik
        initialValues={initialValues}
        key={formikKey}
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
            <>
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
                <Button
                  variant="outlined"
                  onClick={hideDialog}
                  sx={{ display: ['block', 'none'] }}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={submitForm}
                >
                  Save
                </Button>
              </DialogActions>
            </>
          )
        }}
      </Formik>
    </Dialog>
  )
}

export default SettingsDialog
