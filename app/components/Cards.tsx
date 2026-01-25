import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import PizzaTracker from "./Tabs/PizzaTracker"
import FlightRadar from "./Tabs/FlightRadar"

const Cards = () => {
  return (
    <Tabs defaultValue="twitter">
      <TabsList
        className="mx-auto h-16 w-full max-w-md rounded-2xl bg-muted flex items-center justify-center gap-4 px-6">
        <TabsTrigger value="twitter" className="px-6 py-2 rounded-xl">Twitter Feed</TabsTrigger>
        <TabsTrigger value="radar" className="px-6 py-2 rounded-xl">Flight Radar</TabsTrigger>
        <TabsTrigger value="pizza" className="px-6 py-2 rounded-xl">Pizza Tracker</TabsTrigger>
      </TabsList>
      <FlightRadar />
      <PizzaTracker />
    </Tabs>
  )
}

export default Cards