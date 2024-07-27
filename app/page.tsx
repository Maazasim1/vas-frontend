'use client'

import Image from "next/image";
import Sidebar from "./Sidebar";
import Database from "@/Components/Database";
import { Suspense } from "react";
import VideoFeed from "@/Components/VideoFeed";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Home({
  database, stream
}:
  { database: React.ReactNode, stream: React.ReactNode }
) {
  const [image, setImage] = useState()
  const [OGimage, setOGImage] = useState()
  const [id, setId] = useState()
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

  function convertToBase64(file) {
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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    const image_id = uuidv4();

    const url = URL.createObjectURL(file)
    const base64: string = await convertToBase64(file)
    console.log(base64)
    try {

      await fetch("http://127.0.0.1:5000/upload_file", {
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
    <main className="flex min-h-screen flex-row p-10">
      <div className="flex-1">
        <Sidebar />
      
      </div>
      <div className="flex-[5]">
        <div className="flex flex-row items-center mb-3">

          <h1
            className="font-semibold text-2xl"
          >Database Search</h1>
          <Database />
        </div>

        <div className="flex flex-row h-[85vh]">

          <div className="bg-[#1f1f1f] flex-[3.5] rounded-xl mr-3 p-3">
            <h2
              className="font-semibold text-xl"
            >New Search</h2>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <div className="flex flex-row h-full w-full">
              <div className=" flex-1">
                <div
                  className="bg-gradient-to-r from-pink-500 to-violet-600"
                >

                </div>


                {/* <button>
                  Search
                </button> */}
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
          <div className="bg-[#1f1f1f] flex-[1.5] rounded-xl p-3 overflow-scroll">
            <h2
              className="font-semibold text-xl"
            >Further Information</h2>
            <Suspense fallback={<p>Loading feed...</p>}>
              {id && <VideoFeed handleImage={handleImage} id={id} />}
            </Suspense>



          </div>
        </div>
      </div>

    </main>
  );
}


