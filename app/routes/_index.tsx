// Dependencies
import React from "react"
import { json, LoaderFunction, ActionFunction } from "@remix-run/node"
import { Link, useLoaderData, MetaFunction, useSearchParams } from "@remix-run/react"
import type { Notes } from "@prisma/client"
import { format } from "date-fns"
import { notedb } from "~/comp/prisma.server"
import ToggleStarButton from "~/comp/togglestar"
import ArrowLeft from "remixicon-react/ArrowLeftSLineIcon"
import ArrowRight from 'remixicon-react/ArrowRightSLineIcon'
import { checkSession, getUserId } from "~/comp/auth.server"

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
  const userid = await checkSession(request, true) as string
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const listsize = parseInt('10')

  const GetNotesList = () => notedb.notes.findMany({
    where: { ownerid: userid },
    orderBy: [{
      crDate: 'desc'
    }],
    skip: (page - 1) * listsize,
    take: listsize
  })
  const totalsize = await notedb.notes.count({
    where: { ownerid: userid }
  })
  const pagecount = Math.ceil(totalsize / listsize)
  const listindex = (Math.ceil((page - 1) * listsize + 1)) + ' - ' + (Math.ceil(page * listsize))
  const notes = await GetNotesList()
  return json({ notes, pagecount, totalsize, page, listindex })
}

//Index
const Index: React.FC<Props> = ({ onToggleStar }) => {
  const { notes, pagecount, totalsize, page, listindex } = useLoaderData<LoaderData>()  // Get data from loader
  const [searchParams, setSearchParams] = useSearchParams()
  const changePage = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };
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
            <button
              onClick={() => changePage(page - 1)}
              type="button"
              disabled={page <= 1}
              className="enabled:hover:bg-accent enabled:bg-gray-900 disabled:hover:bg-gray-600 disabled:bg-gray-800 transition-color hover:duration-100 rounded-lg p-3.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => changePage(page + 1)}
              type="button"
              disabled={page >= pagecount}
              className="enabled:hover:bg-accent enabled:bg-gray-900 disabled:hover:bg-gray-600 disabled:bg-gray-800 transition-color hover:duration-100 rounded-lg p-3.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
