//import NoteList from "./getNotes";
//import axios from "axios";
const NoteList = [{
    "noteid": "6639181ddfcda0086b04c4b2",
    "title": "Aliquip proident amet officia aliquip ullamco ea est excepteur culpa et dolor esse.",
    "isStared": false,
    "content": "Esse nulla ipsum cupidatat ad magna dolor magna. Pariatur est culpa irure id aliquip. Commodo dolore dolor nostrud cupidatat magna. Elit veniam incididunt aute enim amet Lorem in adipisicing occaecat. Laborum nulla eiusmod fugiat ut mollit qui enim sit fugiat aliquip consectetur duis Lorem reprehenderit."
},
{
    "noteid": "6639181d4e966a0fa3b1f781",
    "title": "Ex dolore sint esse labore commodo nostrud amet tempor aliquip occaecat officia dolore qui in.",
    "isStared": true,
    "content": "Nostrud tempor non magna laborum culpa laborum aliquip sint ex. Amet nisi amet incididunt culpa adipisicing eu amet ex pariatur qui anim incididunt consequat. Amet anim ipsum commodo eiusmod Lorem magna laborum aliqua esse dolore. Minim adipisicing consequat aute magna. Velit ut cillum id ea qui."
},
{
    "noteid": "6639181d8879f3a342ce0e9e",
    "title": "Cupidatat voluptate et aliquip ipsum sint aliqua laborum Lorem magna nostrud incididunt.",
    "isStared": true,
    "content": "Minim labore veniam quis ipsum occaecat est reprehenderit sint esse do. Elit pariatur laborum dolore in pariatur sit pariatur eu cupidatat laborum deserunt aliquip. Quis pariatur quis id quis sint id magna ullamco adipisicing tempor dolor. Minim elit et non nulla in enim nostrud irure ea qui. Eiusmod sit sit ex consequat."
},
{
    "noteid": "6639181d389faa1cf4d2c39d",
    "title": "Incididunt exercitation ad sunt reprehenderit pariatur ipsum voluptate sint velit laborum nisi qui.",
    "isStared": false,
    "content": "Velit eu commodo aliqua ipsum fugiat eiusmod ad culpa deserunt ea occaecat ex elit. Aute amet deserunt cupidatat qui irure magna sunt velit excepteur. Adipisicing excepteur elit duis occaecat esse laborum cillum ex aute labore et enim enim. Irure eu sit cupidatat amet. Reprehenderit nisi incididunt id fugiat ex veniam."
},
{
    "noteid": "6639181d693f223e86806d4f",
    "title": "Officia nisi duis ut exercitation.",
    "isStared": true,
    "content": "Labore qui aute sunt tempor pariatur et nulla cupidatat exercitation ad eu fugiat nisi. Adipisicing ad ipsum pariatur magna mollit. Cupidatat amet velit do labore. Adipisicing ipsum occaecat eiusmod ex commodo sint elit et. Occaecat excepteur ad sunt Lorem mollit aliquip et ea reprehenderit et eiusmod."
},
{
    "noteid": "6639181d8fd3ccc252a40d99",
    "title": "Sunt deserunt eiusmod commodo proident qui.",
    "isStared": true,
    "content": "Lorem id eiusmod aliquip minim ea aliquip ex cupidatat incididunt exercitation pariatur minim. Ex anim est non ea dolore eiusmod officia ipsum elit minim. Esse ullamco nostrud aliquip incididunt officia enim veniam duis aliqua sunt officia labore pariatur. Cupidatat et non aute ullamco laborum qui adipisicing cupidatat voluptate non commodo incididunt commodo. Reprehenderit duis laboris sint in ea sit."
},
{
    "noteid": "6639181d007179ee42a222e7",
    "title": "Esse aute tempor tempor exercitation velit cupidatat veniam dolor.",
    "isStared": true,
    "creationDate": {
        "dd": "23",
        "mm": "10",
        "yyyy": "2024"
    },
    "content": "Esse Lorem in est deserunt. Esse et eu cillum fugiat exercitation Lorem dolor incididunt occaecat officia. Mollit pariatur aliquip sint veniam deserunt dolor nisi proident exercitation. Reprehenderit cillum commodo eu tempor do. Sint in ea aliqua minim ut nulla quis minim."
}];
//Dependencies
import { Link, redirect, useLoaderData } from "@remix-run/react";
import StarSmileLineIcon from "remixicon-react/StarSmileLineIcon";
import StarSmileFillIcon from "remixicon-react/StarSmileFillIcon";
//Components
//import { Notes_List } from "./getNoteList";

export default function Notetiles(Notes_List) {
    //const LoadList = useLoaderData<typeof loader>();
    return (
        <>
            {NoteList.map(note => (
                //LoadList.map(note => (
                //Notes_List.map(note => (
                <div className="md:w-[704px] xl:w-[820px] lg:w-[820px] hover:scale-[1.01] hover:duration-150">
                    <div className="flex my-1.5">
                        <form className="inline-flex items-center" action="/" method="post">
                            <input type="hidden" value={note.noteid} />
                            {note.isStared ?
                                <button type="submit" className="p-3.5 bg-accent hover:bg-red-700 transition hover:duration-100 group rounded-l-lg">
                                    <StarSmileLineIcon className=" group-hover:block hidden hover:duration-100" />
                                    <StarSmileFillIcon className=" group-hover:hidden block hover:duration-100" />
                                </button> :
                                <button type="submit" className="p-3.5 bg-gray-900 hover:bg-red-700 transition hover:duration-100 group rounded-l-lg">
                                    <StarSmileLineIcon className=" group-hover:hidden block hover:duration-100" />
                                    <StarSmileFillIcon className=" group-hover:block hidden hover:duration-100" />
                                </button>
                            }
                        </form>
                        <Link className="w-full flex justify-between antialiased text-wrap bg-neutral-900 px-6 py-3 rounded-r-lg" to={'/' + note.noteid}>
                            <div className="inline-flex">
                                <p className="text-lg text-wrap line-clamp-1">{note.title}</p>
                            </div>
                            <div className="inline-flex min-w-fit items-center">
                                <p className="min-w-min inline-flex">"note.creationDate"</p>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </>
    )
};


//import { json } from "@remix-run/node";
//import { db } from "./db.server";
//export const loader = async () => {
//    return json({ ok: true });
//}

//export async function loader() {
//    return json(await db.notes.findMany());
//}

//export default function ListNote() {
//    const data = useLoaderData<typeof loader>();
//    return (
//        <>
//            <ul>
//                {data.map((notedata) => (
//                    <li>{notedata.title}</li>
//                ))}
//            </ul>
//        </>
//    )
//}