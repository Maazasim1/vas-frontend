"use client"
import React from 'react'
import Image from 'next/image'
import { TbDeviceDesktopSearch, TbDatabaseSearch } from "react-icons/tb";
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function Sidebar() {
    const session = useSession()
    return (
        <div
            className='sm:pr-10 justify-between flex flex-row sm:flex-col sm:h-[88vh]'
        >
            <div
                className='flex-1'
            >
                <Image
                    src={"/profile.jpg"}
                    alt="profile picture"
                    width={60}
                    height={60}
                    className='rounded-full border-[#1c1c1c] border-[3px] w-10 h-10 sm:w-[60px] sm:h-[60px]'

                />
                <p
                    className="font-bold "

                >
                    {session?.data?.user?.name}
                </p>
                <p
                    className='font-light text-[#f1f1f1] sm:block hidden'
                ></p>
            </div>
            <nav
                className='flex-[3] sm:block hidden'
            >
                <ul>
                    {/* <li
                        className='my-2 text-[#f1f1f1] flex flex-row items-center'
                    >
                        <TbDeviceDesktopSearch size={40} className='mr-4 bg-[#1f1f1f] p-2 rounded-full' color='white' />
                        Live Search
                    </li> */}
                    <li
                        className='my-2 text-[#f1f1f1] flex flex-row items-center bg-[#1f1f1f] px-1 py-1 rounded-md'
                    >
                        <TbDatabaseSearch size={40} className='mr-4 bg-[#1f1f1f] p-2 rounded-full' color='white' />
                        Database Search
                    </li>
                </ul>
            </nav>
            <button
                onClick={() => signOut()}
                className='sm:w-full w-24 h-10 bg-[#1f1f1f] rounded-md'
            >
                Logout
            </button>
        </div>
    )
}
