import { notedb } from "~/_tools/prisma.server";

export async function toggleStar(noteId: string) {
    const note = await notedb.notes.findUnique({ where: { noteid: noteId } });

    if (!note) {
        throw new Error("Note not found");
    }

    const updatedNote = await notedb.notes.update({
        where: { noteid: noteId },
        data: { stared: !note.stared },
    });

    return updatedNote;
}
