import { shallowEqual, useSelector as _useSelector } from 'react-redux'

import { RootState } from './types'

const useShallowEqualSelector = <TSelected>(
  selector: (state: RootState) => TSelected,
) => _useSelector<RootState, TSelected>(selector, shallowEqual)

export default useShallowEqualSelector
