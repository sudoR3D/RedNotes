//Dependencies
import { useLocation, Link, redirect, useNavigation } from "@remix-run/react";
import ArrowLeftSLine from "remixicon-react/ArrowLeftSLineIcon";
import AddLineIcon from "remixicon-react/AddLineIcon";
import Loading from "./loading";
export default function NavMenu() {
    return (
        <nav className="z-50 fixed top-0 w-full font-medium justify-center flex items-center px-8 bg-neutral-900 shadow-md shadow-zinc-900">
            <div className="w-full md:w-[704px] xl:w-[820px] lg:w-[820px] flex justify-between">
                <div className="transition duration-100 hover:text-accent hover:scale-[1.05] text-red-600 inline-flex text-[2.5rem] cursor-pointer items-center">
                    <img src="/logo.webp" alt="RedNotes" className=" h-[52px] w-[52px]" />
                    <h1 className="font-Kayak tracking-wide pt-1 content-center pl-3">RedNotes</h1>

                    {useNavigation().state !== "idle" ?
                        <div className="mx-4">
                            <Loading />
                        </div> : null}
                </div>
                <div className="inline-flex">
                    {useLocation().pathname !== "/" ?
                        <Link className="flex antialiased py-3 " to={'/'}>
                            <div className="inline-flex px-5 py-2.5 hover:bg-accent rounded-lg align-middle transition-color duration-75 ease-in">
                                <ArrowLeftSLine className=" w-7 h-7 text-gray-100 " />
                                <p className="text-xl pl-1 text-gray-100">Back</p>
                            </div>
                        </Link>
                        : null}
                    <Link className="flex antialiased py-3  ml-2" to={'/noteview'}>
                        <div className="inline-flex px-5 py-2.5 hover:bg-accent rounded-lg align-middle transition-color duration-75 ease-in">
                            <AddLineIcon className=" w-7 h-7 text-gray-100" />
                            <p className="text-xl pl-1 text-gray-100">New</p>
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    )
}