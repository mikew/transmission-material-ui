import { reduxSelectorSideEffect } from 'redux-easy-mode'

import actions from './actions'

const HEARTBEAT_TIMEOUT = 5_000

// Keep a heartbeat going that fetches settings.
reduxSelectorSideEffect(
  (state: RootState) => state.transmissionSettings.isWatching,
  (value, _previousValue, dispatch) => {
    let timer: number | undefined

    if (value) {
      dispatch(actions.getStats())
      timer = window.setInterval(() => {
        dispatch(actions.getStats())
      }, HEARTBEAT_TIMEOUT)
    }

    return () => {
      window.clearInterval(timer)
    }
  },
)
