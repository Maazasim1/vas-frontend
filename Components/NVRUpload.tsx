
'use client'
import Database from "@/Components/Database";
import { ChangeEvent, Suspense, useEffect, useRef } from "react";
import GetImages from "@/Components/GetImages";
import { useState } from "react";
import { requestNVR } from "@/lib/utils/requestLogs";
import Image from "next/image";
import RecentSearchImages from "./RecentSearchImages";
import Loader from "./Loader";
import GETNVRVideos from "./GetNVRVideos";
import { IoIosCloudUpload } from "react-icons/io";
import { v4 as uuidv4 } from 'uuid';
import { BACKEND_URL } from "@/config";

export default function NVRUpload({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {


    const [logs, setLogs] = useState<any[]>([])
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        setReload(false);
        setReload(true);

    }, [loading])
    async function fetchAllVideos(selected: string) {
        setLoading(true);
        scrollToTop();
        const dataTemp = await requestNVR(selected);
        setLoading(false)
        setLogs(dataTemp)
    }


    function handleImage(imageURL: string): void {
        console.log(imageURL)
        setImage(imageURL)
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
        setLoading(true)
        alert("called this")

        if (!event.target.files) {
            return;
        }
        const file = event.target.files[0];
        const fileType = file.type;

        if (fileType.startsWith('image/')) {
            console.log('The uploaded file is an image.');
            // Handle image upload logic here
        } else if (fileType.startsWith('video/')) {
            console.log('The uploaded file is a video.');
            // Handle video upload logic here
        }


        const formData = new FormData();
        formData.append('image', file);
        const image_id = uuidv4();

        const url = URL.createObjectURL(file)
        const base64: string = await convertToBase64(file) as string;
        console.log(base64)
        try {

            await fetch(BACKEND_URL + "/add_videos" || `https://vas-ech6h7cfgchdh2f2.southeastasia-01.azurewebsites.net/add_videos`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body:
                    JSON.stringify({
                        video: base64.replace(/^data:video\/\w+;base64,/, ''),
                        video_id: image_id,
                    })

            })
        }
        catch (error) {
            console.log(error)
        }
        finally {

            setLoading(false)
            alert("The Video has been uploaded")
        }
    };


    return (

        <div className="flex sm:flex-row-reverse flex-col h-[75vh] ">


            <div className="bg-[#1f1f1f]  w-[80vw] rounded-xl sm:mr-3 p-3 sm:mb-0 mb-5 sm:h-[70vh] h-[40vh] no-scrollbar overflow-scroll">

                <div className="bg-[#1f1f1f]  rounded-xl sm:mr-3 p-3 sm:mb-0 mb-5 sm:h-[75vh] h-[40vh] no-scrollbar overflow-scroll">
                    <h1 className="font-bold text-lg">Upload to NVR</h1>
            
                    <div className="flex flex-row h-full w-full">
                        <div className=" flex-1 items-center flex justify-center">

                            <>
                                {loading ? <div className="w-[300px] h-[300px]"><Loader Width={50} Height={50} /></div> :
                                    <>
                                        <label htmlFor="file-upload" className="font-bold text-lg bg-[#2f2f2f] h-[300px] flex items-center px-3 rounded-md w-[300px] justify-around flex-col">
                                            <IoIosCloudUpload size={150} />
                                            Upload Video
                                        </label>
                                        <input id="file-upload" style={{ display: 'none' }} className='none' type="file" accept="image/*,video/*" onChange={(e) => handleImageUpload(e)} />
                                    </>
                                }
                            </>


                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
} const Dropdown = () => {

    const [open, setOpen] = useState(false);


    return (
        <>

            <button onClick={() => setOpen(!open)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button">Dropdown button <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>


            {open && <div id="dropdown" className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <a href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                        <a href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                        <a href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                            out</a>
                    </li>
                </ul>
            </div>}
        </>
    )
}