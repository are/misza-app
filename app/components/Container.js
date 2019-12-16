import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(4, 4, 4, 4),
        display: 'inline-flex',
        overflowX: 'scroll',
        overflowY: 'hidden',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'nowrap',
        '&::-webkit-scrollbar': {
            width: 0,
            background: 'transparent'
        }
    }
}))

export const Container = ({ children }) => {
    const cls = useStyles()

    return <div className={cls.container}>{children}</div>
}
