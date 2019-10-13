import createAction from 'redux-ts-helpers/lib/createAction'

import constants from './constants'

export const getCustomSettings = createAction(constants.getCustomSettings, () =>
  fetch('transmission-material-ui.json').then((resp) => resp.json()),
)
