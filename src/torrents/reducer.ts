import { ActionSuccessType } from 'redux-async-payload'
import createReducer from 'redux-ts-helpers/lib/createReducer'

import * as actions from './actions'
import constants from './constants'

export interface State {
  isInspectorOpen: boolean
  all: {
    [id: number]: TransmissionTorrent
    [id: string]: TransmissionTorrent
  }
  checkedTorrents: number[]
  isAddDialogVisible: boolean
  isDeleteDialogVisible: boolean
  fields: Set<keyof TransmissionTorrent>
}

const initialState: State = {
  all: {},
  isInspectorOpen: false,
  isAddDialogVisible: false,
  checkedTorrents: [],
  isDeleteDialogVisible: false,
  fields: new Set(['id']),
}

export default createReducer(initialState, {
  [`${constants.get}/success`]: (
    state,
    action: ActionSuccessType<typeof actions.get>,
  ) => {
    const all = { ...state.all }
    action.payload.torrents.forEach((x) => {
      if (!x.id) {
        // tslint:disable-next-line:no-console
        console.error(x, 'has no `id` property')

        return
      }

      all[x.id] = {
        ...all[x.id],
        ...x,
      }
    })

    return {
      ...state,
      all,
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

  [constants.toggleInspector]: (state) => ({
    ...state,
    isInspectorOpen: !state.isInspectorOpen,
  }),

  [constants.toggleAddDialog]: (state) => {
    return {
      ...state,
      isAddDialogVisible: !state.isAddDialogVisible,
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
