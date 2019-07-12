import apiInstance from '@src/api/apiInstance'
import { AppDispatch, AppGetState } from '@src/redux/types'
import createAction from 'redux-ts-helpers/lib/createAction'

import constants from './constants'

export const toggleTorrentChecked = createAction<{
  action: 'toggle' | 'exclusive' | 'checkAll' | 'unCheckAll'
  ids: number[]
}>(constants.toggleTorrentChecked)
export const toggleAddDialog = createAction(constants.toggleAddDialog)
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
}>(constants.addTorrent)

export const removeTorrent = createAction<{
  deleteData: boolean
  ids: TransmissionIdLookup
}>(constants.removeTorrent)

export const get = (ids?: TransmissionIdLookup) => ({
  type: constants.get,
  payload(_dispatch: AppDispatch, getState: AppGetState) {
    return apiInstance.callServer('torrent-get', {
      ids,
      fields: [...getState().torrents.fields],
    })
  },
})
