import { reduxSelectorSideEffect } from 'redux-easy-mode'

import apiInstance from '@src/api/apiInstance'

import actions from './actions'

const HEARTBEAT_TIMEOUT = 5_000

// Keep a heartbeat going that fetches settings.
reduxSelectorSideEffect(
  (state: RootState) => state.transmissionSettings.isWatching,
  (value, _previousValue, dispatch) => {
    let timer: number | undefined

    if (value) {
      dispatch(actions.get())
      timer = window.setInterval(() => {
        dispatch(actions.get())
      }, HEARTBEAT_TIMEOUT)
    }

    return () => {
      window.clearInterval(timer)
    }
  },
)

// Refetch when the requested settings fields changes.
reduxSelectorSideEffect(
  (state: RootState) => state.transmissionSettings.fields,
  (_value, previousValue, dispatch) => {
    if (previousValue !== undefined) {
      dispatch(actions.get())
    }
  },
)

reduxSelectorSideEffect(
  (state: RootState) => state.transmissionSettings.settings['peer-port'],
  (value, _previous, dispatch: RootDispatch) => {
    async function run() {
      dispatch(actions.setPortStatus('loading'))

      try {
        const response = await apiInstance.callServer('port-test', null)
        dispatch(
          actions.setPortStatus(response['port-is-open'] ? 'open' : 'closed'),
        )
      } catch (err) {
        console.error(err)
        dispatch(actions.setPortStatus('closed'))
      }
    }

    run()
  },
)

reduxSelectorSideEffect(
  (state: RootState) => state.transmissionSettings.settings['download-dir'],
  (value, _previous, dispatch: RootDispatch) => {
    async function run() {
      dispatch(actions.getFreeSpace(value))
    }

    run()
  },
)

reduxSelectorSideEffect(
  (state: RootState) => state.transmissionSettings.settings['incomplete-dir'],
  (value, _previous, dispatch: RootDispatch) => {
    async function run() {
      dispatch(actions.getFreeSpace(value))
    }

    run()
  },
)
