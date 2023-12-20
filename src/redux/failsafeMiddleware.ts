import { Middleware } from 'redux'
import isAction from 'redux-easy-mode/isAction'

/**
 * Skip non-redux actions.
 * This is needed in tests, when dealing with mocked actions.
 */
const failsafeMiddleware: Middleware = () => (dispatch) => (action) => {
  if (!isAction(action)) {
    return
  }

  return dispatch(action)
}

export default failsafeMiddleware
