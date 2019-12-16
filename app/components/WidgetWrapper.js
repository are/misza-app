import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { CSSTransition } from 'react-transition-group'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { Container, Widget } from '~/components'
import { FullscreenContainer } from '~/contexts/fullscreen'
import { ClockApp } from '~/widgets/Clock'
import { WeatherApp } from '~/widgets/Weather'

const useStyles = makeStyles(theme => ({
    menuButton: {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        zIndex: 100000,
        transform: 'translate(-50%, 25%)',
        height: 0
    },
    content: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        position: 'relative'
    }
}))

const SimpleWidgetWrapper = ({
    name,
    Component,
    isFullscreen,
    enable,
    disable
}) => {
    const cls = useStyles()
    return (
        <Widget fullScreen={isFullscreen} key={name}>
            <div
                className={cls.content}
                style={{
                    cursor: isFullscreen ? 'auto' : 'pointer',
                    userSelect: isFullscreen ? 'auto' : 'none'
                }}
                onClick={e => {
                    if (!isFullscreen) {
                        enable(name)
                    } else {
                        e.preventDefault()
                    }
                }}
            >
                <Component isFullscreen={isFullscreen} />
            </div>
        </Widget>
    )
}

export const WidgetWrapper = React.memo(SimpleWidgetWrapper)
