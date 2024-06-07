//import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react"
//import { redirect } from "@remix-run/node"
//import { notedb } from "~/comp/prisma.server"
//import { Save } from "lucide-react"
//import ToggleStarButton from "~/comp/startoggle"
//import { format } from "date-fns"
//import { useEffect, useState } from "react"
//import React from "react"
//import EraserLineIcon from "remixicon-react/EraserLineIcon"
//import EditBoxLine from "remixicon-react/EditBoxLineIcon"
//import Loading from "~/comp/loading"
//import { nanoid } from "nanoid"
//import { ActionFunction, json } from "@remix-run/node"
//
//interface Props {
//  onToggleStar: (updatedNote: { noteid: string; stared: boolean }) => void;
//}
//interface Note {
//  noteid: string
//  title: string
//  crDate: Date | undefined
//  upDate: Date | undefined
//  content: string
//  stared: boolean
//}
//export async function loader({ request }) {
//  const url = new URL(request.url)
//  const reqid = url.searchParams.get('id')
//  let note: Note | null;
//
//  reqid !== null ?
//    note = await notedb.notes.findUnique({
//      where: { noteid: reqid },
//    }) :
//    note = {
//      noteid: '',
//      title: '',
//      content: '',
//      crDate: undefined,
//      upDate: undefined,
//      stared: false,
//    };
//  return note
//};
//
//const Index: React.FC<Props> = ({ onToggleStar }) => {
//  const note = useLoaderData<Note | undefined>();
//
//  useEffect(() => {
//    document.title = initNote.title === '' ? "Create New - RedNotes" : initNote.title + " - RedNotes";
//    setFormNote(note)
//    setInitnote(note)
//  }, [note]);
//
//
//  const [formNote, setFormNote] = useState(note)
//  const [initNote, setInitnote] = useState(note)
//  const [loading, setLoading] = useState(false)
//
//  useEffect(() => {
//    setFormNote(note)
//    setInitnote(note)
//  }, [note])
//
//  const handleInputChange = (e) => {
//    const { name, value } = e.target;
//    setFormNote({
//      ...formNote,
//      [name]: value,
//    });
//  }
//  const [editing, setEditing] = useState(false)
//  const formstate = async () => {
//    if (formNote.noteid === '') {
//      setEditing(true)
//    }
//  }
//  useEffect(() => {
//    formstate();
//  }, [formNote.noteid]);
//
//  const toggltEdit = () => {
//    if (editing === true) {
//      setFormNote(initNote)
//      setEditing(false)
//    } else {
//      setEditing(true)
//    }
//  }
//
//  useEffect(() => {
//    const refContentArea = document.getElementsByName('content')[0] as HTMLTextAreaElement | null
//    if (refContentArea) {
//      refContentArea.style.height = 'auto'
//      refContentArea.style.height = `${refContentArea.scrollHeight}px`
//    }
//  })
//
//  useEffect(() => {
//    const notetitle = document.getElementsByName('title')[0] as HTMLTextAreaElement | null;
//    if (notetitle) {
//      const adjustHeight = () => {
//        notetitle.style.height = 'auto';
//        notetitle.style.height = `${notetitle.scrollHeight}px`;
//      };
//      const handleKeyDown = (event: KeyboardEvent) => {
//        if (event.key === 'Enter') {
//          event.preventDefault();
//          const nextElement = document.getElementsByName('content')[0] as HTMLTextAreaElement | null;
//          if (nextElement) {
//            nextElement.focus();
//          }
//        }
//      };
//      notetitle.addEventListener('input', adjustHeight);
//      notetitle.addEventListener('keydown', handleKeyDown);
//      adjustHeight();
//      return () => {
//        notetitle.removeEventListener('input', adjustHeight);
//        notetitle.removeEventListener('keydown', handleKeyDown);
//      };
//    }
//  },
//    [])
//
//  const fetcher = useFetcher()
//  const handleSubmit = () => {
//    fetcher.submit(
//      {
//        noteid: formNote.noteid,
//        title: formNote.title,
//        content: formNote.content
//      },
//      { method: 'post' }
//    )
//  };
//  const navi = useNavigate();
//  return (
//    <>
//      <form method="POST" className="gap-y-4 grid">
//        <div className="mt-4 flex items-center justify-between">
//          <div className="inline-flex items-center gap-x-4">
//            <ToggleStarButton
//              noteId={formNote.noteid}
//              stared={formNote.stared}
//              onToggle={onToggleStar}
//            />
//            <p className="min-w-min inline-flex text-lg">
//              {formNote.crDate !== undefined ? format(formNote.crDate, 'MMM dd, yyyy') : null}
//            </p>
//          </div>
//          <div className="inline-flex gap-x-4">
//            <button
//              type="button"
//              onClick={() => { navi("/noteview") }}
//              className="hover:bg-gray-700 transition-color hover:duration-100 group rounded-lg p-3.5 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-accent hover:scale-105 align-middle transition-color duration-100 ease-in">
//              {editing === false ?
//                <EditBoxLine className="w-6 h-6" /> :
//                <EraserLineIcon className="w-6 h-6" />}
//            </button>
//            <button
//              onClick={handleSubmit}
//              type="button"
//              disabled={formNote === initNote ? true : false}
//              className="enabled:hover:bg-accent enabled:bg-gray-900 disabled:hover:bg-gray-600 transition-color hover:duration-100 rounded-lg p-3.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in">
//              {loading ? <Loading /> :
//                <Save className="w-6 h-6" />}
//            </button>
//          </div>
//        </div>
//        <textarea
//          placeholder="Note Title"
//          name="title"
//          className="text-2xl font-semibold w-full antialiased px-4 py-3.5 focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-none"
//          value={formNote.title} rows={1}
//          onChange={handleInputChange}
//          disabled={!editing}
//        />
//        <textarea
//          value={formNote.content}
//          placeholder="Add Note Content"
//          id="content"
//          name="content"
//          onChange={handleInputChange}
//          disabled={!editing}
//          className='min-h-[40vh] text-lg h-auto w-full antialiased px-4 py-3.5 focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-x'
//        />
//        <input type="hidden" name="noteid" value={formNote.noteid} />
//      </form >
//    </>
//  );
//}
//export default Index;
//
//export const action: ActionFunction = async ({ request }) => {
//  const formData = await request.formData();
//  const noteid = formData.get("noteid") === "" ? nanoid(8) as string : formData.get('noteid') as string;
//  //const noteid = formData.get("noteid") !== '' ? nanoid() : formData.get("noteid") as string;
//  const title = formData.get("title") as string;
//  const content = formData.get("content") as string;
//
//  // Log data to server console
//  console.log({ noteid, title, content });
//
//
//  try {
//    //Update the note
//    const updatedNote = await notedb.notes.upsert({
//      where: {
//        noteid: noteid
//      },
//      update: {
//        title: title,
//        content: content,
//      },
//      create: {
//        noteid: noteid,
//        title: title,
//        content: content,
//      }
//    });
//
//    //Return updated note
//    console.log(updatedNote)
//    return redirect("/noteview/?id=" + updatedNote.noteid);
//    //return json(updatedNote)
//  } catch (error) {
//    //Return error
//    return json({ error }, { status: 500 });
//  }
//};

