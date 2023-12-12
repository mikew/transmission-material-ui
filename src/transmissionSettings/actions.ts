import { createActions } from 'redux-easy-mode'
import identityPayloadCreator from 'redux-easy-mode/identityPayloadCreator'

import apiInstance from '@src/api/apiInstance'

import { State } from './reducer'

export default createActions('transmissionSettings', {
  addFields: identityPayloadCreator<State['fields']>(),
  removeFields: identityPayloadCreator<State['fields']>(),
  setIsWatching: identityPayloadCreator<State['isWatching']>(),

  toggleDialog: () => undefined,
  showDialog: () => undefined,
  hideDialog: () => undefined,

  setPortStatus: identityPayloadCreator<State['portStatus']>(),

  getFreeSpace: (path: string) => ({
    payload: () => apiInstance.callServer('free-space', { path }),
    meta: {
      path,
    },
  }),

  get: (isMain = false) => ({
    payload: (_dispatch: RootDispatch, getState: RootGetState) =>
      apiInstance.callServer('session-get', {
        fields: isMain
          ? undefined
          : [...getState().transmissionSettings.fields],
      }),
  }),

  update: (payload: Partial<TransmissionSession>, optimistic = true) => ({
    payload: async () => {
      await apiInstance.callServer('session-set', payload)
      return apiInstance.callServer('session-get', {
        fields: Object.keys(payload) as (keyof TransmissionSession)[],
      })
    },
    meta: {
      payload,
      optimistic,
    },
  }),
})
