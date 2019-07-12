import createAction from 'redux-ts-helpers/lib/createAction'

import constants from './constants'
import InspectorTabs from './InspectorTabs'

export const setTab = createAction<InspectorTabs>(constants.setTab)
export const toggleInspector = createAction(constants.toggleInspector)
