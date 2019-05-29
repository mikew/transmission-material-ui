import createStore from '@src/redux/createStore'
import { RootState } from '@src/redux/types'
import { mount, MountRendererProps } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
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
      {element}
    </Provider>,
    options,
  )

  return {
    element,
    store,
    wrapper,
  }
}
