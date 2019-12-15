import React from 'react'
import { render } from 'react-dom'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { theme } from './theme'
import { App } from './App'

import { FullScreenContainer } from './contexts/fullscreen'

render(
    <FullScreenContainer.Provider>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </FullScreenContainer.Provider>,
    document.getElementById('root')
)
