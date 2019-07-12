import mountComponent from '@src/test/mountComponent'
import React from 'react'

import App from './App'

it('renders without crashing', () => {
  mountComponent(<App />)
})
