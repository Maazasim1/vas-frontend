"use client"
import React from 'react'
import Image from 'next/image'
import { TbDeviceDesktopSearch, TbDatabaseSearch, TbVideo, TbReport, TbHome } from "react-icons/tb";
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Sidebar() {
    const session = useSession()
    return (
        <>
            <div
                className='sm:pr-10 justify-between flex flex-row sm:flex-col sm:h-[85vh]  overflow-scroll no-scrollbar'
            >
                <div
                    className='flex-1'
                >
                    {/* <Image
                    src={"/profile.jpg"}
                    alt="profile picture"
                    width={60}
                    height={60}
                    className='rounded-full border-[#1c1c1c] border-[3px] w-10 h-10 sm:w-[60px] sm:h-[60px]'

                /> */}
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
                        <Link href="/">
                            <li
                                className='my-2 text-[#f1f1f1] flex flex-row items-center bg-[#1f1f1f] px-1 py-1 rounded-md'
                            >
                                <TbHome size={40} className='mr-4 bg-[#1f1f1f] p-2 rounded-full' color='white' />
                                Home
                            </li>
                        </Link>
                        <Link href="/database">

                            <li
                                className='my-2 text-[#f1f1f1] flex flex-row items-center bg-[#1f1f1f] px-1 py-1 rounded-md'
                            >
                                <TbDatabaseSearch size={40} className='mr-4 bg-[#1f1f1f] p-2 rounded-full' color='white' />
                                Facial Recognition (Database)
                            </li>
                        </Link>
                        <Link href="/stream">
                            <li
                                className='my-2 text-[#f1f1f1] flex flex-row items-center bg-[#1f1f1f] px-1 py-1 rounded-md'
                            >
                                <TbDatabaseSearch size={40} className='mr-4 bg-[#1f1f1f] p-2 rounded-full' color='white' />
                                Facial Recognition (Stream)
                            </li>
                        </Link>
                        <Link href="/optional?feature=ReportedCrimes">
                            <li className='my-2 text-[#f1f1f1] flex flex-row items-center bg-[#1f1f1f] px-1 py-1 rounded-md'>
                                <TbReport size={40} className='mr-4 bg-[#1f1f1f] p-2 rounded-full' color='white' />
                                Reported Crimes
                            </li>
                        </Link>
                        <Link href="/optional?feature=BackgroundCheck">
                            <li className='my-2 text-[#f1f1f1] flex flex-row items-center bg-[#1f1f1f] px-1 py-1 rounded-md'>
                                <TbReport size={40} className='mr-4 bg-[#1f1f1f] p-2 rounded-full' color='white' />
                                Background Check
                            </li>
                        </Link>
                        <Link href="/optional?feature=RecordsManagementSystem">
                            <li className='my-2 text-[#f1f1f1] flex flex-row items-center bg-[#1f1f1f] px-1 py-1 rounded-md'>
                                <TbReport size={40} className='mr-4 bg-[#1f1f1f] p-2 rounded-full' color='white' />
                                Records Management System
                            </li>
                        </Link>
                        <Link href="/optional?feature=ComplaintManagementSystem">
                            <li className='my-2 text-[#f1f1f1] flex flex-row items-center bg-[#1f1f1f] px-1 py-1 rounded-md'>
                                <TbReport size={40} className='mr-4 bg-[#1f1f1f] p-2 rounded-full' color='white' />
                                Complaint Management System
                            </li>
                        </Link>
                        <Link href="/optional?feature=BiometricVerification">
                            <li className='my-2 text-[#f1f1f1] flex flex-row items-center bg-[#1f1f1f] px-1 py-1 rounded-md'>
                                <TbReport size={40} className='mr-4 bg-[#1f1f1f] p-2 rounded-full' color='white' />
                                Biometric Verification
                            </li>
                        </Link>
                        <Link href="/optional?feature=Cybercrime">
                            <li className='my-2 text-[#f1f1f1] flex flex-row items-center bg-[#1f1f1f] px-1 py-1 rounded-md'>
                                <TbReport size={40} className='mr-4 bg-[#1f1f1f] p-2 rounded-full' color='white' />
                                Cybercrime
                            </li>
                        </Link>
                        <Link href="/optional?feature=SeeAllVideosNVR">
                            <li className='my-2 text-[#f1f1f1] flex flex-row items-center bg-[#1f1f1f] px-1 py-1 rounded-md'>
                                <TbVideo size={40} className='mr-4 bg-[#1f1f1f] p-2 rounded-full' color='white' />
                                See All Videos (NVR)
                            </li>
                        </Link>
                        <Link href="/optional?feature=DataAnalytics">
                            <li className='my-2 text-[#f1f1f1] flex flex-row items-center bg-[#1f1f1f] px-1 py-1 rounded-md'>
                                <TbVideo size={40} className='mr-4 bg-[#1f1f1f] p-2 rounded-full' color='white' />
                                Data Analytics
                            </li>
                        </Link>


                    </ul>
                </nav>
            </div>
            <button
                onClick={() => signOut()}
                className='sm:w-[20.8vw] w-24 h-10 bg-[#1f1f1f] rounded-md'
            >
                Logout
            </button>
        </>
    )
}
