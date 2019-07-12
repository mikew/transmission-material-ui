import createReducer from 'redux-ts-helpers/lib/createReducer'

import * as actions from './actions'
import constants from './constants'
import InspectorTabs from './InspectorTabs'

export interface State {
  currentTab: InspectorTabs
  isInspectorOpen: boolean
}

const initialState: State = {
  currentTab: InspectorTabs.info,
  isInspectorOpen: false,
}

export default createReducer(initialState, {
  [constants.setTab]: (state, action: ReturnType<typeof actions.setTab>) => ({
    ...state,
    currentTab: action.payload,
  }),

  [constants.toggleInspector]: (state) => ({
    ...state,
    isInspectorOpen: !state.isInspectorOpen,
  }),
})
