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
            <TabGroup defaultIndex={ searchParams?.tab === "recent-search"?1:0}>
                <TabList variant="solid">
                    <Link href={"/?tab=new-search"}>
                        <Tab value="1">New search</Tab>
                    </Link>
                    <Link href={"/?tab=recent-search"}>
                        <Tab value="2">Recent Searches</Tab>
                    </Link>
                </TabList>
            </TabGroup>
        </div>

    )
}
