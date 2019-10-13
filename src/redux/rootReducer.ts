// If any feature has a reducer, the reducer and it's state interface must be
// imported here.

// tslint:disable:import-name
import inspector from '@src/inspector/reducer'
import settings from '@src/settings/reducer'
import torrents from '@src/torrents/reducer'
// tslint:enable:import-name
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
  settings,
})

export default rootReducer
