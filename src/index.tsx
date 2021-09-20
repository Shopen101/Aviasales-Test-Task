import { ThemeProvider } from '@material-ui/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

import App from './App'

import './index.css'
import { theme } from './theme'

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>,
    document.getElementById('root'),
)
