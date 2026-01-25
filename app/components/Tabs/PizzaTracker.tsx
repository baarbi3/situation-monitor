import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import PizzaCard from '../Pizza/PizzaCard'


const PizzaTracker = () => {
  return (
    <TabsContent value="pizza">
<div className="mx-auto max-w-6xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">


        <PizzaCard name="Dominos Pizza" link="https://maps.app.goo.gl/zYn2hREGFaCPbTPf7" />
        <PizzaCard name="Extreme Pizza" link="https://maps.app.goo.gl/dvebN4z5ZCRzDyhs7" />
        <PizzaCard name="District Pizza Place" link="https://maps.app.goo.gl/75qaow7zcDbUZacM9" />
        <PizzaCard name="We, The Pizza" link="https://maps.app.goo.gl/J2eL7JNPGrWVEbxr9" />
        <PizzaCard name="Pizzato" link="https://maps.app.goo.gl/djEgAt2MbAKdLT696" />
        <PizzaCard name="Papa Johns Pizza" link="https://maps.app.goo.gl/e6YCrH1aSeiL2B9M7" />
      </div>
    </TabsContent>
  )
}

export default PizzaTracker