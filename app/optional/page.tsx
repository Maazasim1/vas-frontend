import Image from "next/image";
import Sidebar from "../Sidebar";
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
import { FEATURES } from "@/config";
import Navbar from "@/Components/Navbar";

type FeatureKey = keyof typeof FEATURES;

export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { feature: string };
}) {
    const featureKey = searchParams?.feature as FeatureKey;

    return (
        <main className="flex min-h-screen flex-col sm:flex-row p-10">
            <>
                <Navbar />
                <div className="sm:flex-[1]">
                    <Suspense>
                        <Sidebar />
                    </Suspense>
                </div>
                <div className="flex-[5]">
                    <div className="flex sm:flex-row flex-col items-center sm:mb-3 mb-5 mt-5 sm:mt-0">
                        <h1 className="font-semibold text">On-Demand</h1>
                    </div>
                    {featureKey && FEATURES[featureKey] && (
                        <>
                            <h1 className="font-semibold text-xl">
                                {FEATURES[featureKey].heading}
                            </h1>
                            <div className="bg-[#1f1f1f] rounded-xl sm:mr-3 p-3 mt-5">
                                <p>{FEATURES[featureKey].description}</p>
                            </div>
                        </>
                    )}
                </div>
            </>
        </main>
    );
}
