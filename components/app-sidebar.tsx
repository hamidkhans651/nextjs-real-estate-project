"use client"

import * as React from "react"
import { useState } from "react";
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { Button}  from    "@/components/ui/button"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
 navMain: [
        {
            id: "properties",
            title: "Properties",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    id: "add-properties",
                    title: "Add properties",
                    url: "#",
                },
                {
                    id: "starred-properties",
                    title: "Starred",
                    url: "#",
                },
                {
                    id: "property-settings",
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            id: "models",
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    id: "genesis",
                    title: "Genesis",
                    url: "#",
                },
                {
                    id: "explorer",
                    title: "Explorer",
                    url: "#",
                },
                {
                    id: "quantum",
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
       
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [activeSection, setActiveSection] = useState("home"); // Manage active section

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                
          <aside className="w-1/4 h-screen  p-4">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveSection("home")}
              className="w-full text-left p-2  rounded"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("addProperties")}
              className="w-full text-left p-2"
            >
              Add Properties
            </button>
            <button
              onClick={() => setActiveSection("Addapartments")}
              className="w-full text-left p-2"
            >
              Addapartments
            </button>
          </li>
        </ul>
      </aside>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
