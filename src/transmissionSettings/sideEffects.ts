import { reduxActionSideEffect } from 'redux-easy-mode'

import apiInstance from '@src/api/apiInstance'

import actions from './actions'

reduxActionSideEffect(actions.update, (action, dispatch) => {
  async function run() {
    await apiInstance.callServer('session-set', action.payload)
    await dispatch(actions.get())
  }

  run()
})
