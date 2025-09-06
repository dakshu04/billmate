import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

interface PDFData {
  invoiceNo: string
  clientName: string
  invoiceDate: string
  dueDate: string
  items: any[]
  subtotal: number
  taxPercent: number
  taxAmount: number
  total: number
  notes?: string
}

export async function generateInvoicePDF(data: PDFData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([600, 800])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  let y = 750
  const drawText = (text: string, x: number, fontSize = 12) => {
    page.drawText(text, { x, y, size: fontSize, font, color: rgb(0, 0, 0) })
    y -= fontSize + 5
  }

  drawText(`Invoice #: ${data.invoiceNo}`, 50, 14)
  drawText(`Client: ${data.clientName}`, 50, 14)
  drawText(`Date: ${data.invoiceDate}`, 50)
  drawText(`Due: ${data.dueDate}`, 50)
  y -= 20

  drawText("Items:", 50, 14)
  data.items.forEach((item) => {
    drawText(`${item.description} - ${item.quantity} x ${item.rate} = ${item.amount}`, 60)
  })

  y -= 20
  drawText(`Subtotal: ${data.subtotal}`, 50)
  drawText(`Tax (${data.taxPercent}%): ${data.taxAmount}`, 50)
  drawText(`Total: ${data.total}`, 50, 14)

  if (data.notes) {
    y -= 20
    drawText(`Notes: ${data.notes}`, 50)
  }

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}
