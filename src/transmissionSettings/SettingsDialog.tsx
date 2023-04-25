import {
  Box,
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
import { useEffect, useRef, useState } from 'react'
import { ActionSuccessType } from 'redux-easy-mode/lib/async/asyncMiddleware'

import MobileNavigationSpacer from '@src/lib/MobileNavigationSpacer'
import { useRootDispatch, useRootSelector } from '@src/redux/helpers'

import actions from './actions'
import { SettingsTabBandwidth } from './SettingsTabBandwidth'
import SettingsTabNetwork from './SettingsTabNetwork'
import { SettingsTabPeers } from './SettingsTabPeers'
import { SettingsTabTransfers } from './SettingsTabTransfers'

type SETTINGS_TAB = 'transfers' | 'bandwidth' | 'peers' | 'network' | 'all'

const SettingsDialog = () => {
  const [selectedTab, setSelectedTab] = useState<SETTINGS_TAB>('transfers')
  const dispatch = useRootDispatch()
  const buttonRef = useRef<null | 'save' | 'apply'>(null)

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
      break
    case 'all':
      children = (
        <>
          <SettingsTabTransfers />
          <SettingsTabBandwidth />
          <SettingsTabPeers />
          <SettingsTabNetwork />
        </>
      )
      break
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
  const [initialValues, setInitialValues] = useState(
    // That we initialize from redux isn't important in the grand scheme of
    // things. It just happens to always contain a full set of settings.
    initialValueRedux,
  )
  const [formikKey, setFormikKey] = useState(1)
  useEffect(() => {
    async function run() {
      if (isVisible) {
        // Using redux to fetch a fresh copy of the settings is important, as it
        // has the bonus side effect of re-running ... side effects.
        const response = (await dispatch(
          actions.get(true),
        )) as unknown as ActionSuccessType<typeof actions.get>
        setInitialValues(response.payload)
        setFormikKey((previous) => previous + 1)
      }
    }

    run()
  }, [dispatch, isVisible])

  useEffect(() => {
    dispatch(actions.setIsWatching(true))

    return () => {
      dispatch(actions.setIsWatching(false))
    }
  }, [dispatch])

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
            await dispatch(actions.update(cleanupValues(values), false))

            setInitialValues(values)
            setFormikKey((previous) => previous + 1)

            if (buttonRef.current === 'save') {
              hideDialog()
            }
          } catch (err) {
            console.error(err)
          }
          formik.setSubmitting(false)
        }}
      >
        {({ submitForm, resetForm }) => {
          return (
            <>
              <DialogTitle>Settings</DialogTitle>
              <Tabs
                value={selectedTab}
                onChange={(_event, value) => {
                  setSelectedTab(value)
                }}
                variant="scrollable"
              >
                <Tab value="transfers" label="Transfers" />
                <Tab value="bandwidth" label="Bandwidth" />
                <Tab value="peers" label="Peers" />
                <Tab value="network" label="Network" />
                <Tab value="all" label="All" />
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
              <MobileNavigationSpacer>
                <DialogActions>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => resetForm()}
                  >
                    Reset
                  </Button>
                  <Box flexGrow="1" />
                  <Button
                    variant="outlined"
                    onClick={hideDialog}
                    sx={{ display: ['block', 'none'] }}
                  >
                    Close
                  </Button>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      buttonRef.current = 'apply'
                      submitForm()
                    }}
                  >
                    Apply
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      buttonRef.current = 'save'
                      submitForm()
                    }}
                  >
                    Save
                  </Button>
                </DialogActions>
              </MobileNavigationSpacer>
            </>
          )
        }}
      </Formik>
    </Dialog>
  )
}

function cleanupValues(values: Partial<TransmissionSession>) {
  const cleaned = { ...values }

  // There's no way to actually set this in the settings dialog since it's
  // polling on the main view. Never send it from the settings dialog.
  delete cleaned['alt-speed-enabled']

  // Casting here just to cleanup the return signature. TS does do the right
  // thing here and returns a (very large) generated type where deleted keys are
  // actually missing.
  return cleaned as Partial<TransmissionSession>
}

export default SettingsDialog
