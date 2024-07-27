import React from 'react'
import { TabGroup, Tab, TabList } from '@tremor/react'

export default function Database() {
    return (
        <div className="mx-auto space-y-12">
            <TabGroup>
                <TabList variant="solid">
                    <Tab value="1">New search</Tab>
                    <Tab value="2">Recent Searches</Tab>
                </TabList>
            </TabGroup>
        </div>

    )
}
