import { createActions } from 'redux-easy-mode'

import apiInstance from '@src/api/apiInstance'
import identityPayloadCreator from '@src/redux/identityPayloadCreator'

export default createActions('transmissionSettings', {
  addFields: identityPayloadCreator<Set<keyof TransmissionSession>>(),
  removeFields: identityPayloadCreator<Set<keyof TransmissionSession>>(),

  toggleDialog: () => undefined,
  showDialog: () => undefined,
  hideDialog: () => undefined,

  get: () => ({
    payload: (_dispatch: RootDispatch, getState: RootGetState) =>
      apiInstance.callServer('session-get', {
        // fields: [...getState().transmissionSettings.fields],
      }),
  }),

  update: identityPayloadCreator<Partial<TransmissionSession>>(),
  // update: async (payload: Partial<TransmissionSession>) => {
  //   await apiInstance.callServer('session-set', payload)
  //   return apiInstance.callServer('session-get', {})
  // },
})
