import { createActions } from 'redux-easy-mode'

export default createActions('settings', {
  getCustomSettings: () =>
    fetch('transmission-material-ui.json').then((resp) => resp.json()),
})
