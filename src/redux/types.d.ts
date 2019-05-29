import { State as TorrentsState } from '@src/torrents/reducer'
import { DispatchProp } from 'react-redux'
import { Action, Dispatch } from 'redux'

// The interface must be added to the RootStore, so anything using redux is
// aware of your state.
export interface RootState {
  torrents: TorrentsState
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
