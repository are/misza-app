import React, { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import SwipeableViews from 'react-swipeable-views'

import format from 'date-fns/format'

import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

import AccessTimeIcon from '@material-ui/icons/AccessTime'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import TimerIcon from '@material-ui/icons/Timer'

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
    tabs: {
        position: 'absolute',
        bottom: 0,
        zIndex: 100,
        width: '100%'
    }
}))

export const ClockApp = ({ children, isFullscreen }) => {
    const [tab, setTab] = useState(0)
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    useEffect(() => {
        if (!isFullscreen) {
            setTab(0)
        }
    }, [isFullscreen])

    const cls = useStyles()
    return (
        <>
            <SwipeableViews
                axis={'x'}
                index={tab}
                onChangeIndex={setTab}
                className={cls.container}
                slideClassName={cls.container}
                containerStyle={{ height: '100%' }}
            >
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
                        <Typography variant="h2">
                            {format(time, 'HH:mm')}
                        </Typography>
                    </Grid>
                </Grid>
                <div>b</div>
            </SwipeableViews>

            <Zoom in={isFullscreen}>
                <BottomNavigation
                    value={tab}
                    onChange={(event, newValue) => {
                        setTab(newValue)
                    }}
                    className={cls.tabs}
                    showLabels
                >
                    <BottomNavigationAction
                        label="Clock"
                        icon={<AccessTimeIcon />}
                    />
                    <BottomNavigationAction
                        label="Alarms"
                        icon={<AccessAlarmIcon />}
                    />
                    <BottomNavigationAction
                        label="Timers"
                        icon={<TimerIcon />}
                    />
                </BottomNavigation>
            </Zoom>
        </>
    )
}
