// import fetchVideoData from '@/app/lib/data';
// // ...

// export default async function VideoFeed() { // Make component async, remove the props
//     const logs: any[] | void = await fetchVideoData(); // Fetch data inside the component

//     //const chartHeight = 350;
//     // const { yAxisLabels, topLabel } = generateYAxis(logs);

//     if (!logs || logs.length === 0) {
//         return <p className="mt-4 text-gray-400">No data available.</p>;
//     }

//     return <p className="mt-4 text-gray-400">No data available.</p>;
// }

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { MdFormatListNumbered, MdOutlineAccessTime, MdOutlinePermIdentity, MdLinkedCamera } from "react-icons/md";
import Image from 'next/image';
import Link from 'next/link';
import { BACKEND_URL } from '@/config'
import { useRouter } from 'next/navigation';

export default function VideoFeed({ handleImage, id, setId, setVideoCount, setOGImage, type }: any) {
  const [messages, setMessages] = useState<any[]>([]);

  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    const eventSource = new EventSource(BACKEND_URL + `/stream/${type}?image_id=${id}&email=${session.data?.user?.email}` || `https://vas-ech6h7cfgchdh2f2.southeastasia-01.azurewebsites.net/stream?image_id=${id}&email=${session.data?.user?.email}`);

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      if (newMessage.completed) {
        alert(newMessage.completed)
        //eventSource.close()
        //return;
      }
      if (newMessage["Video Completion"]) {
        alert(newMessage["Video Completion"])
        setVideoCount(0)
        eventSource.close()
        handleCancel()
        return;
      }
      if (newMessage.video_count) {
        console.log(`video ${newMessage.video_count} has completed processing`)
        setVideoCount(newMessage.video_count);
      }
      else {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);




  function handleImageClick(image: string): void {
    if (image) {
      
      window.open(image, '_blank')?.focus()
    }

  }

  //   const messages=[
  //     {
  //         image:"/profile.jpg",
  //         timestamp:"2021-20-21",
  //         stream:"video 1"
  //     }
  //   ]
  function handleCancel() {
    setOGImage()
    setId("")
  }



  return (
    <div>

      {/* <p>Passed: {(messages.filter((message)=>message.detected)).length}</p>
        <p>Failed: {(messages.filter((message)=>!message.detected)).length}</p> */}
      <table className='p-5 w-full'>
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
            <th>
              <button onClick={handleCancel} className='bg-red-500 px-3 py-2 rounded-lg'>Cancel</button>
            </th>
          </tr>
        </thead>
        {messages.length > 0 ? (

          <tbody>
            {messages && messages.map((message, index) => (
              // <Link key={index} href={message.image} target='_blank'>
              <tr className='border-b-2 bg-[#151c1e] border-[#2f2f2f] cursor-pointer' onClick={() => handleImageClick(message.image)}>
                <td>{index}</td>
                <td><div className='flex flex-row items-center'>{<img src={message.image} alt="detected frames" width={30} height={30} className='mr-4 rounded-full aspect-square object-cover' />} Furqan Tariq</div></td>
                <td>{message.timestamp}</td>
                {/* <td>{message?.detected.toString()}</td> */}
                <td>P-1</td>
                <td>C-1</td>
              </tr>
              // </Link>
            ))}
          </tbody>
        ) : (
          <div className='flex  justify-center items-center sm:h-[65vh] h-[80vh]'>

            <h1 className='font-bold'>Hang on, we're trying to recognize your friend</h1>
          </div>
        )
        }
      </table>
    </div>
  );
}
