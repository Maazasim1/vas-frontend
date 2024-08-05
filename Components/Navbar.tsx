"use client"

import React, { useState } from 'react'
import { TbDeviceDesktopSearch, TbDatabaseSearch } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { FaPlug, FaHouse, FaCheckDouble, FaBell } from "react-icons/fa6";
import { FaSignOutAlt, FaUsers } from "react-icons/fa";
import { getServerSession } from 'next-auth';
import Searchbar from './Searchbar';
import Image from 'next/image';
import { authOptions } from '@/lib/utils/authOptions';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Navbar() {

    const [hover,setHover]=useState(false)
    const session = useSession()
    const router=useRouter()
    console.log(session)
    return (
        <div
            className='ml-[22vw] p-5 justify-between sm:flex flex-row h-[80px] w-[75vw] bg-[#000] sm:fixed hidden top-0  items-center pr-10 mb-10'
        >
            <div className='flex-[0.95]'>
                <Searchbar />
            </div>
            {/* <div className='p-4 bg-[#1f1f1f] rounded-md flex items-center aspect-square justify-center'>

                <FaBell size={20} />
                <span className="absolute flex h-3 w-3 ml-[48px] mb-[48px]">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
            </div> */}
            <div onMouseEnter={()=>setHover(!hover)} onMouseLeave={()=>setHover(false)}>

                <div className={`${hover&&"mt-12"} p-2 bg-[#1f1f1f] rounded-md flex flex-row items-center cursor-pointer justify-center`} >
                    <Image src="/profile.jpg" alt="profile image" width={30} height={30}
                        className={`rounded-full ${hover?"mr-4":""}`}
                    />
                  {hover&&  <div>
                        <h1
                            className='font-bold text-sm'
                        >{session.data?.user?.name}</h1>
                        <p
                            className="text-sm"
                        >{session.data?.user?.email}</p>

                    </div>}
                </div>
               {hover && <button
                onClick={async () => {
                   await signOut()
                   router.push("/auth/signin")
                }}
                className='sm:w-[10vw] w-10 h-10 bg-[#1f1f1f] rounded-md  mt-2 ml-20'
            >
                Logout
            </button>}
            </div>


        </div>
    )
}
