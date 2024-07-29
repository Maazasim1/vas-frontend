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

export default function VideoFeed({handleImage,id}:any) {
  const [messages, setMessages] = useState<any[]>([]);
  const session=useSession()


  useEffect(() => {
    const eventSource = new EventSource(`https://vas-ech6h7cfgchdh2f2.southeastasia-01.azurewebsites.net/stream?image_id=${id}&email=${session.data?.user?.email}`);

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log(newMessage)
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);



//   const messages=[
//     {
//         image:"/profile.jpg",
//         timestamp:"2021-20-21",
//         stream:"video 1"
//     }
//   ]

    

  return (
    <div>
        <p>Passed: {(messages.filter((message)=>message.detected)).length}</p>
        <p>Failed: {(messages.filter((message)=>!message.detected)).length}</p>
      <ul>
        {messages.map((message, index) => (
         <button 
          onClick={()=>handleImage(message.image)}
          
          className='p-5 m-2 bg-[#1a1a1a] rounded-md'
          
          key={index}>{message.timestamp}  {message?.detected.toString()}</button>
        ))}
      </ul>
    </div>
  );
}
