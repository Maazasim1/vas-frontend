import React from 'react'
import Image from 'next/image'
import { TbDeviceDesktopSearch,TbDatabaseSearch } from "react-icons/tb";
import { signOut } from 'next-auth/react';

export default function Sidebar() {
    return (
        <div
            className='pr-10 justify-between flex flex-col h-[88vh]'
        >
            <div
                className='flex-1'
            >
                <Image
                    src={"/profile.jpg"}
                    alt="profile picture"
                    width={60}
                    height={60}
                    className='rounded-full border-[#1c1c1c] border-[3px] '

                />
                <p
                    className="font-bold"

                >Maaz Asim</p>
                <p
                    className='font-light text-[#f1f1f1]'
                >Sharah-e-faisal police station</p>
            </div>
            <nav
                className='flex-[3]'
            >
                <ul>
                    <li
                        className='my-2 text-[#f1f1f1] flex flex-row items-center'
                    >
                        <TbDeviceDesktopSearch size={40} className='mr-4 bg-[#1f1f1f] p-2 rounded-full' color='white' />
                        Live Search
                    </li>
                    <li
                        className='my-2 text-[#f1f1f1] flex flex-row items-center'
                    >
                        <TbDatabaseSearch size={40} className='mr-4 bg-[#1f1f1f] p-2 rounded-full' color='white' />
                        Database Search
                    </li>
                </ul>
            </nav>
            <button
            onClick={()=>signOut()}
                className='w-full h-10 bg-[#1f1f1f] rounded-md'
            >
                Logout
            </button>
        </div>
    )
}
