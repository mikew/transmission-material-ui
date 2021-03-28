import mountComponent from '@src/test/mountComponent'

import App from './App'

it('renders without crashing', () => {
  mountComponent(<App />)
})
