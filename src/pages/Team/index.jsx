import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import "./index.css"
import { TabPanel } from 'react-tabs'
import TabsComponent from '../../components/TabsComponent'
import TeamView from './Components/TeamView'
import AddNew from './Components/AddNew'

export default function Team() {
    return (
        <DefaultLayout>
            <TabsComponent Header={['Team', 'Add New']}>
                <TabPanel>
                    <TeamView />
                </TabPanel>
                
                <TabPanel>
                    <AddNew  />
                </TabPanel>

            </TabsComponent>


        </DefaultLayout>
    )
}
