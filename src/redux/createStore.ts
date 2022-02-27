import {
  applyMiddleware,
  createStore as _createStore,
  Middleware,
  Store,
  compose,
} from 'redux'
import { asyncMiddleware, sideEffectMiddleware } from 'redux-easy-mode'

import failsafeMiddleware from './failsafeMiddleware'
import rootReducer from './rootReducer'
import { RootState } from './types'

const IS_TEST_ENV = typeof describe !== 'undefined'
const IS_PRODUCTION_ENV = process.env.NODE_ENV === 'production'

const middleware: Middleware[] = []

if (IS_TEST_ENV) {
  middleware.push(failsafeMiddleware)
}

middleware.push(asyncMiddleware())
middleware.push(sideEffectMiddleware())

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers =
  (!IS_PRODUCTION_ENV &&
    !IS_TEST_ENV &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

export default function createStore(initialState?: Partial<RootState>) {
  // Type errors came in after upgrading to redux@4 + typescript@2.8.
  // Now a cast to Store is needed.
  const store = _createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  ) as Store<RootState>

  if (import.meta.hot) {
    import.meta.hot.accept('./rootReducer', (mod) => {
      store.replaceReducer(mod.default)
    })
  }

  return store
}
