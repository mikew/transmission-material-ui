// This is the main entry point of the application.
// It does the initial render and sets up the store / router.
// If you want something to run when the app launches, put it here.

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'
import createStore from './redux/createStore'
import { register, unregister } from './serviceWorker'
import serviceWorkerIosHack from './serviceWorkerIosHack'
import * as settingsActions from './settings/actions'
import './util/disableZoom.css'
import ignoreRootDrag from './util/ignoreRootDrag'
import App from './app/App'

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
})

ignoreRootDrag()

function renderApp(store: ReturnType<typeof createStore>) {
  // Importing this strange way is needed for hot loading.

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

async function init() {
  serviceWorkerIosHack()

  const store = createStore()
  store.dispatch(settingsActions.getCustomSettings())

  renderApp(store)
}

register({
  onUpdate: () => {
    unregister().then(() => window.location.reload())
  },
})

init()
