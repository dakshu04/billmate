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
import { Toaster } from "./ui/sonner"
import { toast } from "sonner"

interface ClientFormData {
  name: string
  email : string
  phone: string
  gst: string
  company ?: string
}

export function AddClientForm() {
  const router = useRouter()
  
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    email: "",
    phone: "",
    gst: "",
    company: "",
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
      const response = await fetch("/api/clients/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if(response.ok) {
        toast("Client added successfully")
        setFormData({ name: "", email: "", phone: "", gst: "", company: "" })
      } else {
        const data = await response.json()
        toast(data.error || "Something went wrong")
      }

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
      {/* Client Email */}
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter client email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
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

      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="company" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Company Name
        </Label>
        <Input
          id="company"
          type="text"
          placeholder="Company Name"
          value={formData.company}
          onChange={(e) => handleInputChange("company", e.target.value.toUpperCase())}
          className={errors.company ? "border-destructive" : ""}
        />
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
      {(formData.name || formData.phone || formData.gst || formData.company) && (
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
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company:</span>
                <span className="font-mono">{formData.company || "—"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </form>
  )
}
