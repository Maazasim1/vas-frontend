import React from 'react'
import { MdFormatListNumbered, MdOutlineAccessTime, MdOutlinePermIdentity, MdLinkedCamera } from "react-icons/md";
import Image from 'next/image';

export default function RecentSearchImages({ messages }: { messages: any[] }) {
    function handleImageClick(image: any): void {
        if (image) {

            window.open(image, '_blank')?.focus()
          }
    }

    return (
        <><table className='p-5 w-full'>
            <thead className='bg-[#1d2224] p-10'>
                <tr>
                    <th>
                        <div className='flex flex-row items-center mr-3'>
                            <MdFormatListNumbered className='mr-3' /> Number
                        </div>
                    </th>
                    <th>
                        <div className='flex flex-row items-center mr-3'>
                            <MdOutlinePermIdentity className='mr-3' /> Person
                        </div>
                    </th>
                    <th>
                        <div className='flex flex-row items-center'>
                            <MdOutlineAccessTime className='mr-3' /> Time
                        </div>
                    </th>
                    <th>
                        <div className='flex flex-row items-center'>
                            <MdOutlinePermIdentity className='mr-3' /> Person ID
                        </div>
                    </th>
                    <th>
                        <div className='flex flex-row items-center'>
                            <MdLinkedCamera className='mr-3' /> Camera ID
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {messages?.map((message, index) => (
                    // <Link key={index} href={message.image} target='_blank'>
                    <tr className='border-b-2 bg-[#151c1e] border-[#2f2f2f] cursor-pointer' onClick={() => handleImageClick(message.image)}>
                        <td>{index}</td>
                        <td><div className='flex flex-row items-center'>{<img src={message.image} alt="detected frames" width={30} height={30} className='mr-4 rounded-full aspect-square object-cover' />} Furqan Tariq</div></td>
                        <td>{new Date(message.timestamp).toDateString()}</td>
                        {/* <td>{message?.detected.toString()}</td> */}
                        <td>P-1</td>
                        <td>C-1</td>
                    </tr>
                    // </Link>
                ))}
            </tbody>
        </table></>
    )
}
