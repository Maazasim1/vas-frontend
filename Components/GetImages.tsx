import React from 'react'
import { requestImages } from '@/lib/utils/requestImages';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
export default async function GetImages() {
    const data = await requestImages("mazzasimq1@gmail.com");

    return (
        <div className='grid sm:grid-cols-4 grid-cols-1 gap-4'>
            {data.map((images:{image:string,face_id:string}, index: number) =>
                <Image
                    key={index}
                    src={`data:image/jpeg;base64,${images.image}`}
                    alt="image to scan"
                    width={300}
                    height={300}
                    className="rounded-lg object-cover mr-10 overflow-hidden h-[300px]" />
            )
            }
        </div>
    )
}
