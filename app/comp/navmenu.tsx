import Loading from "./loading"
import { useNavigation, useLocation, Link, redirect } from "@remix-run/react"
import ArrowLeftSLine from "remixicon-react/ArrowLeftSLineIcon";

export default function NavMenu() {
    return (
        <nav className="z-50 fixed top-0 w-full font-medium justify-center flex items-center px-8 bg-neutral-900 shadow-md shadow-zinc-900 pb-1">
            <div className="w-full md:w-[704px] xl:w-[820px] lg:w-[820px] flex justify-between">
                <div className="transition duration-100 hover:text-accent hover:scale-[1.05] text-red-600 inline-flex text-[2.5rem] cursor-pointer items-center">
                    <img src="/logo.webp" alt="RedNotes" className=" h-[52px] w-[52px]" />
                    <h1 className="font-Kayak tracking-wide pt-1 content-center pl-3">RedNotes</h1>
                    {useNavigation().state !== "idle" ?
                        <Loading /> : null}
                </div>
                {useLocation().pathname !== "/" ?
                    <div className="transition duration-100 hover:text-accent hover:scale-[1.05] text-red-600 text-[2.5rem] cursor-pointer inline-flex">
                        <Link className="flex antialiased py-3 group" to={'/'}>
                            <div className="inline-flex px-5 py-2.5 group-hover:bg-gray-900 rounded-md align-middle">
                                <ArrowLeftSLine className=" w-7 h-7 text-gray-100 group-hover:text-accent transition duration-100" />
                                <p className="text-lg text-gray-100 group-hover:text-accent transition duration-100">Back</p>
                            </div>
                        </Link>
                    </div> : null}
            </div>
        </nav>
    )
}