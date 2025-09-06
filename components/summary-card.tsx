import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, DollarSign, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

interface SummaryData {
  totalClients: number
  totalInvoices: number
  revenueCollected: number
  pendingAmount: number
  draftCount: number
  sentCount: number
  paidCount: number
}

export function SummaryCards() {
  const [data, setData] = useState<SummaryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchSummary = async() => {
      try {
        const res = await fetch("/api/dashboard/summary")
        if(!res.ok) {
          throw new Error("Failed to fetch summary data")
        }
        const summary = await res.json();
        console.log("Summary data:", summary)
        setData(summary)
      } catch (error) {
        setLoading(false)
        return setError("Failed to fetch summary data")
      } finally {
        setLoading(false)
      }
    }
    fetchSummary()
  }, [])

    if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading summary...</p>
        </div>
      </div>
    )
  }
    if (error) return <p className="text-red-500">{error}</p>
    if (!data) return null

  const summaryData = [
    {
      title: "Total Clients",
      value: data.totalClients.toString(),
      change: `+${data.totalClients} overall`,
      icon: Users,
    },
    {
      title: "Total Invoices",
      value: data.totalInvoices.toString(),
      change: `${data.draftCount} Draft • ${data.sentCount} Sent • ${data.paidCount} Paid`,
      icon: FileText,
    },
    {
      title: "Revenue Collected",
      value: `₹${data.revenueCollected.toLocaleString("en-IN")}`,
      change: "+ compared to last month", // you can compute growth later
      icon: DollarSign,
    },
    {
      title: "Pending Amount",
      value: `₹${data.pendingAmount.toLocaleString("en-IN")}`,
      change: `${data.sentCount} invoices pending`,
      icon: TrendingUp,
    },
  ]


  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item, index) => {
        const Icon = item.icon
        return (
          <Card key={index} className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{item.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{item.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{item.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
