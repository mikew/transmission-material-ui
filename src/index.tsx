// This is the main entry point of the application.
// It does the initial render and sets up the store / router.
// If you want something to run when the app launches, put it here.

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'
import App from './app/App'
import theme from './app/theme'
import createStore from './redux/createStore'
import settingsActions from './settings/actions'
import './util/disableZoom.css'
import ignoreRootDrag from './util/ignoreRootDrag'

ignoreRootDrag()

function renderApp(store: ReturnType<typeof createStore>) {
  // Importing this strange way is needed for hot loading.

  ReactDOM.render(
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <App />
          </CssBaseline>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>,
    document.getElementById('root'),
  )
}

async function init() {
  const store = createStore()
  store.dispatch(settingsActions.getCustomSettings())

  renderApp(store)
}

init()
