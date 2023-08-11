import { Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'

export default function ChakaruiTabs({TabHeaders,children}) {
  return (
    <Tabs variant='enclosed'>
      {TabHeaders.map((item)=>{
        return (
            <TabList>
                <Tab>{item}</Tab>
            </TabList>
        )
      })}

      <TabPanels>
        {children}
      </TabPanels>
    </Tabs>
  )
}
