import { mount, MountRendererProps } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'

import { RootState } from '@src/redux/types'
import createStore from '@src/redux/createStore'

export interface MountComponentOptions extends MountRendererProps {
  store?: Store<RootState>
}

export default function mountComponent<P = {}>(
  element: React.ReactElement<P>,
  options: MountComponentOptions = {},
) {
  const store = options.store || createStore()

  const wrapper = mount(<Provider store={store}>{element}</Provider>, options)

  return {
    element,
    store,
    wrapper,
  }
}
