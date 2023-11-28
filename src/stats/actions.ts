import { createActions } from 'redux-easy-mode'

import apiInstance from '@src/api/apiInstance'
import identityPayloadCreator from '@src/redux/identityPayloadCreator'

import { State } from './reducer'

export default createActions('stats', {
  toggleDialog: () => undefined,
  showDialog: () => undefined,
  hideDialog: () => undefined,

  setIsWatching: identityPayloadCreator<State['isWatching']>(),
  getStats: () => apiInstance.callServer('session-stats', null),
})
