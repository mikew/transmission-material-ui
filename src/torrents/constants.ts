import applyNamespace from 'redux-ts-helpers/lib/applyNamespace'

export default applyNamespace('torrents', {
  get: 0,
  showInspector: 0,
  toggleInspector: 0,
  toggleTorrentChecked: 0,
  toggleAddDialog: 0,
  toggleDeleteDialog: 0,
})
