import { reduxActionSideEffect, reduxSelectorSideEffect } from 'redux-easy-mode'

import apiInstance from '@src/api/apiInstance'

import actions from './actions'

reduxActionSideEffect(actions.update, (action, dispatch) => {
  async function run() {
    await apiInstance.callServer('session-set', action.payload)
    await dispatch(actions.get())
  }

  run()
})

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

