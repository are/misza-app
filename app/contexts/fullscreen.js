import { useRef, useEffect, useState, useCallback } from 'react'
import { createContainer } from 'unstated-next'

export const FullscreenContainer = createContainer(function() {
    const [fsId, setFsId] = useState(null)
    const [stage, setStage] = useState(null)
    const bodyRef = useRef()

    const disable = useCallback(() => {
        document.body.classList.remove('fullscreen')
        setFsId(null)
    }, [setFsId])

    const enable = useCallback(
        id => {
            document.body.classList.add('fullscreen')
            setFsId(id)
        },
        [setFsId]
    )

    const isFullscreen = useCallback(
        id => {
            return id === fsId
        },
        [fsId]
    )

    return { disable, enable, isFullscreen, stage, setStage }
})
