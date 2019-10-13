// This is the main entry point of the application.
// It does the initial render and sets up the store / router.
// If you want something to run when the app launches, put it here.

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme, {
  ThemeOptions,
} from '@material-ui/core/styles/createMuiTheme'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'
import createStore from './redux/createStore'
import { register, unregister } from './serviceWorker'
import serviceWorkerIosHack from './serviceWorkerIosHack'
import * as settingsActions from './settings/actions'
import './util/disableZoom.css'
import ignoreRootDrag from './util/ignoreRootDrag'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#455a64',
    },
    secondary: {
      main: '#b71c1c',
    },
    // type: 'dark',
  },
  typography: {
    fontSize: 14,
  },
} as ThemeOptions)

ignoreRootDrag()

function renderApp() {
  // Importing this strange way is needed for hot loading.
  // tslint:disable-next-line:variable-name
  const App = require('./app/App').default

  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'),
  )
}

let store: ReturnType<typeof createStore>
export function getStore() {
  return store
}

async function init() {
  serviceWorkerIosHack()
  store = createStore()
  store.dispatch(settingsActions.getCustomSettings())
  renderApp()
}

register({
  onUpdate: () => {
    unregister().then(() => window.location.reload())
  },
})

init()

if (module.hot) {
  module.hot.accept('./app/App', renderApp)
}
