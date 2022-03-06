import { createActions } from 'redux-easy-mode'

import apiInstance from '@src/api/apiInstance'
import identityPayloadCreator from '@src/redux/identityPayloadCreator'
import { AppDispatch, AppGetState } from '@src/redux/types'

export default createActions('torrents', {
  toggleTorrentChecked: identityPayloadCreator<{
    action: 'toggle' | 'exclusive' | 'checkAll' | 'unCheckAll'
    ids: number[]
  }>(),

  toggleAddDialog: () => undefined,
  showAddDialog: () => undefined,
  hideAddDialog: () => undefined,
  toggleDeleteDialog: () => undefined,

  addFields: identityPayloadCreator<Set<keyof TransmissionTorrent>>(),
  removeFields: identityPayloadCreator<Set<keyof TransmissionTorrent>>(),

  startTorrent: identityPayloadCreator<TransmissionIdLookup>(),
  stopTorrent: identityPayloadCreator<TransmissionIdLookup>(),

  startWatching: () => undefined,
  stopWatching: () => undefined,

  addTorrent: identityPayloadCreator<{
    mode: 'magnet' | 'base64'
    data: string
    location?: string
  }>(),

  removeTorrent: identityPayloadCreator<{
    deleteData: boolean
    ids: TransmissionIdLookup
  }>(),

  get: (ids?: TransmissionIdLookup, isMain?: boolean) => ({
    payload: (_dispatch: AppDispatch, getState: AppGetState) =>
      apiInstance.callServer('torrent-get', {
        ids,
        fields: [...getState().torrents.fields],
      }),
    meta: {
      isMain,
    },
  }),

  torrentSetLocation: (payload: {
    ids: TransmissionIdLookup
    location: string
  }) => {
    return apiInstance.callServer('torrent-set-location', {
      ids: payload.ids,
      location: payload.location,
      move: true,
    })
  },

  setIsApiDown: identityPayloadCreator<boolean>(),
})
