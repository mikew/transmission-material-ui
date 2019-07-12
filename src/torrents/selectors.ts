import { RootState } from '@src/redux/types'
import { createSelector } from 'reselect'

export const getCheckedIds = (state: RootState) =>
  state.torrents.checkedTorrents
export const getAll = (state: RootState) => state.torrents.all

export const getAllFiltered = createSelector(
  getAll,
  (all) => {
    return Object.values(all).sort((a, b) => b.addedDate - a.addedDate)
  },
)

export const getCheckedTorrents = createSelector(
  getCheckedIds,
  getAll,
  (checked, all) => checked.map((x) => all[x]),
)

export const getRateUpload = createSelector(
  getAll,
  (all) => Object.keys(all).reduce((memo, x) => memo + all[x].rateUpload, 0),
)

export const getRateDownload = createSelector(
  getAll,
  (all) => Object.keys(all).reduce((memo, x) => memo + all[x].rateDownload, 0),
)

export const getSelectedOrAllIds = createSelector(
  getCheckedIds,
  getAll,
  (checked, all) => (checked.length ? checked : Object.keys(all).map(Number)),
)
