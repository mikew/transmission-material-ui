import {
  applyMiddleware,
  createStore as _createStore,
  DeepPartial,
  Store,
} from 'redux'
import reduxAsyncPayload from 'redux-async-payload'

import { RootState } from './types'

const middleware = [reduxAsyncPayload()]

function getRootReducer() {
  // Importing this strange way is needed for hot loading.
  return require('./rootReducer').default
}

export default function createStore(initialState?: DeepPartial<RootState>) {
  // Type errors came in after upgrading to redux@4 + typescript@2.8.
  // Now a cast to Store is needed.
  const store = _createStore(
    getRootReducer(),
    initialState || {},
    applyMiddleware(...middleware),
  ) as Store<RootState>

  const m = module as any
  if (m.hot) {
    m.hot.accept('./rootReducer', () => {
      store.replaceReducer(getRootReducer())
    })
  }

  return store
}
