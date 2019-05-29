import createStore from '@src/redux/createStore'
import { RootState } from '@src/redux/types'
import { mount, MountRendererProps } from 'enzyme'
import { History } from 'history'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { Store } from 'redux'

export interface MountComponentOptions extends MountRendererProps {
  store?: Store<RootState>
}

export default function mountComponent<P = {}>(
  element: React.ReactElement<P>,
  options: MountComponentOptions = {},
) {
  const store = options.store || createStore()
  let history: History | undefined

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter ref={(x) => (history = (x as any).history)}>
        {element}
      </MemoryRouter>
    </Provider>,
    options,
  )

  return {
    element,
    store,
    wrapper,
    history: history!,
  }
}
