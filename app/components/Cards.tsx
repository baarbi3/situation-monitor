import { TabsContent } from '@/components/ui/tabs'
import FlightRadar from './Tabs/FlightRadar'
import PizzaTracker from './Tabs/PizzaTracker'
import PolymarketPredictions from './Tabs/PolymarketPredictions'
import TwitterFeed from './Tabs/TwitterFeed'

const Cards = () => {
  return (
    <>
      <TabsContent value="radar">
        <FlightRadar />
      </TabsContent>
      <TabsContent value="pizza">
        <PizzaTracker />
      </TabsContent>
      <TabsContent value="twitter">
        <TwitterFeed />
      </TabsContent>
      <TabsContent value="polymarket">
        <PolymarketPredictions />
      </TabsContent>
    </>
  )
}

export default Cards