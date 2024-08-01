"use client"

import React from 'react'

import Image from "next/image";
import Database from "@/Components/Database";
import { Suspense } from "react";
import VideoFeed from "@/Components/VideoFeed";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GetImages from "@/Components/GetImages";
import { IoIosCloudUpload } from "react-icons/io";
import Loader from './Loader';
const {BACKEND_URL}=process.env;

export default function UploadImage() {
    const [image, setImage] = useState<string>()
    const [OGimage, setOGImage] = useState<string>()
    const [id, setId] = useState<string>()
    const { status } = useSession();
    const router = useRouter();

    const showSession = () => {
        if (status === "authenticated") {
            return (
                <button
                    className="border border-solid border-black rounded"
                    onClick={() => {
                        signOut({ redirect: false }).then(() => {
                            router.push("/");
                        });

                    }}
                >
                    Sign Out
                </button>
            )
        } else if (status === "loading") {
            return (
                <span className="text-[#888] text-sm mt-7">Loading...</span>
            )
        } else {
            return (
                <Link
                    href="/login"
                    className="border border-solid border-black rounded"
                >
                    Sign In
                </Link>
            )
        }
    }

    const handleImage = async (image: string) => {
        setImage(image);
    }

    function convertToBase64(file: Blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                resolve(reader.result);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    }



    const handleImageUpload = async (event: { target: { files: any[] | FileList | null; } }) => {
        // alert("called this")

        if (!event.target.files) {
            return;
        }

        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        const image_id = uuidv4();

        const url = URL.createObjectURL(file)
        const base64: string = await convertToBase64(file) as string;
        console.log(base64)
        try {

            await fetch(`https://vas-ech6h7cfgchdh2f2.southeastasia-01.azurewebsites.net/upload_file`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    image: base64.replace(/^data:image\/\w+;base64,/, ''),
                    image_id: image_id
                })
            })
        }
        catch (error) {
            console.log(error)
        }
        setOGImage(base64)
        setId(image_id)
    };

    return (
        <>

            <div className="flex-[1]">

                <div className="flex sm:flex-row flex-col h-[85vh] ">
                    {!OGimage ?
                        <div className='flex-[3.5]'>
                            

                                <h2
                                    className="font-semibold text-xl mb-5 mr-3"
                                >
                                    New Search
                                </h2>
                               

                            <div className="bg-[#1f1f1f]  rounded-xl sm:mr-3 p-3 sm:mb-0 mb-5 sm:h-[85vh] h-[40vh] no-scrollbar overflow-scroll">

                                <div className="flex flex-row h-full w-full">
                                    <div className=" flex-1 items-center flex justify-center">
                                        {!OGimage &&
                                            <>
                                                <label htmlFor="file-upload" className="font-bold text-lg bg-gradient-to-r from-pink-500 to-violet-600 h-[300px] flex items-center px-3 rounded-md w-[300px] justify-around flex-col">
                                                    <IoIosCloudUpload size={150} />
                                                    Upload Image
                                                </label>
                                                <input id="file-upload" style={{ display: 'none' }} className='none' type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} />
                                            </>
                                        }

                                    </div>
                                    <div>
                                    </div>

                                    {OGimage && <Image
                                        src={OGimage}
                                        alt="image to scan"
                                        width={300}
                                        height={300}
                                        className="rounded-lg object-cover mr-10 overflow-hidden h-[300px]"
                                    />}

                                    {image && <Image
                                        src={image}
                                        alt="image to scan"
                                        width={300}
                                        height={300}
                                        className="rounded-lg object-cover overflow-hidden h-[300px]"
                                    />}
                                </div>
                            </div>
                        </div> :
                <div className='flex-[5]'>
                    <div className='flex flex-row items-center'>

                        <h2
                            className="font-semibold text-xl mb-3"
                        >Further Information</h2>
                         <Loader Height={30} Width={30} />
                    </div>
                    <div className="bg-[#1f1f1f]  rounded-xl  overflow-scroll no-scrollbar sm:h-[85vh] h-[40vh] border-2 border-[#2f2f2f]">
                        <Suspense fallback={<p>Loading feed...</p>}>
                            {id && <VideoFeed handleImage={handleImage} id={id} />}
                        </Suspense>
                    </div>
                </div>
                    }
            </div>
        </div >

        </>
    )
}
