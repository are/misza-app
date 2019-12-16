import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'
import AppsIcon from '@material-ui/icons/Apps'

import { Container, WidgetWrapper } from '~/components'
import { ClockApp } from '~/widgets/Clock'
import { WeatherApp } from '~/widgets/Weather'
import { FullscreenContainer } from '~/contexts/fullscreen'

const useStyles = makeStyles(theme => ({
    button: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 100000
    }
}))

const WIDGETS = {
    clock: ClockApp,
    weather: WeatherApp
}

export const App = () => {
    const cls = useStyles()
    const { fsId, enable, disable } = FullscreenContainer.useContainer()

    return (
        <>
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
            <Zoom in={fsId !== null}>
                <Fab
                    className={cls.button}
                    color="primary"
                    onClick={() => disable()}
                >
                    <AppsIcon />
                </Fab>
            </Zoom>
        </>
    )
}
