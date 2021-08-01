import { createReducer } from 'redux-easy-mode'

import actions from './actions'

export interface State {
  groups: NonNullable<TransmissionCustomSettings['groups']>
}

const initialState: State = {
  groups: {},
}

export default createReducer(initialState, (builder) => {
  builder.addSuccessHandler(actions.getCustomSettings, (state, action) => ({
    ...state,
    groups: action.payload?.groups || {},
  }))
})
