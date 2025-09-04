"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save, User, Phone, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

interface ClientFormData {
  name: string
  phone: string
  gst: string
}

export function AddClientForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    phone: "",
    gst: "",
  })
  const [errors, setErrors] = useState<Partial<ClientFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

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
      // TODO: Replace with actual API call to save client
      console.log("[v0] Saving client:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to clients list on success
      router.push("/clients")
    } catch (error) {
      console.error("[v0] Error saving client:", error)
      setSubmitError("Failed to save client. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Client
            </>
          )}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/clients")} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>

      {/* Preview Card */}
      {(formData.name || formData.phone || formData.gst) && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-3">Preview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span>{formData.name || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span>{formData.phone || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST:</span>
                <span className="font-mono">{formData.gst || "—"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </form>
  )
}
