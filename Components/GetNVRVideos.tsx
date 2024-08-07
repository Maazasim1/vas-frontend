'use client'
import React, { useEffect, useState } from 'react'
import { requestImages } from '@/lib/utils/requestImages';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Loader from './Loader';
import { requestNVR } from '@/lib/utils/requestNVR';
export default function GETNVRVideos({ setSelectedImage }: any) {
    const session = useSession()
    const [data, setData] = useState<any[]>([])
    if (!session) {
        return
    }
    useEffect(() => {
        async function setImage() {
            const dataTemp = await requestNVR();
            if (dataTemp.length > 0) {
                setData(dataTemp)
            }
            else {
                setData([])
            }

        }
        setImage()
    }, [session])

    return (
        <div className='grid sm:grid-cols-2 grid-cols-1 gap-4 no-scrollbar'>

            {data?.map((images: string, index: number) =>
                <button
                    key={index}
                   
                >  
                        <div >
                            <video src={images} autoPlay muted loop onLoad={()=>{<Loader Height={30} Width={30}/>}}/>
                            <Link href={images} target="_blank" className='text-white z-20 p-5 py-1 mt-5 bg-blue-900 rounded-lg'>View</Link>
                        </div>
                </button>
            )
            }
        </div>
    )
}
