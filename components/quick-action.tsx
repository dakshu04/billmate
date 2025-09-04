"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, UserPlus, FileText, Send } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link href="/clients/new" passHref>
        <Button className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Client
        </Button>
      </Link>

        <Button
          className="w-full justify-start bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => (window.location.href = "/invoices/new")}
        >
          <FileText className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start border-border text-foreground hover:bg-muted bg-transparent"
        >
          <Send className="h-4 w-4 mr-2" />
          Send Reminders
        </Button>
      </CardContent>
    </Card>
  )
}
