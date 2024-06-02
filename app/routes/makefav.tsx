//Dependencies
import { ActionFunction, json } from "@remix-run/node";
import { notedb } from "~/_tools/prisma.server";

//Action function
export const action: ActionFunction = async ({ request }) => {
    //Get request data
    const formData = await request.formData();
    const noteId = formData.get("noteid");

    //Check noteId
    if (typeof noteId !== "string") {
        // Return a 400 error
        return json({ error: "Invalid note ID" }, { status: 400 });
    }

    //Get note from noteId
    const note = await notedb.notes.findUnique({
        where: { noteid: noteId }
    });

    //Check if there is a note
    if (!note) {
        throw new Error('Note not found');
    }

    try {
        //Update the note
        const updatedNote = await notedb.notes.update({
            where: { noteid: noteId },
            data: { stared: !note.stared }
        });

        //Return updated note
        return json(updatedNote);
    } catch (error) {
        //Return error
        return json({ error }, { status: 500 });
    }
};
