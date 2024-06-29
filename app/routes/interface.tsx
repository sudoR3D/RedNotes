import { ActionFunction } from "@remix-run/node"
import { notedb } from "~/comp/prisma.server"
import { redirect } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react"
import { canEdit, checkSession, logout } from "~/comp/auth.server"


export const action: ActionFunction = async ({ request }) => {
    const userid = await checkSession(request, true) as string
    const formData = await request.formData()
    const reqNoteID = formData.get("noteid") as string
    const isOwner = typeof reqNoteID !== null && await canEdit(reqNoteID, request)
    if (!isOwner) {
        throw new Error('Permission error')
    }
    const reqjob = formData.get("job")
    switch (reqjob) {
        case 'deleteNote':
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
                return deletedNote
            } catch (error) {
                return json({ error }, { status: 500 })
            }
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