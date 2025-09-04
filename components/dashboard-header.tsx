'use client'

import { Calendar, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"

export function DashboardHeader() {
    const {user}  =  useUser()
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold text-foreground text-balance">Welcome back, {user?.firstName}</h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {currentDate}
            </p>
        </div>

        <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="relative bg-transparent">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-accent rounded-full"></span>
            </Button>
        </div>
        </div>
  )
}
