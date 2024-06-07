import React, { useState, useEffect } from 'react';
import StarSmileLineIcon from 'remixicon-react/StarSmileLineIcon'; // Adjust the import path
import StarSmileFillIcon from 'remixicon-react/StarSmileFillIcon'; // Adjust the import path
import Loading from './loading';

interface ToggleStarButtonProps {
    noteId: string | undefined;
    stared: boolean | undefined;
    onToggle: (updatedNote: { noteid: string; stared: boolean }) => void;
}

const ToggleStarButton: React.FC<ToggleStarButtonProps> = ({ noteId, stared: initialStared, onToggle }) => {
    const [stared, setStared] = useState(initialStared);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setStared(initialStared);
    }, [initialStared]);

    const handleClick = async () => {
        if (typeof noteId !== "string" || noteId.trim() === "") {
            console.error("Invalid note ID");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('/interface', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ noteid: noteId }).toString(),
            });

            if (!response.ok) {
                console.error("Failed to update the star status");
                setLoading(false);
                return;
            }

            const updatedNote = await response.json();
            console.log(updatedNote)
            setStared(updatedNote.stared);
            setLoading(false);

            if (onToggle) {
                onToggle(updatedNote);
            }
        } catch (error) {
            console.error("Error while toggling the star status:", error);
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading || noteId === "" ? true : false}
            className={`p-3.5 ${stared ? 'bg-accent hover:bg-red-700' : ' enabled:bg-gray-900 hover:bg-gray-600'} transition-color hover:duration-100 group rounded-lg `} >
            {loading ? (
                <Loading />
            ) : (
                <>
                    <StarSmileFillIcon className="group-hover:block hidden hover:duration-100" />
                    <StarSmileLineIcon className="group-hover:hidden block hover:duration-100" />

                </>
            )}
        </button>
    );
}

export default ToggleStarButton;