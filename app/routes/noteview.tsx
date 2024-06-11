// Dependencies
import { useFetcher, useLoaderData } from "@remix-run/react"
import { redirect, ActionFunction, json } from "@remix-run/node"
import { notedb } from "~/comp/prisma.server"
import { Save } from "lucide-react"
import ToggleStarButton from "~/comp/togglestar"
import DoDelete from '~/comp/dodelete'
import { format } from "date-fns"
import { useEffect, useState } from "react"
import React from "react"
import EraserLineIcon from "remixicon-react/EraserLineIcon"
import EditBoxLine from "remixicon-react/EditBoxLineIcon"
import Loading from "~/comp/loading"
import { nanoid } from "nanoid"

// Props interface
interface toggleStarProps {
  onToggleStar: (updatedNote: { noteid: string; stared: boolean }) => void
}

// Note interface
interface Note {
  noteid: string
  title: string
  crDate: Date | undefined
  upDate: Date | undefined
  content: string
  stared: boolean
}

// Loader
export async function loader({ request }) {
  const url = new URL(request.url)
  const reqid = url.searchParams.get("id")
  let note: Note | null

  if (reqid !== null) {
    note = await notedb.notes.findUnique({
      where: { noteid: reqid },
    })
  } else {
    note = {
      noteid: "",
      title: "",
      content: "",
      crDate: undefined,
      upDate: undefined,
      stared: false,
    }
  }

  return note
}

// Main component
const Index: React.FC<toggleStarProps> = ({ onToggleStar }) => {
  const note = useLoaderData<Note | undefined>()

  // State management
  const [formNote, setFormNote] = useState(note)
  const [initNote, setInitnote] = useState(note)
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    document.title =
      initNote.title === ""
        ? "Create New - RedNotes"
        : initNote.title + " - RedNotes"
    setFormNote(note)
    setInitnote(note)
  }, [note])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormNote({
      ...formNote,
      [name]: value,
    })
  }

  const formstate = async () => {
    if (formNote.noteid === "") {
      setEditing(true)
    }
  }

  useEffect(() => {
    formstate()
  }, [formNote.noteid])

  const toggltEdit = () => {
    if (editing) {
      setFormNote(initNote)
      setEditing(false)
    } else {
      setEditing(true)
    }
  }

  useEffect(() => {
    const refContentArea = document.getElementsByName(
      "content"
    )[0] as HTMLTextAreaElement | null
    if (refContentArea) {
      refContentArea.style.height = "auto"
      refContentArea.style.height = `${refContentArea.scrollHeight}px`
    }
  })

  useEffect(() => {
    const notetitle = document.getElementsByName(
      "title"
    )[0] as HTMLTextAreaElement | null
    if (notetitle) {
      const adjustHeight = () => {
        notetitle.style.height = "auto"
        notetitle.style.height = `${notetitle.scrollHeight}px`
      }
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
          event.preventDefault()
          const nextElement = document.getElementsByName(
            "content"
          )[0] as HTMLTextAreaElement | null
          if (nextElement) {
            nextElement.focus()
          }
        }
      }
      notetitle.addEventListener("input", adjustHeight)
      notetitle.addEventListener("keydown", handleKeyDown)
      adjustHeight()
      return () => {
        notetitle.removeEventListener("input", adjustHeight)
        notetitle.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [])

  const fetcher = useFetcher()
  const handleSubmit = () => {
    fetcher.submit(
      {
        noteid: formNote.noteid,
        title: formNote.title,
        content: formNote.content,
      },
      { method: "post" }
    )
  }

  return (
    <>
      <div className="gap-y-4 grid">
        <div className="mt-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-x-4">
            <ToggleStarButton
              noteId={formNote.noteid}
              stared={formNote.stared}
              onToggle={onToggleStar}
            />

            <p className="min-w-min inline-flex text-lg">
              {formNote.crDate !== undefined
                ? format(formNote.crDate, "MMM dd, yyyy")
                : null}
            </p>
          </div>
          <div className="inline-flex gap-x-4">
            <button
              type="button"
              onClick={toggltEdit}
              className="enabled:hover:bg-accent enabled:bg-gray-900 disabled:hover:bg-gray-600 transition-color hover:duration-100 rounded-lg p-3.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in disabled:bg-gray-800 enabled:hover:bg-accent   transition-color transition-color"
            >
              {editing === false ?
                <EditBoxLine className="w-6 h-6" />
                :
                <EraserLineIcon className="w-6 h-6" />
              }
            </button>

            <DoDelete
              noteId={formNote.noteid}
              redirURL="/"
              onDelete={() => console.log(`Note ${formNote.noteid} deleted`)}
            />

            <button
              onClick={handleSubmit}
              type="button"
              disabled={formNote === initNote}
              className="enabled:hover:bg-accent enabled:bg-gray-900 disabled:hover:bg-gray-600 disabled:bg-gray-800 transition-color hover:duration-100 rounded-lg p-3.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in"
            >
              {loading ?
                <Loading />
                :
                <Save className="w-6 h-6" />
              }

            </button>
          </div>
        </div>
        <form method="POST" className="gap-y-4 grid">
          <textarea
            placeholder="Note Title"
            name="title"
            className=" min-h-16 text-2xl font-semibold w-full antialiased px-4 py-3.5 focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-none"
            value={formNote.title}
            rows={1}
            onChange={handleInputChange}
            disabled={!editing}
          />
          <textarea
            value={formNote.content}
            placeholder="Add Note Content"
            id="content"
            name="content"
            onChange={handleInputChange}
            disabled={!editing}
            className="min-h-[40vh] text-lg h-auto w-full antialiased px-4 py-3.5 focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-x"
          />
          <input type="hidden" name="noteid" value={formNote.noteid} />
        </form>
      </div>
    </>
  )
}

export default Index

// Action function
export const action: ActionFunction = async ({ request }) => {
  // Get data from request
  const formData = await request.formData()
  const noteid = formData.get("noteid") === "" ? (nanoid(8) as string) : (formData.get("noteid") as string)
  const title = formData.get("title") as string
  const content = formData.get("content") as string

  try {
    // Update or create note in database
    const updatedNote = await notedb.notes.upsert({
      where: {
        noteid: noteid,
      },
      update: {
        title: title,
        content: content,
      },
      create: {
        noteid: noteid,
        title: title,
        content: content,
      },
    })
    // Redirect to noteview with new noteid
    return redirect("/noteview/?id=" + updatedNote.noteid)
  } catch (error) {
    // Send error if upsert fails
    return json({ error }, { status: 500 })
  }
} 
