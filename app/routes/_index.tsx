//Dependencies--
import { MetaFunction, json } from "@remix-run/react";

//Components..
import NavMenu from "~/comp/navmenu";
import Notetiles from "~/comp/NoteList";

//Meta inject
export const meta: MetaFunction = () => {
  return [
    { title: "Notes by sudoRED w/ Remix & npm" },
  ];
};

//Index layout
export default function Index() {
  return (
    <>
      <NavMenu />
      <Notetiles />
    </>
  );
}

