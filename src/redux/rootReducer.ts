// If any feature has a reducer, the reducer and it's state interface must be
// imported here.

// tslint:disable-next-line:import-name
import inspector from '@src/inspector/reducer'
// tslint:disable-next-line:import-name
import torrents from '@src/torrents/reducer'
import { combineReducers } from 'redux'

import { RootState } from './types'

// tslint:disable:ordered-imports
import '@src/torrents/sideEffects'
// tslint:enable:ordered-imports

// The reducer must be added to the rootReducer. It's key must match the key
// you've given the feature in the RootStore.
const rootReducer = combineReducers<RootState>({
  torrents,
  inspector,
})

export default rootReducer
