import React, { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import format from 'date-fns/format'
import isFuture from 'date-fns/isFuture'
import getHours from 'date-fns/getHours'
import isTomorrow from 'date-fns/isTomorrow'
import isToday from 'date-fns/isToday'

import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import Grow from '@material-ui/core/Grow'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
import WeatherIcon from 'react-icons-weather'

import { WeatherContainer } from '~/contexts/weather'

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column'
    },
    fab: {
        position: 'absolute',
        top: theme.spacing(2),
        left: theme.spacing(2),
        zIndex: 100
    },
    imgContainer: {
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%'
    },
    temp: {
        color: 'white',
        padding: theme.spacing(1)
    },
    loader: {
        position: 'absolute',
        width: '100%'
    },
    bottom: {
        position: 'absolute',
        bottom: theme.spacing(2),
        display: 'inline-flex',
        overflowX: 'hidden',
        overflowY: 'hidden',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'nowrap'
    },
    bottomEntry: {
        width: 60,
        flexShrink: 0
    },
    tempWrapper: {
        width: '100%',
        height: '100%',
        maxHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.3)',
        transition: 'background 0.5s ease-in-out',
        position: 'absolute',
        bottom: 0,
        overflowY: 'scroll',
        'scrollbar-width': 'none' /* Firefox */,
        '-ms-overflow-style': 'none' /* Internet Explorer 10+ */,
        '&::-webkit-scrollbar': {
            display: 'none',
            width: 0,
            background: 'transparent'
        }
    },
    enterDone: {
        background: 'rgba(0, 0, 0, 0.7)'
    },
    exitDone: {}
}))

const isNight = date => {
    const hour = getHours(new Date(date))

    return hour >= 19 || hour < 7
}

export const WeatherApp = ({ children, isFullscreen, fullscreen }) => {
    const cls = useStyles()
    const {
        isLoading,
        current,
        forecast,
        imageUrl
    } = WeatherContainer.useContainer()

    return (
        <div
            className={cls.imgContainer}
            style={{
                backgroundImage: `url("${imageUrl}")`
            }}
        >
            {isLoading && <LinearProgress className={cls.loader} />}
            <Grid
                container
                className={cls.container}
                alignItems="flex-end"
                justify="flex-end"
                direction="column"
            >
                <Grid item className={cls.container}>
                    <CSSTransition
                        in={isFullscreen}
                        classNames={cls}
                        timeout={100}
                    >
                        <Paper className={cls.tempWrapper}>
                            <Grow in={isFullscreen} timeout={200}>
                                <Typography color="secondary" variant="caption">
                                    Feels like{' '}
                                    {current !== null
                                        ? current.main.feels_like.toFixed(0)
                                        : '-'}{' '}
                                    &deg;C
                                </Typography>
                            </Grow>
                            <Typography variant="h2" className={cls.temp}>
                                {current !== null
                                    ? current.main.temp.toFixed(0)
                                    : '-'}{' '}
                                &deg;C
                            </Typography>
                            <Grow in={isFullscreen} timeout={200}>
                                <Grid
                                    container
                                    justify="space-around"
                                    className={cls.bottom}
                                >
                                    {current !== null
                                        ? forecast.list
                                              .filter(weather => {
                                                  const date = new Date(
                                                      weather.dt_txt
                                                  )
                                                  return (
                                                      (isFuture(date) &&
                                                          isToday(date)) ||
                                                      isTomorrow(date)
                                                  )
                                              })
                                              .map(weather => (
                                                  <Grid item key={weather.dt}>
                                                      <Grid
                                                          container
                                                          direction="column"
                                                          alignItems="center"
                                                          className={
                                                              cls.bottomEntry
                                                          }
                                                      >
                                                          <Grid item>
                                                              <Typography
                                                                  color="secondary"
                                                                  variant="caption"
                                                              >
                                                                  {format(
                                                                      new Date(
                                                                          weather.dt_txt
                                                                      ),
                                                                      'H:mm'
                                                                  )}
                                                              </Typography>
                                                          </Grid>
                                                          <Grid item>
                                                              <Typography
                                                                  color="secondary"
                                                                  variant="h6"
                                                              >
                                                                  <WeatherIcon
                                                                      name="owm"
                                                                      iconId={String(
                                                                          weather
                                                                              .weather[0]
                                                                              .id
                                                                      )}
                                                                      night={isNight(
                                                                          weather.dt_txt
                                                                      )}
                                                                  />
                                                              </Typography>
                                                          </Grid>
                                                          <Grid item>
                                                              <Typography
                                                                  color="secondary"
                                                                  variant="caption"
                                                              >
                                                                  {weather.main.temp.toFixed(
                                                                      0
                                                                  )}{' '}
                                                                  &deg;C
                                                              </Typography>
                                                          </Grid>
                                                      </Grid>
                                                  </Grid>
                                              ))
                                        : '-'}
                                </Grid>
                            </Grow>
                        </Paper>
                    </CSSTransition>
                </Grid>
            </Grid>
        </div>
    )
}
