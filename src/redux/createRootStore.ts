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

const IS_TEST_ENV = false
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
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

let store: ReturnType<typeof createRootStore> | undefined

export function initializeRootStore(preloadedState: Partial<RootState>) {
  let _store = store ?? createRootStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = createRootStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export default function createRootStore(initialState?: Partial<RootState>) {
  // Type errors came in after upgrading to redux@4 + typescript@2.8.
  // Now a cast to Store is needed.
  const store = _createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  ) as Store<RootState>

  return store
}
