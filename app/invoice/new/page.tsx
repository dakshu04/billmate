"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, ArrowLeft, Send } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"


interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

export default function CreateInvoice() {
  const [selectedClient, setSelectedClient] = useState("")
  const [invoiceNumber, setInvoiceNumber] = useState("INV-004")
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0])
  const [dueDate, setDueDate] = useState("")
  const [taxRate, setTaxRate] = useState(10)
  const [notes, setNotes] = useState("")
  const [items, setItems] = useState<InvoiceItem[]>([{ id: "1", description: "", quantity: 1, rate: 0, amount: 0 }])
  const [clients, setClients] = useState<{ id: string; name: string; email: string }[]>([])

  const router = useRouter()

   const invoiceRef = useRef<HTMLDivElement>(null)


 
  
  useEffect(() => {
    async function fetchClients() {
      try {
        // Call backend API to get saved clients of the logged-in user
        const res = await fetch("/api/clients/get")

        // If request failed → throw error
        if (!res.ok) throw new Error("Failed to load clients")

        // Parse response JSON into array of clients
        const data = await res.json()

        // Save clients into state
        setClients(data.clients)
        console.log("✅ Clients loaded:", data)
      } catch (err) {
        console.error("❌ Error loading clients:", err)
      }
    }
    fetchClients()
  }, [])

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "set your description",
      quantity: 1,
      rate: 0,
      amount: 0,
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === "quantity" || field === "rate") {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate
          }
          return updatedItem
        }
        return item
      }),
    )
  }

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  const taxAmount = (subtotal * taxRate) / 100
  const total = subtotal + taxAmount

  const selectedClientData = clients.find((client) => client.id === selectedClient)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()


    const invoiceData = {
      clientId: selectedClient,
      invoiceNumber,
      invoiceDate,
      dueDate,
      items,
      subtotal,
      taxRate,
      taxAmount,
      total,
      notes,
    }

      try {
        const res = await fetch("/api/invoices/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoiceData),
        })

        if (!res.ok) {
           // Log server response text so you know WHY it failed
          const errorText = await res.text()
          console.error("❌ API error response:", errorText)
          throw new Error("Failed to create invoice")
        }

        const data = await res.json()
        console.log("✅ Invoice saved:", data)
        router.push("/invoice")
        
         
        


        // optionally show success toast and redirect
      } catch (error) {
        console.error("❌ Error saving invoice:", error)
      }

    }


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Create Invoice</h1>
                <p className="text-sm text-muted-foreground">Generate a new invoice for your client</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left: Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
          {/* Invoice Details */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
              <CardDescription>Basic information about this invoice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="client">Select Client</Label>
                  <Select value={selectedClient} onValueChange={setSelectedClient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoice-number">Invoice Number</Label>
                  <Input
                    id="invoice-number"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    placeholder="INV-001"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoice-date">Invoice Date</Label>
                  <Input
                    id="invoice-date"
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input id="due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Invoice Items</CardTitle>
                  <CardDescription>Add items and services to this invoice</CardDescription>
                </div>
                <Button type="button" onClick={addItem} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-end">
                    <div className="col-span-12 md:col-span-5">
                      <Label htmlFor={`description-${item.id}`}>Description</Label>
                      <Input
                        id={`description-${item.id}`}
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        placeholder="Item description"
                      />
                    </div>

                    <div className="col-span-4 md:col-span-2">
                      <Label htmlFor={`quantity-${item.id}`}>Qty</Label>
                      <Input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", Number.parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="col-span-4 md:col-span-2">
                      <Label htmlFor={`rate-${item.id}`}>Rate</Label>
                      <Input
                        id={`rate-${item.id}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, "rate", Number.parseFloat(e.target.value) || 0)}
                      />
                    </div>

                    <div className="col-span-3 md:col-span-2">
                      <Label>Amount</Label>
                      <div className="h-10 px-3 py-2 bg-muted rounded-md flex items-center text-sm">
                        ${item.amount.toFixed(2)}
                      </div>
                    </div>

                    <div className="col-span-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              {/* Totals */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Subtotal:</span>
                  <span className="text-sm">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="tax-rate" className="text-sm font-medium">
                      Tax Rate (%):
                    </Label>
                    <Input
                      id="tax-rate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number.parseFloat(e.target.value) || 0)}
                      className="w-20"
                    />
                  </div>
                  <span className="text-sm">${taxAmount.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
              <CardDescription>Add any additional information or terms</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Payment terms, additional notes, etc."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Link href="/">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <Send className="w-4 h-4 mr-2" />
              Create Invoice
            </Button>
          </div>
            </form>

          {/* Right: Live Preview */}
          <div className="hidden lg:block">
            <Card className="sticky top-8 shadow-md" ref={invoiceRef}>
              <CardHeader>
                <CardTitle>Invoice Preview</CardTitle>
                <CardDescription>How your invoice will look</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold">{selectedClientData?.name || "Client Name"}</h2>
                  <p className="text-sm text-muted-foreground">{selectedClientData?.email || "Client Email"}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Invoice #:</span>
                  <span>{invoiceNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Invoice Date:</span>
                  <span>{invoiceDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Due Date:</span>
                  <span>{dueDate || "-"}</span>
                </div>

                <Separator />

                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.description || "Item"}</span>
                      <span>${item.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax ({taxRate}%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {notes && (
                  <>
                    <Separator />
                    <p className="text-sm text-muted-foreground">{notes}</p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          
        </div>
        
      </main>
    </div>
  )
}
