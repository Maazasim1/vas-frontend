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

export default function VideoFeed({handleImage,id}:any) {
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    const eventSource = new EventSource(`http://127.0.0.1:5000/stream?image_id=${id}`);

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
          onClick={()=>handleImage("data:image/jpeg;base64,"+message.image)}
          
          className='p-5 m-2 bg-[#1a1a1a] rounded-md'
          
          key={index}>{message.timestamp}  {message?.detected.toString()}</button>
        ))}
      </ul>
    </div>
  );
}
