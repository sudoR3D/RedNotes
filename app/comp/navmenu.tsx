// Import necessary dependencies
import React from "react";
import { useLocation, Link, useNavigation } from "@remix-run/react";
import ArrowLeftSLine from "remixicon-react/ArrowLeftSLineIcon";
import AddLineIcon from "remixicon-react/AddLineIcon";
import Loading from "./loading";

// Define and export the NavMenu component
export default function NavMenu() {
    // Get the current location and navigation state
    const location = useLocation();
    const navigation = useNavigation();

    return (
        // Navigation bar container
        <nav className="z-50 fixed top-0 w-full justify-center flex items-center px-8 bg-neutral-900 shadow-md shadow-zinc-900">
            <div className="w-full md:w-[704px] xl:w-[820px] lg:w-[820px] flex justify-between">
                {/* Logo and title */}
                <div className="transition duration-100 hover:text-accent hover:scale-[1.05] inline-flex cursor-pointer items-center">
                    <img src="/logo.webp" alt="RedNotes" className="h-[52px] w-[52px]" />
                    <h1 className="text-4xl text-accent font-Kayak tracking-wide pt-1 content-center pl-3">RedNotes</h1>
                    {/* Display loading indicator if navigation state is not idle */}
                    {navigation.state !== "idle" ? (
                        <div className="mx-4">
                            <Loading />
                        </div>
                    ) : null}
                </div>
                {/* Navigation links */}
                <div className="inline-flex text-gray-100 gap-x-4">
                    {/* Back button, shown only if the current path is not the root */}
                    {location.pathname !== "/" ? (
                        <Link className="my-3 p-2.5 hover:bg-accent hover:scale-105 rounded-lg align-middle transition-color duration-100 ease-in" to="/">
                            <ArrowLeftSLine className="w-7 h-7" />
                        </Link>
                    ) : null}
                    {/* Add note button */}
                    <Link className="my-3 p-2.5 hover:bg-accent hover:scale-105 rounded-lg align-middle transition-color duration-100 ease-in" to="/noteview">
                        <AddLineIcon className="w-7 h-7" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
