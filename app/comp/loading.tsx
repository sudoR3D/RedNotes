// Import React library
import React from "react"

// Define and export the Loading component
export default function Loading() {
    return (
        // Container for the loading indicator
        <div className="relative">
            <div className="w-[26px] h-[26px] bg-slate-300 rounded-full"></div>
            <div className="w-[26px] h-[26px] bg-slate-300 rounded-full absolute top-0 left-0 animate-ping"></div>
            <div className="w-[26px] h-[26px] bg-slate-300 rounded-full absolute top-0 left-0 animate-pulse"></div>
        </div>
    )
}
