"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Phone, FileText, Plus, Edit, MoreHorizontal, Calendar, DollarSign, Eye, Download } from "lucide-react"
import Link from "next/link"

interface Client {
  id: number
  name: string
  phone: string
  gst: string
  status: "active" | "inactive"
  createdAt: string
  totalRevenue: number
  invoiceCount: number
}

interface Invoice {
  id: number
  number: string
  date: string
  dueDate: string
  amount: number
  status: "draft" | "sent" | "paid" | "overdue"
  description: string
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

const mockInvoices: Invoice[] = [
  {
    id: 1,
    number: "INV-001",
    date: "2024-03-01",
    dueDate: "2024-03-31",
    amount: 5000,
    status: "paid",
    description: "Web Development Services",
  },
  {
    id: 2,
    number: "INV-002",
    date: "2024-03-15",
    dueDate: "2024-04-15",
    amount: 3500,
    status: "sent",
    description: "UI/UX Design Consultation",
  },
  {
    id: 3,
    number: "INV-003",
    date: "2024-03-20",
    dueDate: "2024-04-20",
    amount: 2000,
    status: "draft",
    description: "Mobile App Development",
  },
]

interface ClientDetailsProps {
  clientId: string
}

export function ClientDetails({ clientId }: ClientDetailsProps) {
  const [client, setClient] = useState<Client | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchClientData = async () => {
      try {
        console.log("[v0] Fetching client data for ID:", clientId)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setClient(mockClient)
        setInvoices(mockInvoices)
      } catch (error) {
        console.error("[v0] Error fetching client:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClientData()
  }, [clientId])

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading client details...</p>
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
    <div className="space-y-6">
      {/* Client Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{client.name}</h1>
            <p className="text-muted-foreground">Client since {new Date(client.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/invoices/new?client=${client.id}`}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </Link>
          <Link href={`/clients/${client.id}/edit`}>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Client
            </Button>
          </Link>
        </div>
      </div>

      {/* Client Information Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Info</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{client.phone}</div>
            <p className="text-xs text-muted-foreground mt-1">Phone Number</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GST Number</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{client.gst}</div>
            <p className="text-xs text-muted-foreground mt-1">Tax Identification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${client.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime Value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{client.invoiceCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <Badge variant={client.status === "active" ? "default" : "secondary"} className="text-xs">
                {client.status}
              </Badge>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>All invoices for this client</CardDescription>
            </div>
            <Link href={`/invoices/new?client=${client.id}`}>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Invoice
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No invoices yet</h3>
              <p className="text-muted-foreground mb-4">Create your first invoice for this client</p>
              <Link href={`/invoices/new?client=${client.id}`}>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </Link>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.number}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right font-medium">${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/invoices/${invoice.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Invoice
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/invoices/${invoice.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Invoice
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
