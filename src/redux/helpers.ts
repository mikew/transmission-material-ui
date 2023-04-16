import { useMemo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { AnyAction, Dispatch } from 'redux'

import { initializeRootStore } from './createRootStore'
import rootReducer from './rootReducer'

export const useRootDispatch: () => RootDispatch = useDispatch

export const useRootSelector: <TSelected>(
  fn: RootSelector<TSelected>,
) => TSelected = useSelector

export const useRootSelectorShallowEqual = <TSelected>(
  fn: RootSelector<TSelected>,
) => {
  return useSelector(fn, shallowEqual)
}

export function useRootStore(initialState: Partial<RootState>) {
  const store = useMemo(() => initializeRootStore(initialState), [initialState])
  return store
}

// These types are subject to be used in a lot of places that may never import
// the root reducer, or anything from the redux directory directly. Declare
// them global to cut down on imports.
declare global {
  type RootState = ReturnType<typeof rootReducer>
  type RootGetState = () => RootState
  type RootDispatch = Dispatch<AnyAction>
  type RootSelector<TSelected> = (state: RootState) => TSelected
}
