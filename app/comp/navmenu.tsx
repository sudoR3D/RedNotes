import Loading from "./loading"
import { useNavigation } from "@remix-run/react"
export default function NavMenu() {
    return (
        <nav className="z-50 fixed top-0 w-full font-medium justify-center flex items-center px-8 bg-neutral-900 shadow-md shadow-zinc-900 pb-1">
            <div className="w-full md:w-[704px] xl:w-[820px] lg:w-[820px]">
                <div className="transition duration-100 hover:text-accent hover:scale-[1.05] text-red-600 inline-flex text-[2.5rem] justify-center align-middle cursor-pointer items-center">
                    <img src="/logo.webp" alt="RedNotes" className=" h-[52px] w-[52px] align-middle" />
                    <h1 className="font-Kayak tracking-wide pt-1 content-center pl-3">RedNotes</h1>
                    {useNavigation().state === "loading" ?
                        <Loading /> : null}
                </div>
            </div>
        </nav>
    )
}