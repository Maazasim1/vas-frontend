
import Database from "@/Components/Database";
import { Suspense } from "react";
import GetImages from "@/Components/GetImages";
export default function RecentSearch({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {




    return (

        <div className="flex sm:flex-row flex-col h-[85vh] ">

            <div className="bg-[#1f1f1f] flex-[3.5] rounded-xl sm:mr-3 p-3 sm:mb-0 mb-5 sm:h-[85vh] h-[40vh] overflow-scroll">
                <h2
                    className="font-semibold text-xl mb-5"
                >Recent Search</h2>
                <div className="flex flex-row h-full w-full">
                    <div className=" flex-1">
                        <div
                            className="bg-gradient-to-r from-pink-500 to-violet-600"
                        >
                        </div>
                    </div>
                    <div>
                    </div>
                    {searchParams?.tab === "recent-search" && (

                        <Suspense>
                            < GetImages />
                        </Suspense>
                    )
                    }
                </div>
            </div>
            {searchParams?.tab === "recent-search" &&
                <div className="bg-[#1f1f1f] flex-[1.5] rounded-xl p-3 overflow-scroll">
                    <h2
                        className="font-semibold text-xl"
                    >Further Information</h2>
                </div>}
        </div>
    )
}


