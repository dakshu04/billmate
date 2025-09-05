import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generateInvoicePDF(invoice: {
  invoiceNo: string;
  clientName: string;
  invoiceDate: string;
  dueDate: string;
  items: { description: string; quantity: number; rate: number; amount: number }[];
  subtotal: number;
  taxPercent: number;
  taxAmount: number;
  total: number;
  notes?: string;
}) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 750]);
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = height - 50;

  page.drawText(`Invoice #${invoice.invoiceNo}`, { x: 50, y, font, size: 18, color: rgb(0, 0, 0) });
  y -= 30;
  page.drawText(`Client: ${invoice.clientName}`, { x: 50, y, font, size: 12 });
  y -= 20;
  page.drawText(`Invoice Date: ${invoice.invoiceDate}`, { x: 50, y, font, size: 12 });
  y -= 20;
  page.drawText(`Due Date: ${invoice.dueDate}`, { x: 50, y, font, size: 12 });

  y -= 30;
  page.drawText("Items:", { x: 50, y, font, size: 14 });
  y -= 20;

  invoice.items.forEach((item) => {
    page.drawText(
      `${item.description} - Qty: ${item.quantity}, Rate: $${item.rate.toFixed(
        2
      )}, Amount: $${item.amount.toFixed(2)}`,
      { x: 60, y, font, size: 12 }
    );
    y -= 15;
  });

  y -= 10;
  page.drawText(`Subtotal: $${invoice.subtotal.toFixed(2)}`, { x: 50, y, font, size: 12 });
  y -= 15;
  page.drawText(`Tax (${invoice.taxPercent}%): $${invoice.taxAmount.toFixed(2)}`, { x: 50, y, font, size: 12 });
  y -= 15;
  page.drawText(`Total: $${invoice.total.toFixed(2)}`, { x: 50, y, font, size: 12 });

  if (invoice.notes) {
    y -= 30;
    page.drawText(`Notes: ${invoice.notes}`, { x: 50, y, font, size: 12 });
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes; // Uint8Array
}
