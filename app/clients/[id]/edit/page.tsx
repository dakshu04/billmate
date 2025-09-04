import { EditClientForm } from "@/components/edit-client-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, UserCog } from "lucide-react"
import Link from "next/link"



export default function EditClientPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl"></div>
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/clients">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Clients
            </Button>
          </Link>
        </div>
    </div>
  )
}
