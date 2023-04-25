import { createActions } from 'redux-easy-mode'

import apiInstance from '@src/api/apiInstance'
import identityPayloadCreator from '@src/redux/identityPayloadCreator'

import { State } from './reducer'

export default createActions('transmissionSettings', {
  addFields: identityPayloadCreator<State['fields']>(),
  removeFields: identityPayloadCreator<State['fields']>(),
  setIsWatching: identityPayloadCreator<State['isWatching']>(),

  toggleDialog: () => undefined,
  showDialog: () => undefined,
  hideDialog: () => undefined,

  setPortStatus: identityPayloadCreator<State['portStatus']>(),
  setSpaceRemaining: identityPayloadCreator<State['spaceRemaining']>(),

  get: (isMain = false) => ({
    payload: (_dispatch: RootDispatch, getState: RootGetState) =>
      apiInstance.callServer('session-get', {
        fields: isMain
          ? undefined
          : [...getState().transmissionSettings.fields],
      }),
  }),

  update: identityPayloadCreator<Partial<TransmissionSession>>(),
  // update: async (payload: Partial<TransmissionSession>) => {
  //   await apiInstance.callServer('session-set', payload)
  //   return apiInstance.callServer('session-get', {})
  // },
})
