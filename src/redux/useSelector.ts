import { useSelector as _useSelector } from 'react-redux'

import { RootState } from './types'

const useSelector = <TSelected>(selector: (state: RootState) => TSelected) =>
  _useSelector<RootState, TSelected>(selector)

export default useSelector
