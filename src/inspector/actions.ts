import { createActions } from 'redux-easy-mode'

import identityPayloadCreator from '@src/redux/identityPayloadCreator'

import InspectorTab from './InspectorTabs'

export default createActions('inspector', {
  setTab: identityPayloadCreator<InspectorTab>(),
  toggleInspector: () => undefined,
})
