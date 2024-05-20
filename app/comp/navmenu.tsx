export default function NavMenu() {
    return (
        <nav className="z-50 fixed top-0 w-full 2x1 justify-center flex items-center py-2.5 px-8 bg-zinc-900 shadow-md shadow-zinc-900">
            <div className="w-full md:w-[704px] xl:w-[820px] lg:w-[820px]">
                <div className="transition duration-100 hover:scale-[1.05] inline-flex text-3xl justify-center align-middle text-red-600 cursor-pointer items-center">
                    <img src="/logo.webp" alt="Red's Notes" className="h-8 w-8 align-middle" />
                    <h1 className="tracking-normal content-center pl-3">RedNotes</h1>
                </div>
            </div>
        </nav>
    )
}