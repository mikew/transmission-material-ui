import { Middleware } from 'redux'

/**
 * Skip non-redux actions.
 * This is needed in tests, when dealing with mocked actions.
 */
const failsafeMiddleware: Middleware = () => (dispatch) => (action) => {
  if (!action || !action.type) {
    return
  }

  return dispatch(action)
}

export default failsafeMiddleware
