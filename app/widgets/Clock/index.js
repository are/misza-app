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
    }
}))

export const Clock = ({ time }) => {
    const cls = useStyles()
    return (
        <Grid
            container
            className={cls.container}
            justify="center"
            alignItems="center"
            direction="column"
        >
            <Grid item>
                <Typography variant="caption">
                    {format(time, 'MMMM d, y')}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h2">{format(time, 'HH:mm')}</Typography>
            </Grid>
        </Grid>
    )
}

export const ClockApp = ({ children }) => {
    const { isFullscreen, enable, disable } = FullscreenContainer.useContainer()
    const [currentTime, setTime] = useState(new Date())
    const cls = useStyles()

    const isClockFullscreen = isFullscreen('clock')

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <Widget fullScreen={isClockFullscreen}>
            {isClockFullscreen ? (
                <>
                    <Zoom in={isClockFullscreen}>
                        <Fab
                            className={cls.fab}
                            color="primary"
                            onClick={() => disable()}
                        >
                            <ArrowBackIcon />
                        </Fab>
                    </Zoom>
                    <Clock time={currentTime} />
                </>
            ) : (
                <ButtonBase
                    className={cls.container}
                    onClick={() => enable('clock')}
                >
                    <Clock time={currentTime} />
                </ButtonBase>
            )}
        </Widget>
    )
}
