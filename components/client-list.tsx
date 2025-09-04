"use client"

import { useState, useEffect } from "react"
import { PlusIcon, Search } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent } from "./ui/card"
import Link from "next/link"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  gst?: string
  createdAt: string
}

export default function ClientListPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/clients/get")
        const data = await res.json()
        console.log("API Response:", data)

        if (!res.ok) throw new Error(data.message || "Failed to fetch clients")

        // ✅ Response has { clients: [...] }
        setClients(data.clients)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchClients()
  }, [])

  const filtered = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

   if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading all clients...</p>
        </div>
      </div>
    )
  }
  if (error) return <p className="m-5 text-red-500">{error}</p>

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-2 sm:px-0 flex justify-between items-center">
        <div>
          <h1 className="text-5xl pl-5 font-bold">Clients</h1>
          <p className="text-gray-500 pl-5 mt-1">
            Manage your clients and send invoices via WhatsApp
          </p>
        </div>
        <Link href="/clients/new" className="mr-5">
          <Button>
            <PlusIcon className="h-6 w-6 mr-2" />
            Add Client
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mt-4 mx-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* List */}
      <div className="space-y-3 mt-5 mx-5">
        {filtered.map((client) => (
          <Link href={`/clients/${client.id}`} key={client.id}>
          
          <Card
            key={client.id}
            className="cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{client.name}</h3>
                <p className="text-sm text-gray-500">{client.phone}</p>
              </div>
              <p className="text-sm text-gray-500">{client.email}</p>
              {client.company && (
                <p className="text-sm text-gray-600">{client.company}</p>
              )}
              {client.gst && (
                <p className="text-xs text-gray-400">GST: {client.gst}</p>
              )}
              <p className="text-xs text-gray-400">
                Added on {new Date(client.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="m-5 text-gray-500">No clients found</p>
        )}
      </div>
    </div>
  )
}
