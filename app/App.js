import React from 'react'

import { Container } from './components'

import { ClockWidget } from './widgets/Clock'

export const App = () => {
    return (
        <Container>
            <ClockWidget />
            <ClockWidget />
            <ClockWidget />
            <ClockWidget />
            <ClockWidget />
            <ClockWidget />
        </Container>
    )
}
