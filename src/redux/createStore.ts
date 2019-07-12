import {
  applyMiddleware,
  createStore as _createStore,
  Middleware,
  Store,
} from 'redux'
import reduxAsyncPayload from 'redux-async-payload'
import { createLogger } from 'redux-logger'

// tslint:disable-next-line:import-name
import sideEffectMiddleware from './sideEffects/middleware'
import { RootState } from './types'

const IS_TEST_ENV = typeof describe !== 'undefined'
const IS_PRODUCTION_ENV = process.env.NODE_ENV === 'production'

const middleware: Middleware[] = []

if (IS_TEST_ENV) {
  // tslint:disable-next-line:no-var-requires
  const failsafeMiddleware = require('./failsafeMiddleware').default
  middleware.push(failsafeMiddleware)
}

middleware.push(reduxAsyncPayload())
middleware.push(sideEffectMiddleware())

if (!IS_PRODUCTION_ENV && !IS_TEST_ENV) {
  middleware.push(createLogger())
}

function getRootReducer() {
  // Importing this strange way is needed for hot loading.
  return require('./rootReducer').default
}

export default function createStore(initialState?: Partial<RootState>) {
  // Type errors came in after upgrading to redux@4 + typescript@2.8.
  // Now a cast to Store is needed.
  const store = _createStore(
    getRootReducer(),
    initialState as any,
    applyMiddleware(...middleware),
  ) as Store<RootState>

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(getRootReducer())
    })
  }

  return store
}
