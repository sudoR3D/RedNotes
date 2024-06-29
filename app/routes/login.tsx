import LoginLine from 'remixicon-react/LoginCircleLineIcon'
import LoginFill from 'remixicon-react/LoginCircleFillIcon'
import { useNavigate, useFetcher, useLoaderData } from '@remix-run/react'
import EyeOn from 'remixicon-react/EyeFillIcon'
import EyeOff from 'remixicon-react/EyeCloseFillIcon'
import { useState, useEffect } from 'react'
import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { signup, login, checkSession } from '~/comp/auth.server'



export const loader: LoaderFunction = async ({ request }) => {
    const loggedUser = await checkSession(request, false)
    const returnto = new URL(request.url).searchParams.get('to')
    console.log(returnto)
    if (loggedUser) return redirect('/')
    return json(returnto)
}

const logscreen = () => {
    const [formData, setFormDate] = useState({
        email: '',
        pass: '',
        fname: '',
        lname: '',
    })
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormDate(form => ({ ...form, [field]: event.target.value }))
    }
    //Login or Signup
    const [signup, setSignup] = useState(false)
    const togSignup = () => {
        if (signup) {
            setSignup(false)
        } else {
            setSignup(true)
        }
    }
    //Password display toggle
    const [disPass, setDisPass] = useState(false)
    const togPassDis = () => {
        if (disPass) {
            setDisPass(false)
        } else {
            setDisPass(true)
        }
    }
    //Submit
    const returnto = useLoaderData<typeof loader>()
    const fetcher = useFetcher()
    const submit = async () => {
        //preventDefault();
        fetcher.submit(
            {
                action: signup ? 'signup' : 'login',
                email: formData.email,
                pass: formData.pass,
                fname: formData.fname,
                lname: formData.lname,
                to: returnto,
            },
            { method: "post" }
        )
    }
    useEffect(() => {
        document.title = signup ? "Signup - RedNotes" : "Login - RedNotes"
    }, [signup])
    return (
        <>
            <div className="flex items-center justify-center">
                <div className='gap-y-4 gap-x-2 grid w-4/6 mt-[8vh]'>
                    <div className='gap-y-1 grid justify-center'>
                        <h1 className="text-4xl text-center font-Kayak tracking-wide pt-1 content-center">
                            {signup ? 'Create new account' : 'Login to access Notes'}
                        </h1>
                        <div className='flex align-middle justify-center'>
                            <p className='flex-inline mr-2'>OR </p>
                            <button onClick={() => togSignup()} type="button" className="flex-inline transition-color hover:text-accent transition-color hover:duration-100 rounded-lg font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in" >
                                <p className=' underline '>{signup ? 'Login to your account' : 'Create an account'}</p>
                            </button>
                        </div>
                    </div>
                    <form className="gap-y-4 grid mt-4">
                        {signup ?
                            <div className='flex gap-x-4'>
                                <input placeholder="First Name" type="text" required value={formData.fname} onChange={e => handleInputChange(e, 'fname')} name="firstname" className="text-xl font-semibold w-full antialiased px-4 py-3.5 focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-none h-14" />
                                <input placeholder="Last Name" type="text" name="lastname" value={formData.lname} onChange={e => handleInputChange(e, 'lname')} className="text-xl font-semibold w-full antialiased px-4 py-3.5 focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-none h-14" />
                            </div> : null}
                        <input placeholder="Email" type="email" required value={formData.email} onChange={e => handleInputChange(e, 'email')} name="email" className="text-xl font-semibold w-full antialiased px-4 py-3.5 focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-none h-14" />
                        <div className='flex gap-x-1 align-middle text-xl font-semibold w-full antialiased focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-none h-14'>
                            <input placeholder="Password" value={formData.pass} onChange={e => handleInputChange(e, 'pass')} type={disPass ? 'text' : 'password'} name="password" className="w-full px-4 py-3.5 focus:scale-[1.01] hover:scale-[1.01] duration-75 bg-neutral-900 rounded-lg resize-none h-14" />
                            <button
                                onClick={() => togPassDis()} type="button" className="h-14 w-14 text-xl group  hover:bg-accent transition-color hover:bg-accent transition-color hover:duration-100 rounded-lg p-3.5 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in" >
                                {disPass ? <EyeOff /> : <EyeOn />}
                            </button>
                        </div>
                        <div className="flex justify-between">
                            <button onClick={() => togSignup()} type="button" className="flex-inline transition-color hover:text-accent transition-color hover:duration-100 rounded-lg shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in" >
                                <p className='underline '>Reset password</p>
                            </button>
                            <div className='flex gap-x-4'>
                                <button onClick={() => submit()} type='button' className=" h-14 flex text-xl group my-3 hover:bg-accent transition-color enabled:hover:bg-accent enabled:bg-gray-900 disabled:hover:bg-gray-600 disabled:bg-gray-800 transition-color hover:duration-100 rounded-lg p-3.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 align-middle transition-color duration-100 ease-in" >
                                    <LoginFill className="group-hover:block hidden hover:duration-100" />
                                    <LoginLine className="group-hover:hidden block hover:duration-100" />
                                    <p className='pl-2'>{signup ? 'Signup' : 'LogIn'}</p>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default logscreen


export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const action = form.get('action')
    const email = form.get('email')
    const pass = form.get('pass')
    let fname = form.get('fname')
    let lname = form.get('lname')
    const returnto = form.get('to') as string
    if (typeof action !== 'string' || typeof email !== 'string' || typeof pass !== 'string') {
        return json({ error: 'Invalid Email or Password', form: action }, { status: 400 })
    }
    if (action === 'signup' && (typeof fname !== 'string' || typeof lname !== 'string')) {
        return json({ error: 'Inavalid Name' }, { status: 400 })
    }



    //Auth switch
    switch (action) {
        case 'login': {
            return await login({ email, pass, returnto })
        }
        case 'signup': {
            return await signup({ email, pass, fname, lname })
        }
        default:
            console.log('deff')
            return json({ error: 'Invalid Request' }, { status: 400 })
    }

}

