import { render, RenderOptions, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Store } from 'redux'

import createStore from '@src/redux/createStore'
import { RootState } from '@src/redux/types'

export interface MountComponentOptions extends RenderOptions {
  store?: Store<RootState>
}

export default function mountComponent(
  element: React.ReactElement,
  options: MountComponentOptions = {},
) {
  const store = options.store || createStore()

  const wrapper = render(<Provider store={store}>{element}</Provider>, options)

  return {
    element,
    store,
    wrapper,
    screen,
  }
}
