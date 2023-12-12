import { createActions } from 'redux-easy-mode'
import identityPayloadCreator from 'redux-easy-mode/identityPayloadCreator'

import apiInstance from '@src/api/apiInstance'

import { State } from './reducer'

export default createActions('stats', {
  toggleDialog: () => undefined,
  showDialog: () => undefined,
  hideDialog: () => undefined,

  setIsWatching: identityPayloadCreator<State['isWatching']>(),
  getStats: () => apiInstance.callServer('session-stats', null),
})
