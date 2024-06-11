import React, { useState, useEffect } from 'react'
import { useFetcher } from '@remix-run/react'
import DeleteBin7Line from 'remixicon-react/DeleteBin7LineIcon'
import Loading from './loading'

type DeleteButtonProps = {
    noteId: string
    redirURL: string
    onDelete?: () => void
}

const DoDelete: React.FC<DeleteButtonProps> = ({ noteId, redirURL, onDelete }) => {
    const [loading, setLoading] = useState(false)

    const fetcher = useFetcher()
    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setLoading(true)
        try {
            await fetcher.submit(
                {
                    noteid: noteId,
                    job: 'deleteNote',
                },
                { method: "post", action: '/interface' }
            )
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data && onDelete) {
            onDelete()
        }
    }, [fetcher, onDelete])
    return (
        <button
            onClick={handleClick}
            disabled={noteId === ""}
            className="disabled:bg-gray-800 enabled:hover:bg-accent enabled:bg-gray-900 disabled:hover:bg-gray-600 transition-color hover:duration-100 rounded-lg p-3.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in"
        >
            {loading ? (
                <Loading />
            ) : (
                <>
                    <DeleteBin7Line className="group-hover:block hidden hover:duration-100" />
                    <DeleteBin7Line className="group-hover:hidden block hover:duration-100" />
                </>
            )}
        </button>
    )
}

export default DoDelete 