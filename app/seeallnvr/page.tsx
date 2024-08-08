
import Sidebar from "../Sidebar"
import Database from "@/Components/Database";
import { Suspense } from "react";
import UploadImage from "@/Components/UploadImage";
import RecentSearch from "@/Components/RecentSearch";
import Navbar from "@/Components/Navbar";
import NVRUpload from "@/Components/NVRUpload";
import SeeAllBox from "@/Components/SeeAllBox";
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
            >See All Videos(NVR)</h1>
            <p>
            </p>
           
          </div>
        

          <div >
            <SeeAllBox params={params} searchParams={searchParams}/>
          </div>

        </div>
      </>

    </main>
  );
}


