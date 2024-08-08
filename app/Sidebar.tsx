"use client"
import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TbDeviceDesktopSearch, TbDatabaseSearch, TbVideo, TbReport, TbHome, TbMenu, TbLogout } from "react-icons/tb";
import Link from 'next/link';
import SideButtons from '@/Components/SideButtons';
import { signOut } from 'next-auth/react';

export default function Sidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router=useRouter()
    const [show, setShow] = React.useState(false);

    const iconSize = 35;

    const isActive = (path: string) => {
        const currentPath = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
        return currentPath === path ? 'bg-[#1f1f1f]' : '';
    };

    return (
        <>
            <div className='flex flex-row justify-between'>

                <p className="font-bold text-3xl">VisiumX</p>
                <button className='sm:hidden block' onClick={() => setShow(!show)}><TbMenu /></button>
            </div>
            <div className='sm:pr-10 justify-between flex flex-row sm:flex-col sm:h-[80vh] overflow-scroll no-scrollbar '>
                <div className='flex-1'>
                    <p className='font-light text-[#f1f1f1] sm:block hidden'></p>
                </div>
                <nav className={`flex-[3] sm:block sm:bg-transparent sm:w-full w-[100vw] bg-[#1f1f1f] ${show ? "absolute" : "hidden"} top-24 left-0`}>
                    <ul>
                        <Link href="/">
                            <SideButtons className={isActive('/')}>
                                <>
                                    <TbHome size={iconSize} className='mr-4 p-2 rounded-full' color='white' />
                                    Home
                                </>
                            </SideButtons>
                        </Link>
                        <Link href="/database">
                            <SideButtons className={isActive('/database')}>
                                <>
                                    <TbDatabaseSearch size={iconSize} className='mr-4 p-2 rounded-full' color='white' />
                                    Recognition (Database)
                                </>
                            </SideButtons>
                        </Link>
                        <Link href="/stream">
                            <SideButtons className={isActive('/stream')}>
                                <>
                                    <TbDatabaseSearch size={iconSize} className='mr-4 p-2 rounded-full' color='white' />
                                    Recognition (Stream)
                                </>
                            </SideButtons>
                        </Link>
                        <Link href="/optional?feature=ReportedCrimes">
                            <SideButtons className={isActive('/optional?feature=ReportedCrimes')}>
                                <>
                                    <TbReport size={iconSize} className='mr-4 p-2 rounded-full' color='white' />
                                    Reported Crimes
                                </>
                            </SideButtons>
                        </Link>
                        <Link href="/optional?feature=BackgroundCheck">
                            <SideButtons className={isActive('/optional?feature=BackgroundCheck')}>
                                <>
                                    <TbReport size={iconSize} className='mr-4 p-2 rounded-full' color='white' />
                                    Background Check
                                </>
                            </SideButtons>
                        </Link>
                        <Link href="/optional?feature=RecordsManagementSystem">
                            <SideButtons className={isActive('/optional?feature=RecordsManagementSystem')}>
                                <>
                                    <TbReport size={iconSize} className='mr-4 p-2 rounded-full' color='white' />
                                    Records Management
                                </>
                            </SideButtons>
                        </Link>
                        <Link href="/optional?feature=ComplaintManagementSystem">
                            <SideButtons className={isActive('/optional?feature=ComplaintManagementSystem')}>
                                <>
                                    <TbReport size={iconSize} className='mr-4 p-2 rounded-full' color='white' />
                                    Complaint Management
                                </>
                            </SideButtons>
                        </Link>
                        <Link href="/optional?feature=BiometricVerification">
                            <SideButtons className={isActive('/optional?feature=BiometricVerification')}>
                                <>
                                    <TbReport size={iconSize} className='mr-4 p-2 rounded-full' color='white' />
                                    Biometric Verification
                                </>
                            </SideButtons>
                        </Link>
                        <Link href="/optional?feature=Cybercrime">
                            <SideButtons className={isActive('/optional?feature=Cybercrime')}>
                                <>
                                    <TbReport size={iconSize} className='mr-4 p-2 rounded-full' color='white' />
                                    Cybercrime
                                </>
                            </SideButtons>
                        </Link>
                        <Link href="/seeallnvr">
                            <SideButtons className={isActive('/seeallnvr')}>
                                <>
                                    <TbVideo size={iconSize} className='mr-4 p-2 rounded-full' color='white' />
                                    See All Videos (NVR)
                                </>
                            </SideButtons>
                        </Link>
                        <Link href="/optional?feature=DataAnalytics">
                            <SideButtons className={isActive('/optional?feature=DataAnalytics')}>
                                <>
                                    <TbVideo size={iconSize} className='mr-4 p-2 rounded-full' color='white' />
                                    Data Analytics
                                </>
                            </SideButtons>
                        </Link>
                       {show&& <button
                            onClick={async () => {
                                await signOut()
                                router.push("/auth/signin")
                            }}
                            className='my-2 text-[#f1f1f1] flex flex-row items-center   py-1 rounded-md text-[12px] hover:bg-[#1f1f1f] active:bg-[#1f1f1f] focus:bg-[#1f1f1f] px-1 ${className}'
                        >
                            <TbLogout size={iconSize} className='mr-4 p-2 rounded-full' color='white' />
                            Logout
                        </button>}
                    </ul>
                </nav>
            </div>
        </>
    );
}
