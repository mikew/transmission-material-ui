import { Button, CircularProgress, Slide, Snackbar } from '@mui/material'
import Alert, { AlertProps } from '@mui/material/Alert'
import { useEffect, useState } from 'react'

import {
  useRootDispatch,
  useRootSelectorShallowEqual,
} from '@src/redux/helpers'

import actions from './actions'

const StatusNotifier = () => {
  const dispatch = useRootDispatch()
  const state = useRootSelectorShallowEqual((state) => ({
    isApiDown: state.torrents.isApiDown,
    isWatching: state.torrents.isWatching,
  }))

  let severity: AlertProps['severity']
  let message: AlertProps['children']
  let action: AlertProps['action']

  if (!state.isWatching) {
    severity = 'error'
    message = 'Server has stopped responding'
    action = (
      <Button onClick={() => dispatch(actions.startWatching())} size="small">
        Reconnect
      </Button>
    )
  } else if (state.isApiDown) {
    severity = 'info'
    message = 'Reconnecting ...'
    action = <CircularProgress size={32} />
  }

  useEffect(() => {
    function handler() {
      if (!state.isWatching) {
        dispatch(actions.startWatching())
      }
    }

    window.addEventListener('focus', handler)

    return () => {
      window.removeEventListener('focus', handler)
    }
  }, [dispatch, state.isWatching])

  // Since for all intents and purposes, everything is considered "not working"
  // on the initial load, that means there's a flash of the "not responding"
  // message on first load.
  // Let's get rid of that.
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? (
    <Snackbar
      open={!!message}
      TransitionComponent={Slide}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Alert severity={severity} action={action}>
        {message}
      </Alert>
    </Snackbar>
  ) : null
}

export default StatusNotifier
