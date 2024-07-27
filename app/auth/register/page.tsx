"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/actions/register";


export default function Register() {
    const [error, setError] = useState<string>();
    const router = useRouter();
    const ref = useRef<HTMLFormElement>(null);

    const handleSubmit = async (formData: FormData) => {
        const r = await register({
            email: formData.get("email"),
            password: formData.get("password"),
            name: formData.get("name")
        });
        ref.current?.reset();
        if (r?.error) {
            setError(r.error);
            return;
        } else {
            return router.push("/login");
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
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Sign in to your account
                        </h1>
                        <form ref={ref}
                            action={handleSubmit}
                            className="space-y-4 md:space-y-6">
                            {error && <div className="">{error}</div>}
                            <h1 className="mb-5 w-full text-2xl font-bold">Register</h1>

                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Full Name</label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                name="name"
                            />

                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " name="email"
                            />

                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <div className="flex w-full">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " name="password"
                                />
                            </div>

                            <button className="mt-2 w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                Sign up
                            </button>


                            <Link href="/auth/signin" className="text-sm text-[#888] transition duration-150 ease hover:text-black">
                                Already have an account?
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
