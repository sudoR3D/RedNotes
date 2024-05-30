import React from "react"
export default function Loading() {
    return (
        <div className="relative" >
            <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
            <div className="w-6 h-6 bg-slate-300 rounded-full absolute top-0 left-0 animate-ping"></div>
            <div className="w-6 h-6 bg-slate-300 rounded-full absolute top-0 left-0 animate-pulse"></div>
        </div>
    )
}