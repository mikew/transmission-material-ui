import createAction from 'redux-ts-helpers/lib/createAction'

import apiInstance from '@src/api/apiInstance'
import { AppDispatch, AppGetState } from '@src/redux/types'

import constants from './constants'

export const toggleTorrentChecked = createAction<{
  action: 'toggle' | 'exclusive' | 'checkAll' | 'unCheckAll'
  ids: number[]
}>(constants.toggleTorrentChecked)
export const toggleAddDialog = createAction(constants.toggleAddDialog)
export const showAddDialog = createAction(constants.showAddDialog)
export const hideAddDialog = createAction(constants.hideAddDialog)
export const toggleDeleteDialog = createAction(constants.toggleDeleteDialog)

export const addFields = createAction<Set<keyof TransmissionTorrent>>(
  constants.addFields,
)
export const removeFields = createAction<Set<keyof TransmissionTorrent>>(
  constants.removeFields,
)

export const startTorrent = createAction<TransmissionIdLookup>(
  constants.startTorrent,
)
export const stopTorrent = createAction<TransmissionIdLookup>(
  constants.stopTorrent,
)

export const startWatching = createAction(constants.startWatching)
export const stopWatching = createAction(constants.stopWatching)

export const addTorrent = createAction<{
  mode: 'magnet' | 'base64'
  data: string
  location?: string
}>(constants.addTorrent)

export const removeTorrent = createAction<{
  deleteData: boolean
  ids: TransmissionIdLookup
}>(constants.removeTorrent)

export const get = createAction(
  constants.get,
  (ids?: TransmissionIdLookup, isMain?: boolean) => ({
    payload: (_dispatch: AppDispatch, getState: AppGetState) =>
      apiInstance.callServer('torrent-get', {
        ids,
        fields: [...getState().torrents.fields],
      }),
    meta: {
      isMain,
    },
  }),
)

export const torrentSetLocation = createAction(
  constants.torrentSetLocation,
  (payload: { ids: TransmissionIdLookup; location: string }) => {
    return apiInstance.callServer('torrent-set-location', {
      ids: payload.ids,
      location: payload.location,
      move: true,
    })
  },
)
