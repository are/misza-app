import { useRef, useState, useCallback } from 'react'
import { createContainer } from 'unstated-next'

import { useAsyncEffect } from '~/utils'

const getCurrentWeatherUrl = (location, key) =>
    `https://api.openweathermap.org/data/2.5/weather?zip=${location}&APPID=${key}&units=metric`

const getForecastUrl = (location, key) =>
    `https://api.openweathermap.org/data/2.5/forecast?zip=${location}&APPID=${key}&units=metric`

const IMAGE_COLLECTIONS = {
    Rain: 1129245,
    Thunderstorm: 4372035,
    Drizzle: 8258193,
    Snow: 426534,
    Mist: 1463948,
    Clear: 534097,
    Clouds: 1878429
}

export const WeatherContainer = createContainer(function() {
    const [location, setLocation] = useState('40-005,pl')
    const [shouldUpdate, requestUpdate] = useState(new Date())
    const [state, setState] = useState({
        isLoading: true,
        current: null,
        forecast: null
    })

    useAsyncEffect(async () => {
        setState(state => ({ ...state, isLoading: true }))

        let [current, forecast] = await Promise.all([
            fetch(
                getCurrentWeatherUrl(location, process.env.OPENWEATHER_API_KEY)
            ).then(res => res.json()),
            fetch(
                getForecastUrl(location, process.env.OPENWEATHER_API_KEY)
            ).then(res => res.json())
        ])

        setState(state => ({ ...state, isLoading: false, current, forecast }))

        setTimeout(() => {
            requestUpdate(() => new Date())
        }, 60 * 1000)
    }, [location, shouldUpdate])

    const imgUrl = (() => {
        if (state.current) {
            const hasColl = IMAGE_COLLECTIONS[state.current.weather[0].main]

            if (hasColl) {
                return `https://source.unsplash.com/collection/${hasColl}/1600x900`
            } else {
                return `https://source.unsplash.com/800x480?${state.current.weather[0].main}`
            }
        } else {
            return ''
        }
    })()

    return {
        ...state,
        imageUrl: imgUrl
    }
})
