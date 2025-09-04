import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, DollarSign, TrendingUp } from "lucide-react"

const summaryData = [
  {
    title: "Total Clients",
    value: "24",
    change: "+2 this month",
    icon: Users,
    trend: "up",
  },
  {
    title: "Total Invoices",
    value: "156",
    change: "12 Draft • 8 Sent • 136 Paid",
    icon: FileText,
    trend: "neutral",
  },
  {
    title: "Revenue Collected",
    value: "$48,250",
    change: "+12% from last month",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Pending Amount",
    value: "$3,420",
    change: "8 invoices pending",
    icon: TrendingUp,
    trend: "neutral",
  },
]

export function SummaryCards() {
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
