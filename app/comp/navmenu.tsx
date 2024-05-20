import Loading from "./loading"
import { useNavigation } from "@remix-run/react"
export default function NavMenu() {
    return (
        <nav className="z-50 fixed top-0 w-full 3x1 font-medium justify-center flex items-center py-3 px-8 bg-zinc-900 shadow-md shadow-zinc-900">
            <div className="w-full md:w-[704px] xl:w-[820px] lg:w-[820px]">
                <div className="transition duration-100 hover:scale-[1.05] inline-flex text-3xl justify-center align-middle cursor-pointer items-center">
                    <img src="/logo.webp" alt="RedNotes" className=" h-[44px] w-[44px] align-middle" />
                    <h1 className=" font-Kayak text-accent tracking-normal content-center pl-3">RedNotes</h1>
                    {useNavigation().state === "loading" ?
                        <Loading /> : null}
                </div>
            </div>
        </nav>
    )
}