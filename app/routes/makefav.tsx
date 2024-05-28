import { ActionFunction, json, redirect } from "@remix-run/node";
import { toggleStar } from "~/_tools/toggleStar"; // Adjust the import path

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const noteId = formData.get("noteid");

    if (typeof noteId !== "string") {
        return json({ error: "Invalid note ID" }, { status: 400 });
    }

    try {
        const updatedNote = await toggleStar(noteId);
        return json(updatedNote);
    } catch (error) {
        return json({ error }, { status: 500 });
    }
};

