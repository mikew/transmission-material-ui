import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux'

interface SideEffectFunction {
  (action: AnyAction, dispatch: Dispatch<AnyAction>, getState: () => any): void
}

type SideEffectMap = Record<string, SideEffectFunction[]>

const map: SideEffectMap = {}

export async function runSideEffect(action: AnyAction, store: MiddlewareAPI) {
  if (map[action.type]) {
    for (const fn of map[action.type]) {
      await fn(action, store.dispatch, store.getState)
    }
  }
}

export function sideEffect(actionType: string, fn: SideEffectFunction) {
  if (!map[actionType]) {
    map[actionType] = []
  }

  map[actionType].push(fn)
}

export default function sideEffectMiddleware(): Middleware {
  return (store) => (dispatch) => (action) => {
    const result = dispatch(action)

    runSideEffect(action, store)

    return result
  }
}
