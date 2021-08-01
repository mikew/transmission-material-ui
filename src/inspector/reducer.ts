import { createReducer } from 'redux-easy-mode'

import actions from './actions'
import InspectorTabs from './InspectorTabs'

export interface State {
  currentTab: InspectorTabs
  isInspectorOpen: boolean
}

const initialState: State = {
  currentTab: InspectorTabs.info,
  isInspectorOpen: false,
}

export default createReducer(initialState, (builder) => {
  builder
    .addHandler(actions.setTab, (state, action) => ({
      ...state,
      currentTab: action.payload,
    }))
    .addHandler(actions.toggleInspector, (state) => ({
      ...state,
      isInspectorOpen: !state.isInspectorOpen,
    }))
})
