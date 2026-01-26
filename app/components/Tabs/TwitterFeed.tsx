import React from 'react'
import UsernameLogic from '../Twitter/UsernameLogic'
import { TabsContent } from '@/components/ui/tabs'

const TwitterFeed = () => {
  return (
    <TabsContent value="twitter">
      <UsernameLogic/>
    </TabsContent>
  )
}

export default TwitterFeed