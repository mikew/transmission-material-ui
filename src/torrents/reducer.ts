import { createReducer } from 'redux-easy-mode'

import actions from './actions'

export interface State {
  all: Record<string | number, TransmissionTorrent>
  checkedTorrents: number[]
  isAddDialogVisible: boolean
  isDeleteDialogVisible: boolean
  fields: Set<keyof TransmissionTorrent>
  lastCommunication: Date
  isApiDown: boolean
  isWatching: boolean
  isLoading: boolean
}

const initialState: State = {
  all: {},
  isAddDialogVisible: false,
  checkedTorrents: [],
  isDeleteDialogVisible: false,
  fields: new Set<keyof TransmissionTorrent>(['id']),
  lastCommunication: new Date(),
  isApiDown: false,
  isWatching: false,
  isLoading: true,
}

function normalizeTorrent(torrent: TransmissionTorrent): TransmissionTorrent {
  return {
    ...torrent,
    trackerStats: torrent.trackerStats || [],
    peers: torrent.peers || [],
    files: (torrent.files || []).sort((a, b) => a.name.localeCompare(b.name)),
  }
}

export default createReducer(initialState, (builder) => {
  builder
    .addHandler(actions.startWatching, (state) => ({
      ...state,
      isWatching: true,
    }))
    .addHandler(actions.stopWatching, (state) => ({
      ...state,
      isWatching: false,
    }))
    .addHandler(actions.setIsApiDown, (state, action) => ({
      ...state,
      isApiDown: action.payload,
    }))
    .addStartHandler(actions.get, (state) => {
      return {
        ...state,
        isLoading: true,
      }
    })
    .addErrorHandler(actions.get, (state) => {
      return {
        ...state,
        isLoading: false,
      }
    })
    .addSuccessHandler(actions.get, (state, action) => {
      const all = action.meta.isMain ? {} : { ...state.all }

      action.payload.torrents.forEach((x) => {
        if (!x.id) {
          console.error(x, 'has no `id` property')

          return
        }

        all[x.id] = normalizeTorrent({
          ...all[x.id],
          ...x,
        })
      })

      return {
        ...state,
        all,
        isLoading: false,
        checkedTorrents: action.meta.isMain
          ? state.checkedTorrents.filter((id) => !!all[id])
          : state.checkedTorrents,
        lastCommunication: action.meta.isMain
          ? new Date()
          : state.lastCommunication,
      }
    })
    .addHandler(actions.removeTorrent, (state, action) => {
      const all = { ...state.all }

      action.payload.ids.forEach((x) => {
        delete all[x]
      })

      return {
        ...state,
        all,
        checkedTorrents: state.checkedTorrents.filter((id) => !!all[id]),
      }
    })
    .addHandler(actions.toggleTorrentChecked, (state, action) => {
      let checkedTorrents = state.checkedTorrents

      switch (action.payload.action) {
        case 'exclusive':
          checkedTorrents = action.payload.ids

          break
        case 'toggle': {
          const setCurrent = new Set(checkedTorrents)
          const toCheck = new Set(action.payload.ids)

          toCheck.forEach((x) =>
            setCurrent.has(x) ? setCurrent.delete(x) : setCurrent.add(x),
          )

          checkedTorrents = Array.from(setCurrent)

          break
        }

        case 'checkAll':
          checkedTorrents = Object.keys(state.all).map((x) => state.all[x].id)

          break
        case 'unCheckAll':
          checkedTorrents = []

          break
      }

      return {
        ...state,
        checkedTorrents,
      }
    })
    .addHandler(actions.toggleAddDialog, (state) => ({
      ...state,
      isAddDialogVisible: !state.isAddDialogVisible,
    }))
    .addHandler(actions.showAddDialog, (state) => ({
      ...state,
      isAddDialogVisible: true,
    }))
    .addHandler(actions.hideAddDialog, (state) => ({
      ...state,
      isAddDialogVisible: false,
    }))
    .addHandler(actions.toggleDeleteDialog, (state) => ({
      ...state,
      isDeleteDialogVisible: !state.isDeleteDialogVisible,
    }))
    .addHandler(actions.addFields, (state, action) => {
      const newFields = new Set(state.fields)
      action.payload.forEach((x) => newFields.add(x))

      return {
        ...state,
        fields: newFields,
      }
    })
    .addHandler(actions.removeFields, (state, action) => {
      const newFields = new Set(state.fields)
      action.payload.forEach((x) => newFields.delete(x))

      return {
        ...state,
        fields: newFields,
      }
    })
})
