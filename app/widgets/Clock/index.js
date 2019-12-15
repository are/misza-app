import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'

import { Widget } from '~/components'

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '100%'
    }
})

export const ClockWidget = ({ children }) => {
    const [isFullScreen, setFullScreen] = useState(false)
    const cls = useStyles()

    return (
        <Widget fullScreen={isFullScreen}>
            <ButtonBase
                className={cls.container}
                onClick={() => setFullScreen(state => !state)}
            >
                Hello world
            </ButtonBase>
        </Widget>
    )
}
