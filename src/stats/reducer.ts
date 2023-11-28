import { createReducer } from 'redux-easy-mode'

import actions from './actions'

export interface State {
  isWatching: boolean
  stats: TransmissionSessionStats | undefined
  isDialogOpen: boolean
}

const initialState: State = {
  stats: undefined,
  isDialogOpen: true,
  isWatching: false,
}

export default createReducer(initialState, (builder) => {
  builder
    .addHandler(actions.setIsWatching, (state, action) => ({
      ...state,
      isWatching: action.payload,
    }))
    .addHandler(actions.showDialog, (state) => ({
      ...state,
      isDialogOpen: true,
    }))
    .addHandler(actions.hideDialog, (state) => ({
      ...state,
      isDialogOpen: false,
    }))
    .addHandler(actions.toggleDialog, (state) => ({
      ...state,
      isDialogOpen: !state.isDialogOpen,
    }))
    .addSuccessHandler(actions.getStats, (state, action) => ({
      ...state,
      stats: {
        ...state.stats,
        ...action.payload,
      },
    }))
})
