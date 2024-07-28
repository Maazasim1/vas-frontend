
'use client'
import Database from "@/Components/Database";
import { Suspense, useEffect } from "react";
import GetImages from "@/Components/GetImages";
import { useState } from "react";
import { requestLogs } from "@/lib/utils/requestLogs";
import Image from "next/image";
export default function RecentSearch({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {

    const [selected, setSelected] = useState("");
    const [logs, setLogs] = useState<any[]>([])
    const [image, setImage] = useState("")


    useEffect(() => {
        async function fetchLogsArray() {
            const dataTemp = await requestLogs(selected);
            setLogs(dataTemp)
        }
        if (selected) {
            fetchLogsArray()
        }

    }, [selected])




    function handleImage(imageURL: string): void {
        console.log(imageURL)
        setImage(imageURL)
    }

    return (

        <div className="flex sm:flex-row flex-col h-[85vh] ">

            <div className="bg-[#1f1f1f] flex-[3.5] rounded-xl sm:mr-3 p-3 sm:mb-0 mb-5 sm:h-[85vh] h-[40vh] overflow-scroll">
                <h2
                    className="font-semibold text-xl mb-5"
                >Recent Search</h2>
                <div className="flex flex-row h-full w-full">
                    <div className=" flex-1">
                        <div
                            className="bg-gradient-to-r from-pink-500 to-violet-600"
                        >
                        </div>
                    </div>
                    <div>
                    </div>
                    {searchParams?.tab === "recent-search" && (

                        <Suspense>
                            < GetImages setSelectedImage={setSelected} />
                        </Suspense>
                    )
                    }
                </div>
            </div>
            {searchParams?.tab === "recent-search" &&
                <div className="bg-[#1f1f1f] flex-[1.5] rounded-xl p-3 overflow-scroll">
                    <h2
                        className="font-semibold text-xl"
                    >Further Information</h2>
                    {logs[0]?.detection_results?.map((log: any, index: number) => <>
                        <button
                            onClick={() => handleImage(log.image)}

                            className='p-5 m-2 bg-[#1a1a1a] rounded-md'

                            key={index}>{log.timestamp}  {log.detected?.toString()} {log.video_id}</button>
                        {log.image === image &&
                            < Image
                                src={image}
                                alt="image to scan"
                                width={300}
                                height={300}
                                className="rounded-lg object-cover mr-10 overflow-hidden h-[300px]" />
                        }
                    </>)}
                </div>}
        </div>
    )
}


