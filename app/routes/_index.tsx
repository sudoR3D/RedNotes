//Dependencies
import { json, LoaderFunction, ActionFunction } from "@remix-run/node";
import { Link, redirect, useLoaderData, MetaFunction } from "@remix-run/react";
import StarSmileLineIcon from "remixicon-react/StarSmileLineIcon";
import StarSmileFillIcon from "remixicon-react/StarSmileFillIcon";

//Components
//import NoteArch from "~/comp/archive";
//import { Notes_List } from "~/_tools/getList.server";
import type { Notes } from "@prisma/client";
import { prisma } from "~/_tools/prisma.server";

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



//Index layout
export default function Index() {
  const { notes } = useLoaderData<LoaderData>()
  return (
    <>
      {notes.map(note => (
        <div className="flex my-1.5 md:w-[704px] xl:w-[820px] lg:w-[820px] hover:scale-[1.01] hover:duration-150">
          <form className="inline-flex items-center" method="GET">
            <input type="hidden" value={note.noteid} />
            {note.stared ?
              <button type="submit" className="p-3.5 bg-accent hover:bg-red-700 transition hover:duration-100 group rounded-l-lg">
                <StarSmileLineIcon className=" group-hover:block hidden hover:duration-100" />
                <StarSmileFillIcon className=" group-hover:hidden block hover:duration-100" />
              </button> :
              <button type="submit" className="p-3.5 bg-gray-900 hover:bg-red-700 transition hover:duration-100 group rounded-l-lg">
                <StarSmileLineIcon className=" group-hover:hidden block hover:duration-100" />
                <StarSmileFillIcon className=" group-hover:block hidden hover:duration-100" />
              </button>
            }
          </form>
          <Link className="w-full flex justify-between antialiased text-wrap bg-neutral-900 px-6 py-3 rounded-r-lg" to={'/' + note.noteid}>
            <div className="inline-flex">
              <p className="text-lg text-wrap line-clamp-1">{note.title}</p>
            </div>
            <div className="inline-flex min-w-fit items-center">
              <p className="min-w-min inline-flex">{note.crDate}</p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}


////Action to hendel toggle star
//export const action: ActionFunction = async ({ request }) => {
//  const formData = await request.formData();
//  const noteId = formData.get("noteid");
//
//  if (typeof noteId !== "string") {
//    return json({ error: "Invalid note ID" }, { status: 400 });
//  }
//
//  const note = await db.notes.findUnique({ where: { noteid: parseInt(noteId, 10) } });
//
//  if (!note) {
//    return json({ error: "Note not found" }, { status: 404 });
//  }
//
//  const updatedNote = await db.notes.update({
//    where: { noteid: parseInt(noteId, 10) },
//    data: { stared: !note.stared },
//  });
//
//  return redirect("/"); // Redirect to the desired route after the action is performed
//};
//

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