import createAction from 'redux-ts-helpers/lib/createAction'

import apiInstance from '@src/api/apiInstance'

import constants from './constants'

export const showInspector = createAction<number | null>(
  constants.showInspector,
)
export const toggleInspector = createAction<null>(constants.toggleInspector)
export const toggleTorrentChecked = createAction<{
  action: 'toggle' | 'exclusive' | 'checkAll' | 'unCheckAll'
  ids: number[]
}>(constants.toggleTorrentChecked)
export const toggleAddDialog = createAction<null>(constants.toggleAddDialog)

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
