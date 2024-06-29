// Import necessary dependencies
import React from "react"
import { useLocation, Link, useNavigation, useNavigate, useFetcher } from "@remix-run/react"

import AddLineIcon from "remixicon-react/AddLineIcon"
import Loading from "./loading"
import UserLine from 'remixicon-react/UserSmileLineIcon'
import UserFill from 'remixicon-react/UserSmileFillIcon'
import LoginLine from 'remixicon-react/LoginCircleLineIcon'
import LoginFill from 'remixicon-react/LoginCircleFillIcon'
import LogoutLine from 'remixicon-react/LogoutCircleRLineIcon'
import LogoutFill from 'remixicon-react/LogoutCircleRFillIcon'


// Define and export the NavMenu component
export default function NavMenu() {
    const location = useLocation();
    const navi = useNavigation();
    const goto = useNavigate();
    //const user = getUser

    return (
        <nav className="z-50 fixed top-0 w-full justify-center flex items-center md:px-8 px-4 bg-neutral-900 shadow-md shadow-zinc-900">
            <div className="w-full md:w-[704px] xl:w-[820px] lg:w-[820px] flex justify-between">
                <div onClick={() => goto('/')} className="w-16 transition duration-100 hover:text-accent hover:scale-[1.05] inline-flex cursor-pointer items-center">
                    {navi.state !== "idle" ? (
                        <div className="mx-[13px]">
                            <Loading />
                        </div>
                    ) : <img src="/logo.webp" alt="RedNotes" className="h-[52px] w-[52px]" />}
                    <h1 className="text-4xl text-accent font-Kayak tracking-wide pt-1 content-center pl-2">RedNotes</h1>

                </div>
                <div className="inline-flex text-gray-100 gap-x-2 md:gap-x-4">

                    <button
                        onClick={() => goto('noteview')}
                        type="button"
                        className="my-3 hover:bg-accent transition-color enabled:hover:bg-accent enabled:bg-gray-900 disabled:hover:bg-gray-600 disabled:bg-gray-800 transition-color hover:duration-100 rounded-lg p-3.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in"
                    >
                        <AddLineIcon />
                    </button>
                    <button
                        onClick={() => goto('profile')}
                        type="button"
                        className="group my-3 hover:bg-accent transition-color enabled:hover:bg-accent enabled:bg-gray-900 disabled:hover:bg-gray-600 disabled:bg-gray-800 transition-color hover:duration-100 rounded-lg p-3.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in"
                    >
                        <UserFill className="group-hover:block hidden hover:duration-100" />
                        <UserLine className="group-hover:hidden block hover:duration-100" />
                    </button>
                </div>
            </div>
        </nav>
    )
}
