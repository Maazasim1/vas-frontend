"use client"
import Link from 'next/link'
import React, { useRef } from 'react'
import { signIn } from 'next-auth/react'
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import bg from '../../../public/login-back.jpg'
import Loader from '@/Components/Loader';

export default function Signin() {

    const [error, setError] = useState("");
    const router = useRouter();
    const email = useRef("");
    const password = useRef("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {

            setLoading(true)
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const res = await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirect: true,
                callbackUrl: `${window.location.origin}/`
            });


            if (res?.error) {
                setError(res.error as string);

                res.error;

            }
            if (res?.ok) {

                //  return router.push("/");
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    };

    return (

        <section style={{ backgroundImage: `url(${bg.src})`, width: '100vw', height: "100vh", backgroundRepeat: 'no-repeat', backgroundSize: "cover" }}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        {error && <div className='bg-red-500 rounded-md w-full p-5'>
                            <h1 >
                                {error}
                            </h1>


                        </div>}
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-black text-center md:text-2xl pb-10 border-b-2 border-gray-400">
                            Visium Analytics Services
                        </h1>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input onChange={(e) => email.current = e.target.value} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input onChange={(e) => password.current = e.target.value} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 ">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a>
                            </div>

                            <button disabled={loading} className="mt-2 w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex-row flex items-center justify-center">{loading ? <Loader Width={20} Height={20} /> : "Sign in"}</button>
                            <Link
                                href="/auth/register"
                                className="text-sm text-[#888] transition duration-150 ease hover:text-black mt-3">
                                Don&apos;t have an account?
                            </Link>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
