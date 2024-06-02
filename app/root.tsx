// Package Dependencies
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";

// Component Dependencies
import stylesheet from "~/tailwind.css?url";
import NavMenu from "./comp/navmenu";

// Add Stylesheet
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

// Document Layout Component
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans body-back bg-fixed">
        <div className="bg-zinc-800 bg-opacity-95 h-full min-h-screen">
          <NavMenu />
          {children}
          <ScrollRestoration />
          <Scripts />
        </div>
      </body>
    </html>
  );
}

// Main App Component
export default function App() {
  return (
    <div className="py-[5.4rem] justify-center text-zinc-300 flex px-8">
      <div className="grid w-full md:w-[704px] xl:w-[820px] lg:w-[820px]">
        <Outlet />
      </div>
    </div>
  );
}
