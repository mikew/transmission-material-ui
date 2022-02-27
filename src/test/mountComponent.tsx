import { Provider } from 'react-redux'
import { Store } from 'redux'
import { render, RenderOptions, screen } from '@testing-library/react'

import { RootState } from '@src/redux/types'
import createStore from '@src/redux/createStore'

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
