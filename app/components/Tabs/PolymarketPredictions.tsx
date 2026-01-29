import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import PolyMain from '../Polymarket/PolyMain'

const PolymarketPredictions = () => {
  return (
    <TabsContent value="polymarket">
      <PolyMain/>
    </TabsContent>
  )
}

export default PolymarketPredictions