import { Button, CircularProgress, Slide, Snackbar } from '@mui/material'
import Alert, { AlertProps } from '@mui/material/Alert'

import useDispatch from '@src/redux/useDispatch'
import useShallowEqualSelector from '@src/redux/useShallowEqualSelector'

import actions from './actions'

const StatusNotifier = () => {
  const dispatch = useDispatch()
  const state = useShallowEqualSelector((state) => ({
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
      <Button
        onClick={() => dispatch(actions.startWatching())}
        size="small"
        variant="outlined"
      >
        Try Again
      </Button>
    )
  } else if (state.isApiDown) {
    severity = 'info'
    message = 'Reconnecting ...'
    action = <CircularProgress size={32} />
  }

  return (
    <Snackbar open={!!message} TransitionComponent={Slide}>
      <Alert severity={severity} action={action}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default StatusNotifier
