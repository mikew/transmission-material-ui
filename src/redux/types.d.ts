import { DispatchProp } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { State as TorrentsState } from '@src/torrents/reducer'
import { State as InspectorState } from '@src/inspector/reducer'
import { State as SettingsState } from '@src/settings/reducer'

// The interface must be added to the RootStore, so anything using redux is
// aware of your state.
export interface RootState {
  torrents: TorrentsState
  inspector: InspectorState
  settings: SettingsState
}

/**
 * App-specific interface for dispatching actions.
 */
export interface AppDispatch extends Dispatch<Action> {}

/**
 * App-specific interface to be extended by component props.
 */
export interface AppDispatchProps extends DispatchProp<Action> {}

export interface AppGetState {
  (): RootState
}
