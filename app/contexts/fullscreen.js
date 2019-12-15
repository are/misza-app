import { useRef, useEffect } from 'react'
import { createContainer } from 'unstated-next'

export const FullScreenContainer = createContainer(function() {
    const bodyRef = useRef()

    useEffect(() => {
        bodyRef.current = document.body
    }, [])

    const disable = () => {
        document.body.classList.remove('fullscreen')
    }
    const enable = () => {
        document.body.classList.add('fullscreen')
    }

    return { disable, enable }
})
