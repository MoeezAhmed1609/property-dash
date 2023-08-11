import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import TabsComponent from '../../components/TabsComponent'
import { TabPanel } from 'react-tabs'
import BlogContainer from './Components/BlogContainer'
import BlogForm from './Components/Widgets/BlogForm'

export default function Blog() {
  return (
    <DefaultLayout>
        <TabsComponent Header={['Blogs','Add New']}>
            <TabPanel>
                <BlogContainer />
            </TabPanel>
            
            <TabPanel>
                <BlogForm />
            </TabPanel>

        </TabsComponent>
    </DefaultLayout>
  )
}
