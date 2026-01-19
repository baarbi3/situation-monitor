"use client"

import * as React from "react"
import {
  Pizza,
  PlaneTakeoff,
  X,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {

  navMain: [
    {
      title: "Pizza Index",
      url: "#",
      icon: Pizza,
    },
    {
      title: "Flight Radar",
      url: "#",
      icon: PlaneTakeoff,
    },
    {
      title: "Twitter Feed",
      url: "#",
      icon: X,
      isActive: true,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  )
}
