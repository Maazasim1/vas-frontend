import React from 'react'
import { TabGroup, Tab, TabList } from '@tremor/react'
import Link from 'next/link'

export default function Database({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    return (
        <div className="mx-auto space-y-12">
            <TabGroup defaultIndex={ searchParams?.tab === "recent-search"?1:searchParams?.tab==="recent-search"?2:3}>
                <TabList variant="solid">
                    <Link href={"/database?tab=new-search"}>
                        <Tab value="1">New search</Tab>
                    </Link>
                    <Link href={"/database?tab=recent-search"}>
                        <Tab value="2">Recent Searches</Tab>
                    </Link>
                    <Link href={"/database?tab=nvr-upload"}>
                        <Tab value="3">Upload to NVR</Tab>
                    </Link>
                </TabList>
            </TabGroup>
        </div>

    )
}
