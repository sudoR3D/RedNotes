//Dependencies
import React from "react";
import { json, LoaderFunction, ActionFunction } from "@remix-run/node";
import { Link, redirect, useLoaderData, MetaFunction } from "@remix-run/react";
//Components
//import NoteArch from "~/comp/archive";
//import { Notes_List } from "~/_tools/getList.server";
import type { Notes } from "@prisma/client";
import { format } from "date-fns";
import { prisma } from "~/_tools/prisma.server";
//import ToggleStarButton from "~/comp/togglestar";
import ToggleStarButton from "~/comp/startoggle"
//import { ToggleStarButton } from '~/comp/startoggle';
//data type
type LoaderData = {
  notes: Notes[]
}
//Meta inject
export const meta: MetaFunction = () => {
  return [
    { title: "Notes by sudoRED w/ Remix & npm" },
  ];
};
//Load data
export const loader: LoaderFunction = async () => {
  const GetNotesList = () => prisma.notes.findMany();
  const data: LoaderData = { notes: await GetNotesList() }
  return json(data)
}
interface NoteProps {
  //note: { noteid: string; title: string; crDate: string; stared: boolean };
  onToggleStar: (updatedNote: { noteid: string; stared: boolean }) => void;
}


//Index layout
const Index: React.FC<NoteProps> = ({ onToggleStar }) => {
  const { notes } = useLoaderData<LoaderData>()
  return (
    <>
      {notes.map(note => (
        <div className="w-full md:w-[704px] xl:w-[820px] lg:w-[820px] justify-between flex my-1 hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg">
          <ToggleStarButton
            noteId={note.noteid}
            stared={note.stared}
            onToggle={onToggleStar}
          />
          <Link className="w-full flex justify-between antialiased text-wrap px-4 py-3" to={'/noteview/?id=' + note.noteid}>
            <div className="inline-flex">
              <p className="text-lg text-wrap line-clamp-1">{note.title}</p>
            </div>
            <div className="inline-flex min-w-fit items-center">
              <p className="min-w-min inline-flex">{format(note.crDate, 'MMM dd, yyyy')}</p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
export default Index;

//Action to hendel toggle star
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const noteId = formData.get("noteid");

  if (typeof noteId !== "string") {
    return json({ error: "Invalid note ID" }, { status: 400 });
  }

  const note = await prisma.notes.findUnique({ where: { noteid: noteId } });

  if (!note) {
    return json({ error: "Note not found" }, { status: 404 });
  }

  const updatedNote = await prisma.notes.update({
    where: { noteid: noteId },
    data: { stared: !note.stared },
  });

  return redirect("/"); // Redirect to the desired route after the action is performed
};