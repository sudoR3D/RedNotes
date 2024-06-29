import { MetaFunction, json, useLoaderData, useFetcher } from "@remix-run/react"
import { LoaderFunction, ActionFunction } from "@remix-run/node"
import { useState } from "react"
import { checkSession, logout } from "~/comp/auth.server"
import { notedb } from "~/comp/prisma.server"
import React from "react"
import { Save } from "lucide-react"
import EyeOn from 'remixicon-react/EyeFillIcon'
import EyeOff from 'remixicon-react/EyeCloseFillIcon'
import bcrypt from 'bcryptjs'


interface User {
    userid: string
    nFirst: string
    nLast: string
    email: string
}
interface Pass {
    curr: string
    new: string
}
export const meta: MetaFunction = () => {
    return [
        { title: "User Profile - RedNotes" },
    ]
}


export const loader: LoaderFunction = async ({ request }) => {
    const userid = await checkSession(request, true)
    if (typeof userid !== 'string') return null
    try {
        const user: User | null = await notedb.users.findUnique({
            where: { userid: userid },
            select: {
                userid: true,
                email: true,
                nFirst: true,
                nLast: true,
            }
        })
        return json(user)
    } catch {
        throw logout(request)
    }
}
const profile = () => {
    const user = useLoaderData<User>()
    const [formUser, setFormUser] = useState(user)
    const [initUser, setInitUser] = useState(user)
    const [formPass, setFormPass] = useState({ currPass: '', newPass: '' })
    const [empPass, setEmpPass] = useState({ currPass: '', newPass: '' })
    const fetcher = useFetcher()
    const handleSubmit = (job: 'logout' | 'cngUSR' | 'cngPass',) => {
        fetcher.submit(
            {
                nFirst: formUser.nFirst,
                nLast: formUser.nLast,
                email: formUser.email,
                currPass: formPass.currPass,
                newPass: formPass.newPass,
                job
            },
            { method: "post" }
        )
    }
    const [disPass, setDisPass] = useState(false)
    const togPassDis = () => {
        if (disPass) {
            setDisPass(false)
        } else {
            setDisPass(true)
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormUser({
            ...formUser,
            [name]: value,
        })
    }
    const handlePassChange = (p) => {
        const { name, value } = p.target
        setFormPass({
            ...formPass,
            [name]: value,
        })
    }
    return (
        <>
            <div className="grid gap-2 md:gap-4">
                <div className="flex justify-between">
                    <h3 className="text-xl font-Kayak tracking-wide pt-1 content-center">
                        Want Log out?</h3>
                    <div className="flex gap-x-2 md:gap-x-4">
                        <button
                            onClick={() => handleSubmit('logout')}
                            type="button"
                            className="bg-accent transition-color hover:duration-100 rounded-lg p-3.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in"
                        >Logout
                        </button>
                    </div>
                </div>
                <div className="flex justify-between">
                    <h3 className="text-3xl font-Kayak tracking-wide pt-1 content-center">
                        Edit your profile</h3>
                    <div className="flex gap-x-2 md:gap-x-4">
                        <button
                            onClick={() => setFormUser(initUser)}
                            type="button"
                            disabled={formUser === initUser}
                            className="enabled:hover:bg-accent enabled:bg-gray-900 disabled:hover:bg-gray-600 disabled:bg-gray-800 transition-color hover:duration-100 rounded-lg p-3.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in"
                        >Cancel
                        </button>
                        <button
                            onClick={() => handleSubmit('cngUSR')}
                            type="button"
                            disabled={formUser === initUser}
                            className="enabled:hover:bg-accent enabled:bg-gray-900 disabled:hover:bg-gray-600 disabled:bg-gray-800 transition-color hover:duration-100 rounded-lg p-3.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in"
                        ><Save className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                <div className="gap-y-2 md:gap-y-4 grid">
                    <input type="text"
                        placeholder="First Name"
                        className="min-h-16 text-2xl font-semibold w-full antialiased px-4 py-3.5 focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-none"
                        value={formUser.nFirst}
                        name="nFirst"
                        onChange={handleInputChange} />
                    <input type="text"
                        placeholder="Last Name"
                        className=" min-h-16 text-2xl font-semibold w-full antialiased px-4 py-3.5 focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-none"
                        value={formUser.nLast}
                        name="nLast"
                        onChange={handleInputChange} />
                    <input type="email"
                        placeholder="Email"
                        className="min-h-16 text-2xl font-semibold w-full antialiased px-4 py-3.5 focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-none"
                        value={formUser.email}
                        name="email"
                        onChange={handleInputChange} />
                </div>
                <div className="flex justify-between">
                    <h3 className="text-3xl font-Kayak tracking-wide pt-1 content-center">
                        Change your password</h3>
                    <div className="flex gap-x-2 md:gap-x-4">
                        <button
                            onClick={() => setFormPass(empPass)}
                            type="button"
                            disabled={formPass === empPass}
                            className="enabled:hover:bg-accent enabled:bg-gray-900 disabled:hover:bg-gray-600 disabled:bg-gray-800 transition-color hover:duration-100 rounded-lg p-3.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in"
                        >Cancel
                        </button>
                        <button
                            onClick={() => handleSubmit('cngPass')}
                            type="button"
                            disabled={formPass.newPass === empPass.newPass && formPass.currPass === empPass.currPass}
                            className="enabled:hover:bg-accent enabled:bg-gray-900 disabled:hover:bg-gray-600 disabled:bg-gray-800 transition-color hover:duration-100 rounded-lg p-3.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in"
                        ><Save className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => togPassDis()}
                            type="button"
                            className="bg-gray-900 h-14 w-14 text-xl group  hover:bg-accent transition-color hover:bg-accent transition-color hover:duration-100 rounded-lg p-3.5 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in" >
                            {disPass ? <EyeOff /> : <EyeOn />}
                        </button>
                    </div>
                </div>
                <div className="gap-y-2 md:gap-y-4 grid">
                    <input placeholder="Current Password"
                        value={formPass.currPass}
                        onChange={handlePassChange}
                        type={disPass ? 'text' : 'password'}
                        name="currPass"
                        className="align-middle text-xl font-semibold antialiased w-full px-4 py-3.5 focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-none h-14" />
                    <input placeholder="New Password"
                        value={formPass.newPass}
                        onChange={handlePassChange}
                        type={disPass ? 'text' : 'password'}
                        name="newPass"
                        className="px-4 py-3.5 align-middle text-xl font-semibold w-full antialiased focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-none h-14" />

                </div>
            </div>
        </>
    )
}
export default profile

