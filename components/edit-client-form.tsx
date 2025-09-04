"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DeleteClientDialog } from "@/components/delete-client-dialog"
import { Loader2, Save, User, Phone, FileText, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface ClientFormData {
  name: string
  phone: string
  gst: string
}

interface Client extends ClientFormData {
  id: number
  status: "active" | "inactive"
  createdAt: string
  totalRevenue: number
  invoiceCount: number
}

// Mock data - replace with actual data fetching
const mockClient: Client = {
  id: 1,
  name: "Acme Corporation",
  phone: "+1 (555) 123-4567",
  gst: "GST123456789",
  status: "active",
  createdAt: "2024-01-15",
  totalRevenue: 45000,
  invoiceCount: 12,
}

interface EditClientFormProps {
  clientId: string
}

export function EditClientForm({ clientId }: EditClientFormProps) {
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    phone: "",
    gst: "",
  })
  const [errors, setErrors] = useState<Partial<ClientFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [submitError, setSubmitError] = useState("")
  const [hasChanges, setHasChanges] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    const fetchClient = async () => {
      try {
        console.log("[v0] Fetching client for edit:", clientId)
        // TODO: Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        setClient(mockClient)
        setFormData({
          name: mockClient.name,
          phone: mockClient.phone,
          gst: mockClient.gst,
        })
      } catch (error) {
        console.error("[v0] Error fetching client:", error)
        setSubmitError("Failed to load client data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchClient()
  }, [clientId])

  const validateForm = (): boolean => {
    const newErrors: Partial<ClientFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Client name is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-$$$$]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.gst.trim()) {
      newErrors.gst = "GST number is required"
    } else if (!/^GST[A-Z0-9]{9,15}$/i.test(formData.gst)) {
      newErrors.gst = "Please enter a valid GST number (e.g., GST123456789)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof ClientFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Check if there are changes
    if (client) {
      const originalValue = client[field]
      const hasFieldChanges = value !== originalValue
      const otherFieldsChanged = Object.keys(formData).some(
        (key) => key !== field && formData[key as keyof ClientFormData] !== client[key as keyof ClientFormData],
      )
      setHasChanges(hasFieldChanges || otherFieldsChanged)
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Replace with actual API call to update client
      console.log("[v0] Updating client:", { id: clientId, ...formData })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to client details on success
      router.push(`/clients/${clientId}`)
    } catch (error) {
      console.error("[v0] Error updating client:", error)
      setSubmitError("Failed to update client. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = () => {
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = async (deleteInvoices: boolean) => {
    console.log("[v0] Deleting client:", clientId, "with invoices:", deleteInvoices)

    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    router.push("/clients")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading client data...</p>
        </div>
      </div>
    )
  }

  if (!client) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Client not found. Please check the client ID and try again.</AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {submitError && (
          <Alert variant="destructive">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        {/* Client Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Client Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter client name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </div>

        {/* GST Number */}
        <div className="space-y-2">
          <Label htmlFor="gst" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            GST Number
          </Label>
          <Input
            id="gst"
            type="text"
            placeholder="GST123456789"
            value={formData.gst}
            onChange={(e) => handleInputChange("gst", e.target.value.toUpperCase())}
            className={errors.gst ? "border-destructive" : ""}
          />
          {errors.gst && <p className="text-sm text-destructive">{errors.gst}</p>}
          <p className="text-xs text-muted-foreground">Format: GST followed by alphanumeric characters</p>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between pt-4">
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Client
          </Button>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/clients/${clientId}`)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !hasChanges}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Client
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Changes Preview */}
        {hasChanges && (
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-3">Pending Changes</h3>
              <div className="space-y-2 text-sm">
                {formData.name !== client.name && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span>
                      {client.name} → {formData.name}
                    </span>
                  </div>
                )}
                {formData.phone !== client.phone && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span>
                      {client.phone} → {formData.phone}
                    </span>
                  </div>
                )}
                {formData.gst !== client.gst && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST:</span>
                    <span className="font-mono">
                      {client.gst} → {formData.gst}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Client Stats */}
        <Card className="bg-card">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-3">Client Statistics</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Invoices:</span>
                <span className="font-medium">{client.invoiceCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Revenue:</span>
                <span className="font-medium">${client.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className={`font-medium ${client.status === "active" ? "text-green-600" : "text-gray-600"}`}>
                  {client.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Client Since:</span>
                <span className="font-medium">{new Date(client.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      <DeleteClientDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        clientName={client?.name || ""}
        invoiceCount={client?.invoiceCount || 0}
      />
    </>
  )
}
