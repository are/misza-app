import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'
import Collapse from '@material-ui/core/Collapse'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { Container, Widget } from '~/components'
import { FullscreenContainer } from '~/contexts/fullscreen'
import { ClockApp } from '~/widgets/Clock'
import { WeatherApp } from '~/widgets/Weather'

const useStyles = makeStyles(theme => ({
    menuButton: {
        position: 'absolute',
        top: theme.spacing(1),
        left: theme.spacing(1),
        zIndex: 100000
    },
    content: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        position: 'relative'
    }
}))

// <Fab
//                     style={{
//                         position: 'absolute',
//                         top: 16,
//                         left: 16,
//                         zIndex: 1000000
//                     }}
//                     color="primary"
//                     onClick={() => disable()}
//                 >
//                     <ArrowBackIcon />
//                 </Fab>

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
