import React from 'react'

import ButtonBase from '@material-ui/core/ButtonBase'
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { Container, WidgetWrapper } from '~/components'
import { ClockApp } from '~/widgets/Clock'
import { WeatherApp } from '~/widgets/Weather'
import { FullscreenContainer } from '~/contexts/fullscreen'

const WIDGETS = {
    clock: ClockApp,
    weather: WeatherApp
}

export const App = () => {
    const { fsId, enable, disable } = FullscreenContainer.useContainer()

    return (
        <Container>
            {Object.entries(WIDGETS).map(([name, Component]) => (
                <WidgetWrapper
                    key={name}
                    Component={Component}
                    name={name}
                    isFullscreen={fsId === name}
                    enable={enable}
                    disable={disable}
                />
            ))}
        </Container>
    )
}
