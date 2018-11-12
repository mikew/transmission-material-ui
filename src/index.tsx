import CssBaseline from '@material-ui/core/CssBaseline'
import createMuiTheme, {
  ThemeOptions,
} from '@material-ui/core/styles/createMuiTheme'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// import App from './App'
import './index.css'
import createStore from './redux/createStore'
import registerServiceWorker from './registerServiceWorker'
import ignoreRootDrag from './util/ignoreRootDrag'

const store = createStore()

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
  // tslint:disable-next-line:variable-name
  const App = require('./App').default

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

registerServiceWorker()
renderApp()

const m = module as any
if (m.hot) {
  m.hot.accept('./App', renderApp)
}
