import React, { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import format from 'date-fns/format'

import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import GridListTileBar from '@material-ui/core/GridListTileBar'

import { Widget } from '~/components'
import { FullscreenContainer } from '~/contexts/fullscreen'

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        height: '100%'
    },
    fab: {
        position: 'absolute',
        top: theme.spacing(2),
        left: theme.spacing(2)
    },
    imgContainer: {
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%'
    },
    temp: {
        color: 'white',
        padding: theme.spacing(10)
    }
}))

const WEATHER_IMAGE = {
    Rain: 776816
}

const Splash = ({ onClick, data }) => {
    const cls = useStyles()
    return (
        <div
            className={cls.imgContainer}
            onClick={onClick}
            style={{
                backgroundImage: `url("https://source.unsplash.com/collection/776816/1600x900")`
            }}
        >
            <Grid
                container
                className={cls.container}
                alignItems="center"
                justify="center"
                direction="column"
            >
                <Grid item>
                    <Typography variant="h2" className={cls.temp}>
                        {data.main.temp.toFixed(0)}&deg;C
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export const WeatherApp = ({ children }) => {
    const { isFullscreen, enable, disable } = FullscreenContainer.useContainer()
    const [data, setData] = useState(null)
    const cls = useStyles()

    useEffect(() => {
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?zip=40-005,pl&APPID=e648da69d7a6659803f937ec563240db&units=metric'
        )
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [])

    const isWeatherFullscreen = isFullscreen('weather')

    if (!data) {
        return null
    }

    return (
        <Widget fullScreen={isWeatherFullscreen}>
            {isWeatherFullscreen ? (
                <div
                    className={cls.imgContainer}
                    style={{
                        backgroundImage: `url("https://source.unsplash.com/collection/776816/1600x900")`
                    }}
                >
                    <Zoom in={isWeatherFullscreen}>
                        <Fab
                            className={cls.fab}
                            color="primary"
                            onClick={() => disable()}
                        >
                            <ArrowBackIcon />
                        </Fab>
                    </Zoom>
                    <Grid
                        container
                        className={cls.container}
                        alignItems="center"
                        justify="center"
                        direction="column"
                    >
                        <Grid item>
                            <Typography variant="h2" className={cls.temp}>
                                {data.main.temp.toFixed(0)}&deg;C
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <Splash data={data} onClick={() => enable('weather')} />
            )}
        </Widget>
    )
}
