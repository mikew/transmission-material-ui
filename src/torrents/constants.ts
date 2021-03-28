import applyNamespace from 'redux-ts-helpers/lib/applyNamespace'

export default applyNamespace('torrents', {
  get: 0,
  toggleTorrentChecked: 0,

  toggleAddDialog: 0,
  showAddDialog: 0,
  hideAddDialog: 0,
  toggleDeleteDialog: 0,

  addFields: 0,
  removeFields: 0,

  startTorrent: 0,
  stopTorrent: 0,

  startWatching: 0,
  stopWatching: 0,

  addTorrent: 0,
  removeTorrent: 0,

  getCustomSettings: 0,

  torrentSetLocation: 0,
})