export const action: ActionFunction = async ({ request }) => {
    // Get data from request
    const reqUserid = await checkSession(request, true) as string
    const formData = await request.formData()
    const job = formData.get('job')
    console.log(job)
    console.log(reqUserid)
    console.log(formData.get('nFirst'))
    console.log(formData.get('nLast'))
    console.log(formData.get('email'))
    console.log(formData.get('currPass'))
    console.log(formData.get('newPass'))
    switch (job) {
        case 'logout':
            return logout(request)
        case 'cngUser':
            const updatedUser = await notedb.users.update({
                where: { userid: reqUserid },
                data: {
                    nFirst: formData.get('nFirst') as string,
                    nLast: formData.get('nLast') as string,
                    email: formData.get('email') as string
                }
            })
            return updatedUser
        case 'cngPass':
            const reqNewPass = formData.get('newPass') as string
            const reqCurrPass = formData.get('currPass') as string
            if (reqUserid && reqNewPass && reqCurrPass) {
                const currPassHash = await notedb.users.findUnique({
                    where: { userid: reqUserid },
                    select: { passHash: true }
                })
                if (currPassHash === null) {
                    return logout
                }
                if (!(await bcrypt.compare(reqCurrPass, currPassHash.passHash))) {
                    const genHash = await bcrypt.hash(reqNewPass, 10)
                    const updatedPass = await notedb.users.update({
                        where: { userid: reqUserid },
                        data: {
                            passHash: genHash
                        }
                    })
                    return updatedPass
                }

            }
            return console.log('unknown error')
    }
    return null
}
