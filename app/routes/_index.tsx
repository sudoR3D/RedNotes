// Dependencies
import React from "react"
import { json, LoaderFunction, ActionFunction } from "@remix-run/node"
import { Link, useLoaderData, MetaFunction } from "@remix-run/react"
import type { Notes } from "@prisma/client"
import { format } from "date-fns"
import { notedb } from "~/comp/prisma.server"
import ToggleStarButton from "~/comp/togglestar"
import ArrowLeftSLineIcon from "remixicon-react/ArrowLeftSLineIcon"
import ArrowRightSLineIcon from 'remixicon-react/ArrowRightSLineIcon'

//Data type for loader
type LoaderData = {
  notes: Notes[]
  pagecount: number
  totalsize: number
  page: number
  listindex: number
}

//Props for Index
interface Props {
  onToggleStar: (updatedNote: { noteid: string; stared: boolean }) => void
}

//Inject meta
export const meta: MetaFunction = () => {
  return [
    { title: "Notes by sudoRED w/ Remix" },
  ]
}

//Loader
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const listsize = parseInt('10')
  const GetNotesList = () => notedb.notes.findMany({
    orderBy: [{
      crDate: 'desc'
    }],
    skip: (page - 1) * listsize,
    take: listsize
  })
  const totalsize = await notedb.notes.count()
  const pagecount = Math.ceil(totalsize / listsize)
  const listindex = (Math.ceil((page - 1) * listsize + 1)) + ' - ' + (Math.ceil(page * listsize))
  const notes = await GetNotesList()
  return json({ notes, pagecount, totalsize, page, listindex })
}

//Index
const Index: React.FC<Props> = ({ onToggleStar }) => {
  const { notes, pagecount, totalsize, page, listindex } = useLoaderData<LoaderData>()  // Get data from loader

  return (
    <>
      <ul>
        {notes.map(note => (
          <li key={note.noteid} className="w-full md:w-[704px] xl:w-[820px] lg:w-[820px] flex my-2 hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg">
            <ToggleStarButton
              noteId={note.noteid}
              stared={note.stared}
              onToggle={onToggleStar}
            />
            <Link className="w-full flex justify-between antialiased text-wrap px-4 py-3 h-12" to={'/noteview/?id=' + note.noteid}>
              <div className="inline-flex items-center">
                <p className="text-lg text-wrap line-clamp-1">{note.title}</p>
              </div>
              <div className="xm:inline-flex items-center hidden min-w-32 justify-end" >
                <p className="inline-flex ml-4">{format(new Date(note.crDate), 'MMM dd, yyyy')}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="w-full md:w-[704px] xl:w-[820px] lg:w-[820px] flex my-3 hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg">

        <div className="w-full flex justify-between antialiased text-wrap px-4 py-6 my-4 h-12">
          <div className="inline-flex items-center">
            <p className="text-lg text-wrap line-clamp-1">Page {page} of {pagecount}</p>
          </div>
          <div className="inline-flex items-center">
            <p className="text-lg text-wrap line-clamp-1">Showing notes {listindex} of {totalsize}</p>
          </div>
          <div className="gap-x-3 xm:inline-flex items-center hidden min-w-32 justify-end" >
            {page > 1 ?
              <Link className="my-3 p-2.5 hover:bg-accent hover:scale-105 rounded-lg align-middle transition-color duration-100 ease-in" to={'/?page=' + (page - 1)}>
                <ArrowLeftSLineIcon className="w-7 h-7" />
              </Link> : null}
            {page < pagecount ?
              <Link className="my-3 p-2.5 hover:bg-accent hover:scale-105 rounded-lg align-middle transition-color duration-100 ease-in" to={'/?page=' + (page + 1)}>
                <ArrowRightSLineIcon className="w-7 h-7" />
              </Link> : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
