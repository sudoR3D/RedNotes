import { prisma } from "~/_tools/prisma.server";

export async function toggleStar(noteId: string) {
    const note = await prisma.notes.findUnique({ where: { noteid: noteId } });

    if (!note) {
        throw new Error("Note not found");
    }

    const updatedNote = await prisma.notes.update({
        where: { noteid: noteId },
        data: { stared: !note.stared },
    });

    return updatedNote;
}