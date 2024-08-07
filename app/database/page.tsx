
import Image from "next/image";
import Sidebar from "../Sidebar"
import Database from "@/Components/Database";
import { Suspense } from "react";
import VideoFeed from "@/Components/VideoFeed";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GetImages from "@/Components/GetImages";
import UploadImage from "@/Components/UploadImage";
import RecentSearch from "@/Components/RecentSearch";
import Navbar from "@/Components/Navbar";
import NVRUpload from "@/Components/NVRUpload";
export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {




  return (
    <main className="flex min-h-screen flex-col sm:flex-row p-10 w-[100vw] h-[100vh] overflow-hidden">
      <>
        <Navbar />
        <div className=" sm:flex-[1]  ">

          <Suspense>
            <Sidebar />
          </Suspense>
        </div>
        <div className="flex-[5] mt-[50px]">
          <div className="flex sm:flex-row flex-col items-center sm:mb-3 mb-5 mt-5 sm:mt-0">

            <h1
              className="font-semibold text-2xl"
            >Database Search</h1>
            <p>
            </p>
            <Database params={params} searchParams={searchParams} />
          </div>
          <div className={searchParams?.tab === "recent-search" ? "block" : "hidden"}>
            < RecentSearch params={params} searchParams={searchParams} />
          </div>

          <div className={searchParams?.tab === "new-search" ? "block" : searchParams?.tab === undefined?"block":"hidden"}>
            <UploadImage />
          </div>

          <div className={searchParams?.tab === "nvr-upload" ? "block" : "hidden"}>
            <NVRUpload params={params} searchParams={searchParams}/>
          </div>

        </div>
      </>

    </main>
  );
}


