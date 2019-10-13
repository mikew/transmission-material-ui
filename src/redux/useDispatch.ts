import { useDispatch as _useDispatch } from 'react-redux'

import { AppDispatch } from './types'

const useDispatch = () => _useDispatch<AppDispatch>()

export default useDispatch
