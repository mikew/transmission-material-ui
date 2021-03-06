import { ActionSuccessType } from 'redux-async-payload'
import createReducer from 'redux-ts-helpers/lib/createReducer'

import * as actions from './actions'
import constants from './constants'

export interface State {
  all: Record<string | number, TransmissionTorrent>
  checkedTorrents: number[]
  isAddDialogVisible: boolean
  isDeleteDialogVisible: boolean
  fields: Set<keyof TransmissionTorrent>
  lastCommunication: Date
}

const initialState: State = {
  all: {},
  isAddDialogVisible: false,
  checkedTorrents: [],
  isDeleteDialogVisible: false,
  fields: new Set(['id']),
  lastCommunication: new Date(),
}

function normalizeTorrent(torrent: TransmissionTorrent): TransmissionTorrent {
  return {
    ...torrent,
    trackerStats: torrent.trackerStats || [],
    peers: torrent.peers || [],
    files: (torrent.files || []).sort((a, b) => a.name.localeCompare(b.name)),
  }
}

export default createReducer(initialState, {
  [`${constants.get}/success`]: (
    state,
    action: ActionSuccessType<typeof actions.get>,
  ) => {
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
      checkedTorrents: action.meta.isMain
        ? state.checkedTorrents.filter((id) => !!all[id])
        : state.checkedTorrents,
      lastCommunication: action.meta.isMain
        ? new Date()
        : state.lastCommunication,
    }
  },

  [constants.removeTorrent]: (
    state,
    action: ReturnType<typeof actions.removeTorrent>,
  ) => {
    const all = { ...state.all }

    action.payload.ids.forEach((x) => {
      delete all[x]
    })

    return {
      ...state,
      all,
      checkedTorrents: state.checkedTorrents.filter((id) => !!all[id]),
    }
  },

  [constants.toggleTorrentChecked]: (
    state,
    action: ActionSuccessType<typeof actions.toggleTorrentChecked>,
  ) => {
    let checkedTorrents = state.checkedTorrents

    switch (action.payload.action) {
      case 'exclusive':
        checkedTorrents = action.payload.ids

        break
      case 'toggle':
        const setCurrent = new Set(checkedTorrents)
        const toCheck = new Set(action.payload.ids)

        toCheck.forEach((x) =>
          setCurrent.has(x) ? setCurrent.delete(x) : setCurrent.add(x),
        )

        checkedTorrents = Array.from(setCurrent)

        break

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
  },

  [constants.toggleAddDialog]: (state) => {
    return {
      ...state,
      isAddDialogVisible: !state.isAddDialogVisible,
    }
  },

  [constants.showAddDialog]: (state) => {
    return {
      ...state,
      isAddDialogVisible: true,
    }
  },

  [constants.hideAddDialog]: (state) => {
    return {
      ...state,
      isAddDialogVisible: false,
    }
  },

  [constants.toggleDeleteDialog]: (state) => {
    return {
      ...state,
      isDeleteDialogVisible: !state.isDeleteDialogVisible,
    }
  },

  [constants.addFields]: (
    state,
    action: ReturnType<typeof actions.addFields>,
  ) => {
    const newFields = new Set(state.fields)
    action.payload.forEach((x) => newFields.add(x))

    return {
      ...state,
      fields: newFields,
    }
  },

  [constants.removeFields]: (
    state,
    action: ReturnType<typeof actions.removeFields>,
  ) => {
    const newFields = new Set(state.fields)
    action.payload.forEach((x) => newFields.delete(x))

    return {
      ...state,
      fields: newFields,
    }
  },
})