// Import necessary dependencies from Remix, React, and other packages
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { redirect, ActionFunction, json } from "@remix-run/node";
import { notedb } from "~/comp/prisma.server";
import { Save } from "lucide-react";
import ToggleStarButton from "~/comp/startoggle";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import React from "react";
import EraserLineIcon from "remixicon-react/EraserLineIcon";
import EditBoxLine from "remixicon-react/EditBoxLineIcon";
import Loading from "~/comp/loading";
import { nanoid } from "nanoid";

// Define the Props interface
interface Props {
  onToggleStar: (updatedNote: { noteid: string; stared: boolean }) => void;
}

// Define the Note interface
interface Note {
  noteid: string;
  title: string;
  crDate: Date | undefined;
  upDate: Date | undefined;
  content: string;
  stared: boolean;
}

// Loader function to fetch the note based on the URL parameter
export async function loader({ request }) {
  const url = new URL(request.url);
  const reqid = url.searchParams.get("id");
  let note: Note | null;

  if (reqid !== null) {
    note = await notedb.notes.findUnique({
      where: { noteid: reqid },
    });
  } else {
    note = {
      noteid: "",
      title: "",
      content: "",
      crDate: undefined,
      upDate: undefined,
      stared: false,
    };
  }

  return note;
}

// Main component
const Index: React.FC<Props> = ({ onToggleStar }) => {
  const note = useLoaderData<Note | undefined>();

  // State management
  const [formNote, setFormNote] = useState(note);
  const [initNote, setInitnote] = useState(note);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    document.title =
      initNote.title === ""
        ? "Create New - RedNotes"
        : initNote.title + " - RedNotes";
    setFormNote(note);
    setInitnote(note);
  }, [note]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormNote({
      ...formNote,
      [name]: value,
    });
  };

  const formstate = async () => {
    if (formNote.noteid === "") {
      setEditing(true);
    }
  };

  useEffect(() => {
    formstate();
  }, [formNote.noteid]);

  const toggltEdit = () => {
    if (editing) {
      setFormNote(initNote);
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  useEffect(() => {
    const refContentArea = document.getElementsByName(
      "content"
    )[0] as HTMLTextAreaElement | null;
    if (refContentArea) {
      refContentArea.style.height = "auto";
      refContentArea.style.height = `${refContentArea.scrollHeight}px`;
    }
  });

  useEffect(() => {
    const notetitle = document.getElementsByName(
      "title"
    )[0] as HTMLTextAreaElement | null;
    if (notetitle) {
      const adjustHeight = () => {
        notetitle.style.height = "auto";
        notetitle.style.height = `${notetitle.scrollHeight}px`;
      };
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
          event.preventDefault();
          const nextElement = document.getElementsByName(
            "content"
          )[0] as HTMLTextAreaElement | null;
          if (nextElement) {
            nextElement.focus();
          }
        }
      };
      notetitle.addEventListener("input", adjustHeight);
      notetitle.addEventListener("keydown", handleKeyDown);
      adjustHeight();
      return () => {
        notetitle.removeEventListener("input", adjustHeight);
        notetitle.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  const fetcher = useFetcher();
  const handleSubmit = () => {
    fetcher.submit(
      {
        noteid: formNote.noteid,
        title: formNote.title,
        content: formNote.content,
      },
      { method: "post" }
    );
  };

  const navi = useNavigate();

  return (
    <>
      <form method="POST" className="gap-y-4 grid">
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
              className="hover:bg-gray-700 transition-color hover:duration-100 group rounded-lg p-3.5 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-accent hover:scale-105 align-middle transition-color duration-100 ease-in"
            >
              {editing === false ? (
                <EditBoxLine className="w-6 h-6" />
              ) : (
                <EraserLineIcon className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              disabled={formNote === initNote}
              className="enabled:hover:bg-accent enabled:bg-gray-900 disabled:hover:bg-gray-600 transition-color hover:duration-100 rounded-lg p-3.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in"
            >
              {loading ? <Loading /> : <Save className="w-6 h-6" />}
            </button>
          </div>
        </div>
        <textarea
          placeholder="Note Title"
          name="title"
          className="text-2xl font-semibold w-full antialiased px-4 py-3.5 focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-none"
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
    </>
  );
};

export default Index;

// Define and export the action function to handle form submission and note creation/updating
export const action: ActionFunction = async ({ request }) => {
  // Extract form data from the request
  const formData = await request.formData();
  const noteid =
    formData.get("noteid") === "" ? (nanoid(8) as string) : (formData.get("noteid") as string);
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  // Log data to server console
  console.log({ noteid, title, content });

  try {
    // Upsert the note in the database
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
    });
    // Redirect to the note view page with the noteid as a URL parameter
    return redirect("/noteview/?id=" + updatedNote.noteid);
  } catch (error) {
    // Return an error response if the upsert fails
    return json({ error }, { status: 500 });
  }
};
