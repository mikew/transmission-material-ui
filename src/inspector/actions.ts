import { createActions } from 'redux-easy-mode'
import identityPayloadCreator from 'redux-easy-mode/identityPayloadCreator'

import InspectorTab from './InspectorTabs'

export default createActions('inspector', {
  setTab: identityPayloadCreator<InspectorTab>(),
  toggleInspector: () => undefined,
})
