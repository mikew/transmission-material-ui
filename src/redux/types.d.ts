import { Action, Dispatch } from 'redux'

import { State as TorrentsState } from '@src/torrents/reducer'
import { DispatchProp } from 'react-redux'

export interface RootState {
  torrents: TorrentsState
}

/**
 * Base Flux action with generic types for payload and meta.
 */
// export interface FluxAction<TPayload = any, TMeta = any> extends Action {
//   payload: TPayload
//   meta?: TMeta
//   error?: boolean
// }

/**
 * App-specific interface for dispatching actions.
 */
export interface AppDispatch extends Dispatch<Action> {}

/**
 * App-specific interface to be extended by component props.
 */
export interface AppDispatchProps {
  dispatch: AppDispatch
}

export interface AppGetState {
  (): RootState
}
