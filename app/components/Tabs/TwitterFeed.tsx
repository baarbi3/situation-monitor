import React from 'react'
import FeedContainerc from '../Twitter/FeedContainer'
import { TabsContent } from '@/components/ui/tabs'

const TwitterFeed = () => {
  return (
    <TabsContent value="twitter">
      <FeedContainerc/>
    </TabsContent>
  )
}

export default TwitterFeed