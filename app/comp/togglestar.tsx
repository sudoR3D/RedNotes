import React, { useState, useEffect } from 'react'
import StarSmileLineIcon from 'remixicon-react/StarSmileLineIcon'
import StarSmileFillIcon from 'remixicon-react/StarSmileFillIcon'
import Loading from './loading'
import { useFetcher } from '@remix-run/react'

interface ToggleStarButtonProps {
    noteId: string
    stared: boolean
    onToggle: (updatedNote: { noteid: string; stared: boolean }) => void
}

const ToggleStarButton: React.FC<ToggleStarButtonProps> = ({ noteId, stared: initialStared, onToggle }) => {
    const [stared, setStared] = useState(initialStared)
    const [loading, setLoading] = useState(false)
    const fetcher = useFetcher()

    useEffect(() => {
        setStared(initialStared)
    }, [initialStared])

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setLoading(true)
        event.preventDefault()
        try {
            const response = await fetch('/interface', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    noteid: noteId,
                    job: 'makeFav'
                }).toString(),
            })

            if (!response.ok) {
                console.error("Failed to update the star status")
                setLoading(false)
                return
            }

            const updatedNote = await response.json()
            setStared(updatedNote.stared)
            setLoading(false)

            if (onToggle) {
                onToggle(updatedNote)
            }
        } catch (error) {
            console.error("Error while toggling the star status:", error)
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleClick}
            disabled={loading || noteId === "" ? true : false}
            className={`disabled:bg-gray-800 p-3.5 ${stared ? 'bg-accent hover:bg-red-700' : ' enabled:bg-gray-900 hover:bg-gray-600'} transition-color hover:duration-100 group rounded-lg `} >
            {loading ? (
                <Loading />
            ) : (
                <>
                    <StarSmileFillIcon className="group-hover:block hidden hover:duration-100" />
                    <StarSmileLineIcon className="group-hover:hidden block hover:duration-100" />
                </>
            )}
        </button>
    )
}

export default ToggleStarButton 