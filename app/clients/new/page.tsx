import { AddClientForm } from "@/components/add-client-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, UserPlus } from "lucide-react"
import Link from "next/link"

export default function NewClientPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/clients">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Clients
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Add New Client</h1>
            <p className="text-muted-foreground">Create a new client profile for invoicing</p>
          </div>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
            <CardDescription>Enter the client details to create a new profile</CardDescription>
          </CardHeader>
          <CardContent>
            <AddClientForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
