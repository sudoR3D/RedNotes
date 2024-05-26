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
      <body className=" bg-zinc-800 font-sans">
        <NavMenu />
        <div className=" mt-[5.5rem] mx-8 mb-7 grid justify-center text-zinc-300">
          {children}
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
