'use client'
import React, { useEffect, useState } from 'react'
import { requestImages } from '@/lib/utils/requestImages';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Loader from './Loader';
export default function GetImages({ setSelectedImage }: any) {
    const session = useSession()
    const [data, setData] = useState<any[]>([])
    if (!session) {
        return
    }
    useEffect(() => {
        async function setImage() {
            const dataTemp = await requestImages(session.data?.user?.email as string);
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

            {data?.map((images: { up_image: string, up_image_id: string }, index: number) =>
                <button
                    key={index}
                    onClick={() => setSelectedImage(images.up_image_id)}
                >
                    {images.up_image.includes("videos") ? (
                        <div >
                            <video src={images.up_image} autoPlay muted loop onLoad={()=>{<Loader Height={30} Width={30}/>}}/>
                            <Link href={images.up_image} target="_blank" className='text-white z-20 p-5 py-1 mt-5 bg-blue-900 rounded-lg'>View</Link>
                        </div>
                    )
                        :
                        (<Image
                            src={images.up_image}
                            alt="image to scan"
                            width={300}
                            height={300}
                            className="rounded-lg object-cover mr-10 overflow-hidden h-[300px]" />)}
                </button>
            )
            }
        </div>
    )
}
