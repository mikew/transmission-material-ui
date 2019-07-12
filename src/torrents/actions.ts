import apiInstance from '@src/api/apiInstance'
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

export const get = (
  ids?: TransmissionIdLookup,
  fields?: (keyof TransmissionTorrent)[],
) => ({
  type: constants.get,
  payload: apiInstance.callServer('torrent-get', {
    ids,
    fields: fields || [
      'activityDate',
      'addedDate',
      'bandwidthPriority',
      'comment',
      'corruptEver',
      'creator',
      'dateCreated',
      'desiredAvailable',
      'doneDate',
      'downloadDir',
      'downloadLimit',
      'downloadLimited',
      'downloadedEver',
      'error',
      'errorString',
      'eta',
      'fileStats',
      'files',
      'hashString',
      'haveUnchecked',
      'haveValid',
      'honorsSessionLimits',
      'id',
      'isFinished',
      'isPrivate',
      'leftUntilDone',
      'magnetLink',
      'manualAnnounceTime',
      'maxConnectedPeers',
      'metadataPercentComplete',
      'name',
      'peer-limit',
      'peers',
      'peersConnected',
      'peersFrom',
      'peersGettingFromUs',
      'peersSendingToUs',
      'percentDone',
      'pieceCount',
      'pieceSize',
      'pieces',
      'priorities',
      'rateDownload',
      'rateUpload',
      'recheckProgress',
      'seedIdleLimit',
      'seedIdleMode',
      'seedRatioLimit',
      'seedRatioMode',
      'sizeWhenDone',
      'startDate',
      'status',
      'torrentFile',
      'totalSize',
      'trackerStats',
      'trackers',
      'uploadLimit',
      'uploadLimited',
      'uploadRatio',
      'uploadedEver',
      'wanted',
      'webseeds',
      'webseedsSendingToUs',
    ],
  }),
})
