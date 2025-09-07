import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

export function generateInvoicePDF(invoiceData: {
  clientName: string
  clientEmail: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  items: InvoiceItem[]
  subtotal: number
  taxPercent: number
  taxAmount: number
  total: number
  notes?: string
}) {
  const doc = new jsPDF()

  // Title
  doc.setFontSize(18)
  doc.text("Invoice", 14, 20)

  // Invoice info
  doc.setFontSize(12)
  doc.text(`Invoice #: ${invoiceData.invoiceNumber}`, 14, 30)
  doc.text(`Client: ${invoiceData.clientName}`, 14, 37)
  doc.text(`Email: ${invoiceData.clientEmail}`, 14, 44)
  doc.text(`Invoice Date: ${invoiceData.invoiceDate}`, 14, 51)
  doc.text(`Due Date: ${invoiceData.dueDate}`, 14, 58)

  // Items table
  const tableData = invoiceData.items.map((item) => [
    item.description || "-",
    item.quantity.toString(),
    item.rate.toFixed(2),
    item.amount.toFixed(2),
  ])

  autoTable(doc, {
    startY: 70,
    head: [["Description", "Quantity", "Rate", "Amount"]],
    body: tableData,
  })

  const finalY = (doc as any).lastAutoTable.finalY || 70

  // Totals
  doc.text(`Subtotal: $${invoiceData.subtotal.toFixed(2)}`, 140, finalY + 10)
  doc.text(`Tax (${invoiceData.taxPercent}%): $${invoiceData.taxAmount.toFixed(2)}`, 140, finalY + 17)
  doc.text(`Total: $${invoiceData.total.toFixed(2)}`, 140, finalY + 24)

  // Notes
  if (invoiceData.notes) {
    doc.setFontSize(11)
    doc.text("Notes:", 14, finalY + 40)
    doc.text(invoiceData.notes, 14, finalY + 47)
  }

  // Download file
  doc.save(`Invoice-${invoiceData.invoiceNumber}.pdf`)
}
