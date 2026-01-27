import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'
import React from 'react'

const FlightRadar = () => {
  return (
    <TabsContent value="radar">
      <div className="w-full max-w-[1200px] aspect-[6/5] mx-auto">
        <iframe
          src="https://www.airnavradar.com/?widget=1&z=7&lat=40.78200&lng=-74.16300"
          className="w-full h-full"
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>
    </TabsContent>  
  )
}

export default FlightRadar