import { useRef, useEffect, useState, useCallback } from 'react'
import { createContainer } from 'unstated-next'

export const FullscreenContainer = createContainer(function(...args) {
    const [fsId, setFsId] = useState(null)
    const bodyRef = useRef()

    useEffect(() => {
        function onPopState(event) {
            event.preventDefault()

            setFsId(null)
        }

        window.addEventListener('popstate', onPopState)

        return () => {
            window.removeEventListener('popstate', onPopState)
        }
    }, [])

    const disable = useCallback(() => {
        document.body.classList.remove('fullscreen')
        setFsId(null)
    }, [])

    const enable = useCallback(id => {
        document.body.classList.add('fullscreen')
        setFsId(id)
        window.history.pushState({ widget: id }, `${id} widget`)
    }, [])

    return { disable, enable, fsId }
})
