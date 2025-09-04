import { EditClientForm } from "@/components/edit-client-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, UserCog } from "lucide-react"
import Link from "next/link"

interface EditClientPageProps {
  params: {
    id: string
  }
}

export default function EditClientPage({ params }: EditClientPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6">
          <Link href={`/clients/${params.id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Client
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <UserCog className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Client</h1>
            <p className="text-muted-foreground">Update client information and details</p>
          </div>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
            <CardDescription>Update the client details below</CardDescription>
          </CardHeader>
          <CardContent>
            <EditClientForm clientId={params.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
