import bcrypt from 'bcryptjs'
import { notedb } from '~/comp/prisma.server'
import { nanoid } from 'nanoid'
import { json, createCookieSessionStorage, redirect } from '@remix-run/node'



const sessionsecret = process.env.SESSION_SECRET as string
const passsalt = process.env.PASS_SALT as string

if (!passsalt || !sessionsecret) {
    throw new Error('.env veriable not set')
}

const storage = createCookieSessionStorage({
    cookie: {
        name: 'RedNotes login data',
        secure: false,//process.env.NODE_ENV === 'production',
        secrets: [sessionsecret],
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
    },
})
export async function createSession(userid: string, returnto: string) {
    const session = await storage.getSession()
    session.set('userid', userid)
    const tourl = returnto === 'null' ? '/' : returnto
    console.log(tourl)
    return redirect(tourl, {
        headers: {
            'Set-Cookie': await storage.commitSession(session)
        }
    })
}

export async function login({ email, pass, returnto }) {
    const getUser = await notedb.users.findUnique({
        where: { email }
    })
    if (!getUser) {
        console.log('email error while logging in')
        return json({ error: 'No user found' }, { status: 400 })
    }
    if (!(await bcrypt.compare(pass, getUser.passHash))) {
        console.log('password error while logging in')
        return json({ error: 'Wrong password' }, { status: 400 })
    } else {
        console.log('login success')
        return createSession(getUser.userid, returnto)
    }


}

export async function signup({ email, pass, fname, lname }) {
    const exist = await notedb.users.findUnique({
        where: { email: email }
    })
    if (exist !== null) {
        console.log('email exist on signup')
        return json({ error: 'User email already exist' }, { status: 400 })
    }

    const genHash = await bcrypt.hash(pass, 10)
    console.log(genHash)
    const newUser = await notedb.users.create({
        data: {
            userid: nanoid(10),
            email: email,
            passHash: genHash,
            nFirst: fname,
            nLast: lname,
        }
    })
    if (!newUser) {
        console.log('database error on signup')
        return json({
            error: 'Error creating new user',
            fields: { email: email, pass: pass }
        }, {
            status: 400
        })
    }
    console.log('signup success')
    return createSession(newUser.userid, '/')
}

//check for logged in user, redirect if not found
export async function checkSession(request: Request, redir: boolean) {
    const getcookie = await getSession(request)
    const userid = getcookie.get('userid') as string
    if (redir && (!userid || typeof userid !== 'string')) {
        const url = new URL(request.url)
        const from = url.pathname + url.search
        throw redirect('/login/?to=' + from)
    }
    return userid
}


//get loggedin user id only
//export async function getUserId(request: Request) {
//    const session = await getSession(request)
//    const userid = session.get('userid')
//    if (!userid || typeof userid !== 'string') return null
//    return userid
//}
//distroy session and redirect to login screen
export async function logout(request: Request) {
    const session = await getSession(request)
    return redirect('/login', {
        headers: {
            'Set-Cookie': await storage.destroySession(session)
        }
    })
}

//check if user is the owner
export async function canEdit(noteid: string, request) {
    const reqUserId = await checkSession(request, true)
    const note = await notedb.notes.findUnique({
        where: { noteid: noteid },
        select: { ownerid: true }
    })
    if (!note) {
        throw new Error('Note not avilable')
    }
    if (reqUserId !== null && note?.ownerid === reqUserId) {
        return true
    }
    return logout(request)
}


function getSession(request: Request) {
    return storage.getSession(request.headers.get('Cookie'))
}