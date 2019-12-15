import React from 'react'

import { Container } from './components'

import { ClockApp } from './widgets/Clock'
import { WeatherApp } from './widgets/Weather'

export const App = () => {
    return (
        <Container>
            <ClockApp />
            <WeatherApp />
        </Container>
    )
}
