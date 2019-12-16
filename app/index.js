import React from 'react'
import { render } from 'react-dom'

import WhyDidYouUpdate from '@welldone-software/why-did-you-render'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { theme } from './theme'
import { App } from './App'

import { FullscreenContainer } from './contexts/fullscreen'
import { WeatherContainer } from '~/contexts/weather'

WhyDidYouUpdate(React)

render(
    <FullscreenContainer.Provider>
        <WeatherContainer.Provider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </WeatherContainer.Provider>
    </FullscreenContainer.Provider>,
    document.getElementById('root')
)
