"use client"
import Link from 'next/link'
import React, { useRef } from 'react'
import { signIn } from 'next-auth/react'
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Signin() {

    const [error, setError] = useState("");
    const router = useRouter();
    const email = useRef("");
    const password = useRef("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const res = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });


        if (res?.error) {
            setError(res.error as string);
        }
        if (res?.ok) {
            return router.push("/");
        }
    };

    return (

        <section className="bg-gray-50 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                    VAS
                </a>
                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        {error && <div className='bg-red-500 rounded-md w-full p-5'>
                            <h1 >
                                {error}
                            </h1>


                        </div>}
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

                            <button className="mt-2 w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
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
