import { useMemo } from 'react'
export function useRootStore(initialState: Partial<RootState>) {
  const store = useMemo(() => initializeRootStore(initialState), [initialState])
  return store
}

