//Packge Dependencies 
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
//Component Dependencies
import stylesheet from "~/tailwind.css?url";
import NavMenu from "./comp/navmenu";

//Add Stylysheet
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

//Document Layout
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body className="font-sans body-back">
        <div className=" bg-zinc-800 bg-opacity-95 h-screen">
          <NavMenu />
          <div className="pt-[5.3rem] flex justify-center text-zinc-300 w-full md:w-[704px] xl:w-[820px] lg:w-[820px] px-8">
            <div className="grid w-full">
              {children}
            </div>
          </div>
          <ScrollRestoration />
          <Scripts />
        </div>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
