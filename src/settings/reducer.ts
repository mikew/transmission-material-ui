import { ActionSuccessType } from 'redux-async-payload'
import createReducer from 'redux-ts-helpers/lib/createReducer'

import * as actions from './actions'
import constants from './constants'

export interface State {
  groups: NonNullable<TransmissionCustomSettings['groups']>
}

const initialState: State = {
  groups: {},
}

export default createReducer(initialState, {
  [`${constants.getCustomSettings}/success`]: (
    state,
    action: ActionSuccessType<typeof actions.getCustomSettings>,
  ) => {
    return {
      ...state,
      groups: action.payload.groups || {},
    }
  },
})
