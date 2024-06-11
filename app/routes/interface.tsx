import { ActionFunction } from "@remix-run/node"
import { notedb } from "~/comp/prisma.server"
import { redirect } from "@remix-run/node"
import { json } from "@remix-run/node"



export const action: ActionFunction = async ({ request }) => {
    // Get data from request
    const formData = await request.formData()
    const reqjob = formData.get("job")
    switch (reqjob) {
        case 'deleteNote':
            console.log('delete note' + formData.get('noteid'))
            const delnote = await notedb.notes.findUnique({
                where: {
                    noteid: formData.get('noteid') as string
                }
            })
            if (!delnote) {
                console.log('Note not avilable')
                throw new Error('Note not found')
            }
            try {
                const deletedNote = await notedb.notes.delete({
                    where: {
                        noteid: delnote.noteid,
                    }
                })
                return redirect("/")
            } catch (error) {
                return json({ error }, { status: 500 })
            }
            return redirect("/")
        case 'makeFav':
            console.log('fav note' + formData.get('noteid'))
            const note = await notedb.notes.findUnique({
                where: {
                    noteid: formData.get('noteid') as string
                }
            })
            if (!note) {
                console.log('Note not avilable')
                throw new Error('Note not found')
            }
            try {
                const staredNote = await notedb.notes.update({
                    where: {
                        noteid: note.noteid
                    },
                    data: {
                        stared: !note.stared
                    }
                })
                return json(staredNote)
            } catch (error) {
                return json({ error }, { status: 500 })
            }


        default:
            console.log('invalid job request')
            return null
    }
} 