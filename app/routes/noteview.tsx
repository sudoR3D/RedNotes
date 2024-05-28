//import { Link, redirect } from '@remix-run/react'
//const NoteID = "testID";
//export default function NoteView(NoteID) {
//    return (
//        <>
//            <form method="POST">
//                <input type="hidden" name="id" value={NoteID.id} />
//                <input type="text" name="title" id="title" />
//                <textarea name="content" id="content" />
//                <button type="submit">Save</button>
//            </form>
//        </>
//    );
//}
//export async function loader() {
//
//    return (
//        <></>
//    );
//}
//export const action = async ({ request }) => {
//    const formdata = await request.formData()
//    const title = formdata.get('title')
//    const content = formdata.get('content')
//
//    const datas = { title, content }
//    console.log(datas)
//    return redirect('/view?id=' + title)
//}

// routes/user.tsx
import { LoaderFunction, ActionFunction, json, redirect } from '@remix-run/node';
import { prisma } from '~/_tools/prisma.server'; // Adjust the import based on your project structure
import { useLoaderData, Form } from '@remix-run/react';
import { useTransition } from 'react';

// Loader to fetch user data
export const loader: LoaderFunction = async ({ params }) => {
  const note = await prisma.notes.findUnique({
    where: { noteid: params.id }
  });
  console.log(params.id)
  return json(note)
};

// Action to update user data
//export const action: ActionFunction = async ({ request }) => {
//  const formData = await request.formData();
//  const id = formData.get('id') as string;
//  const name = formData.get('name') as string;
//  const email = formData.get('email') as string;
//
//  await prisma.user.update({
//    where: { id: parseInt(id) },
//    data: { name, email }
//  });
//
//  return redirect(`/user/${id}`);
//};

//export default function UserForm() {
//  const note_ = useLoaderData();
//  //const transition = useTransition();
//  const isUpdating = useTransition().state === 'submitting';
//
//  return (
//    <div>
//      <h1>User Details</h1>
//      <Form method="post">
//        <input type="hidden" name="id" defaultValue={note_.noteid} />
//        <div>
//          <label>
//            Name:
//            <input type="text" name="name" defaultValue={note_.title} readOnly={!isUpdating} />
//          </label>
//        </div>
//        <div>
//          <label>
//            Email:
//            <input type="email" name="email" defaultValue={note_.content} readOnly={!isUpdating} />
//          </label>
//        </div>
//        <div>
//          <button type="button" onClick={() => setEditing(true)} disabled={isUpdating}>Edit</button>
//          {isUpdating && <button type="submit">Save</button>}
//        </div>
//      </Form>
//    </div>
//  );
//}
//