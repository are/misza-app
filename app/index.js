import React from 'react'
import { render } from 'react-dom'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { theme } from './theme'
import { App } from './App'

import { FullscreenContainer } from './contexts/fullscreen'

render(
    <FullscreenContainer.Provider>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </FullscreenContainer.Provider>,
    document.getElementById('root')
)
