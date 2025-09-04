'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Eye, MoreHorizontal } from "lucide-react"
const recentInvoices = [
  {
    id: "INV-001",
    client: "Acme Corporation",
    amount: "$2,500",
    status: "paid",
    date: "2024-01-15",
    dueDate: "2024-01-30",
  },
  {
    id: "INV-002",
    client: "Tech Startup Inc.",
    amount: "$1,800",
    status: "sent",
    date: "2024-01-12",
    dueDate: "2024-01-27",
  },
  // {
  //   id: "INV-003",
  //   client: "Design Agency LLC",
  //   amount: "$3,200",
  //   status: "draft",
  //   date: "2024-01-10",
  //   dueDate: "2024-01-25",
  // },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800 border-green-200"
    case "sent":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "draft":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function RecentActivity() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-card-foreground flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Recent Invoices
        </CardTitle>
        <Button variant="outline" size="sm" className="text-xs bg-transparent">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/50"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{invoice.id}</span>
                    <Badge variant="outline" className={getStatusColor(invoice.status)}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{invoice.client}</p>
                  <p className="text-xs text-muted-foreground">Due: {invoice.dueDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-semibold text-foreground">{invoice.amount}</span>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
