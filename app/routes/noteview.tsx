import { useLoaderData, MetaFunction } from "@remix-run/react";
import { notedb } from "~/_tools/prisma.server";
import { customAlphabet } from "nanoid";
import { Save } from "lucide-react";
import ToggleStarButton from "~/comp/startoggle";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import React from "react";
import { da } from "date-fns/locale/da";
import { DateToSystemTimezoneSetter } from "node_modules/date-fns/parse/_lib/Setter";
const nanoid = customAlphabet('1234567890abcdef', 8)

interface Props {
  onToggleStar: (updatedNote: { noteid: string; stared: boolean }) => void;
}
interface Note {
  noteid: string;
  title: string;
  crDate: Date;
  upDate: Date;
  content: string;
  stared: boolean;
}
interface NewNote {
  noteid: string;
  title: string;
  content: string;
  crDate: string | undefined;
  stared: boolean;
}
export async function loader({ request }) {
  const url = new URL(request.url)
  const reqid = url.searchParams.get('id')
  let note: Note | NewNote | null = null;

  reqid !== null ?
    note = await notedb.notes.findUnique({
      where: { noteid: reqid },
    }) :
    note = {
      noteid: "",
      title: "",
      content: "",
      crDate: undefined,
      stared: false,
    };
  return note
};

const Index: React.FC<Props> = ({ onToggleStar }) => {
  const note = useLoaderData<Note | NewNote | undefined>();
  const [title, setTitle] = useState(note.title || "")
  const [content, setContent] = useState(note.content || "")
  const [stared, setStared] = useState(note.stared)

  useEffect(() => {
    setTitle(note.title || "");
    setContent(note.content || "");
    setStared(note.stared);
  }, [note]);

  useEffect(() => {
    document.title = note.noteid === "" ? "Create New - RedNotes" : note.title + " - RedNotes";
  }, [note]);

  useEffect(() => {
    const textarea = document.getElementsByName('title')[0] as HTMLTextAreaElement | null;
    if (textarea) {
      const adjustHeight = () => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      };
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          const nextElement = document.getElementsByName('content')[0] as HTMLTextAreaElement | null;
          if (nextElement) {
            nextElement.focus();
          }
        }
      };
      textarea.addEventListener('input', adjustHeight);
      textarea.addEventListener('keydown', handleKeyDown);
      adjustHeight();
      return () => {
        textarea.removeEventListener('input', adjustHeight);
        textarea.removeEventListener('keydown', handleKeyDown);
      };
    }
  },
    []);
  return (
    <>
      <form method="post" className="gap-y-4 grid">
        <div className="mt-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-x-4">
            <ToggleStarButton
              noteId={note.noteid}
              stared={note.stared}
              onToggle={onToggleStar}
            />
            <p className="min-w-min inline-flex text-lg">{note.crDate !== undefined ? format(note.crDate, 'MMM dd, yyyy') : null}</p>
          </div>
          <div className="inline-flex gap-x-4">
            <button type="reset" className="hover:bg-gray-900 transition-color hover:duration-100 group rounded-lg p-3.5 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-accent hover:scale-105 align-middle transition-color duration-100 ease-in">Cancel</button>
            <button type="submit" className="hover:bg-red-700 bg-gray-900 transition-color hover:duration-100 group rounded-lg p-3.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-accent hover:scale-105 align-middle transition-color duration-100 ease-in">
              <Save className="w-6 h-6" />
            </button>
          </div>
        </div>
        <textarea
          placeholder="Note Title"
          name="title"
          className="text-2xl font-semibold w-full antialiased px-4 py-3.5 focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-none"
          value={note.title} rows={1}
          onChange={(e) => setTitle(e.target.value)}>
        </textarea>
        <textarea
          value={note.content}
          placeholder="Add Note Content"
          id="content"
          name="content"
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[40vh] text-lg w-full antialiased px-4 py-3.5 focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-none"></textarea>
        <input type="hidden" name="noteid" value={note.noteid} />
      </form >
    </>
  );
}
export default Index;