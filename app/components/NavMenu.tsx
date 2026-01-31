import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Cards from './Cards'
import { Button } from '@/components/ui/button'
import { Monitor, Star } from 'lucide-react'
import Link from 'next/link'

const NavMenu = () => {
  return (
    <Tabs defaultValue="polymarket" className="w-full">
      <div className="flex items-center justify-between w-full px-4 py-2">
        {/* Right side - Text */}
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Blitzkrieg Monitor
        </h4>        
        {/* Center - Tabs */}
        <TabsList className="h-16 w-full max-w-md rounded-2xl bg-muted grid grid-cols-4 gap-2 px-2">
          <TabsTrigger value="twitter">News Feed</TabsTrigger>
          <TabsTrigger value="radar">Flight Radar</TabsTrigger>
          <TabsTrigger value="pizza">Pizza Tracker</TabsTrigger>
          <TabsTrigger value="polymarket">Polymarket</TabsTrigger>
        </TabsList>
        
        {/* Left side - Button */}
        <Button variant={"outline"} asChild>
          <Link href={"https://github.com/baarbi3/situation-monitor"} target='_blank'><Star/> Star us on Github</Link>
        </Button>

      </div>
      
      {/* Tab Content below */}
      <Cards />
    </Tabs>
  )
}

export default NavMenu