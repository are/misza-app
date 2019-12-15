import React, { useState, useRef, useEffect, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { FullscreenContainer } from '../contexts/fullscreen'

const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        margin: theme.spacing(0.5),
        flexShrink: 0,
        height: 300,
        width: 300,
        transition: 'all 0.2s ease-in-out'
    },
    containerFake: {
        display: 'block',
        margin: theme.spacing(0.5),
        width: 300,
        height: 300
    },
    fullScreen: {
        zIndex: 10
    },
    content: {
        width: '100%',
        height: '100%'
    },
    enter: {},
    enterActive: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: 800 - theme.spacing(1),
        height: 480 - theme.spacing(1),
        zIndex: 10
    },
    enterDone: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: 800 - theme.spacing(1),
        height: 480 - theme.spacing(1),
        zIndex: 10
    },
    exit: { top: 0, left: 0, position: 'fixed' },
    exitActive: {},
    exitDone: {}
}))

export const Widget = ({ children, fullScreen, ...rest }) => {
    const cls = useStyles()
    const { setStage } = FullscreenContainer.useContainer()
    const [{ left, top, shouldApply, shouldFake }, setPosition] = useState({
        left: 0,
        top: 0,
        shouldApply: false,
        shouldFake: false
    })
    const ref = useRef()

    const calculateEnterPosition = useCallback(node => {
        const rect = node.getBoundingClientRect()

        setStage('enter')

        setPosition({
            left: rect.x - 4,
            top: rect.y - 4,
            shouldApply: true,
            shouldFake: true
        })
    }, [])

    const finishEnterPosition = useCallback(node => {
        setPosition(state => ({
            ...state,
            shouldApply: false
        }))
    }, [])

    const calculateExitPosition = useCallback(() => {
        setPosition(state => ({
            ...state,
            shouldApply: true
        }))
    })

    const finishEndPosition = useCallback(node => {
        setPosition(state => ({
            ...state,
            shouldApply: false,
            shouldFake: false
        }))

        setStage('end')
    }, [])

    return (
        <>
            <CSSTransition
                in={fullScreen}
                timeout={200}
                classNames={cls}
                onEnter={calculateEnterPosition}
                onEntering={finishEnterPosition}
                onExiting={calculateExitPosition}
                onExited={finishEndPosition}
            >
                <Grid
                    item
                    className={cls.container}
                    ref={ref}
                    style={shouldApply ? { left, top, zIndex: 10 } : {}}
                >
                    <Paper className={cls.content} {...rest}>
                        {children}
                    </Paper>
                </Grid>
            </CSSTransition>
            {shouldFake && <div className={cls.containerFake} />}
        </>
    )
}
