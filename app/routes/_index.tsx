// Dependencies
import React from "react";
import { json, LoaderFunction, ActionFunction } from "@remix-run/node";
import { Link, useLoaderData, MetaFunction } from "@remix-run/react";
import type { Notes } from "@prisma/client";
import { format } from "date-fns";
import { notedb } from "~/_tools/prisma.server";
import ToggleStarButton from "~/comp/startoggle";

//Data type for loader
type LoaderData = {
  notes: Notes[];
};

//Props for Index
interface Props {
  onToggleStar: (updatedNote: { noteid: string; stared: boolean }) => void;
}

//Inject meta
export const meta: MetaFunction = () => {
  return [
    { title: "Notes by sudoRED w/ Remix" },
  ];
};

//Loader
export const loader: LoaderFunction = async () => {
  const GetNotesList = () => notedb.notes.findMany({
    orderBy: [{
      crDate: 'desc'
    }]
  });
  const data: LoaderData = { notes: await GetNotesList() };
  return json(data);
};

//Index
const Index: React.FC<Props> = ({ onToggleStar }) => {
  const { notes } = useLoaderData<LoaderData>(); // Get data from loader

  return (
    <>
      {notes.map(note => (
        <div key={note.noteid} className="w-full md:w-[704px] xl:w-[820px] lg:w-[820px] flex my-1 hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg">
          <ToggleStarButton
            noteId={note.noteid}
            stared={note.stared}
            onToggle={onToggleStar}
          />
          <Link className="w-full flex justify-between antialiased text-wrap px-4 py-3" to={'/noteview/?id=' + note.noteid}>
            <div className="inline-flex">
              <p className="text-lg text-wrap line-clamp-1">{note.title}</p>
            </div>
            <div className="xm:inline-flex items-center hidden">
              <p className="min-w-min inline-flex">{format(new Date(note.crDate), 'MMM dd, yyyy')}</p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Index;

//Action
//export const action: ActionFunction = async ({ request }) => {
//  const formData = await request.formData();
//  const noteId = formData.get("noteid");
//
//  if (typeof noteId !== "string") {
//    return json({ error: "Invalid note ID" }, { status: 400 });
//  }
//
//  const note = await notedb.notes.findUnique({ where: { noteid: noteId } });
//
//  if (!note) {
//    return json({ error: "Note not found" }, { status: 404 });
//  }
//
//  const updatedNote = await notedb.notes.update({
//    where: { noteid: noteId },
//    data: { stared: !note.stared },
//  });
//
//  return json({ ok: true });
//};
