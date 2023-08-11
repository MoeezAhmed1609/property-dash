import React from 'react'
import { Tab, TabList, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';


export default function TabsComponent({ children, Header}) {
    return (
        <Tabs  >
            <TabList>
                {
                    Header.map((item) => {
                        return (
                            <Tab>{item}</Tab>
                        )
                    })
                }

            </TabList>

            {children}

        </Tabs>
    )
}
