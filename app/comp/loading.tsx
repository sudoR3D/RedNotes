import React from "react";

//import { useNavigation } from "@remix-run/react"
export default function Loading() {
    return (
        <div className=" ml-6 relative inline-flex">
            <div className="w-8 h-8 bg-accent rounded-full"></div>
            <div className="w-8 h-8 bg-accent rounded-full absolute top-0 left-0 animate-ping"></div>
            <div className="w-8 h-8 bg-accent rounded-full absolute top-0 left-0 animate-pulse"></div>
        </div>
    )
}