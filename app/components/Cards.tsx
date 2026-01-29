import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import PizzaTracker from "./Tabs/PizzaTracker"
import FlightRadar from "./Tabs/FlightRadar"
import TwitterFeed from "./Tabs/TwitterFeed"
import PolymarketPredictions from "./Tabs/PolymarketPredictions"

const Cards = () => {
  return (
    <Tabs defaultValue="polymarket">
      <TabsList
        className="mx-auto h-16 w-full max-w-md rounded-2xl bg-muted grid grid-cols-4 gap-2 px-2"
      >
        <TabsTrigger value="twitter">Twitter Feed</TabsTrigger>
        <TabsTrigger value="radar">Flight Radar</TabsTrigger>
        <TabsTrigger value="pizza">Pizza Tracker</TabsTrigger>
        <TabsTrigger value="polymarket">Polymarket</TabsTrigger>
      </TabsList>
      <FlightRadar />
      <PizzaTracker />
      <TwitterFeed />
      <PolymarketPredictions/>
    </Tabs>
  )
}

export default Cards