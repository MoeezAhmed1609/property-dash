import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import TabsComponent from '../../components/TabsComponent'
import { TabPanel } from 'react-tabs'
import AboutView from './Component/AboutView'
import AddAbout from './Component/AddAbout'

export default function AboutUsGuide() {
    return (
        <DefaultLayout>

            <TabsComponent Header={['About', 'Add New']}>

                <TabPanel>
                    <AboutView />
                </TabPanel>
                <TabPanel>
                    <AddAbout
                     />
                </TabPanel>



            </TabsComponent>

        </DefaultLayout>
    )
}
