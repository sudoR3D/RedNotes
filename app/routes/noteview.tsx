import { Link, redirect } from '@remix-run/react'
const NoteID = "testID";
export default function NoteView(NoteID) {
    return (
        <>
            <form method="POST">
                <input type="hidden" name="id" value={NoteID.id} />
                <input type="text" name="title" id="title" />
                <textarea name="content" id="content" />
                <button type="submit">Save</button>
            </form>
        </>
    );
}
export async function loader() {

    return (
        <></>
    );
}
export const action = async ({ request }) => {
    const formdata = await request.formData()
    const title = formdata.get('title')
    const content = formdata.get('content')

    const datas = { title, content }
    console.log(datas)
    return redirect('/view?id=' + title)
}