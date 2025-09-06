// app/api/invoices/create/route.ts
import { prisma } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { generateInvoicePDF } from "@/lib/pdf"
import { uploadPDFToUploadThing } from "@/lib/upload"

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const prismaUser = await prisma.user.findUnique({ where: { clerkId: user.id } })
    if (!prismaUser) return NextResponse.json({ message: "User not found" }, { status: 404 })

    const body = await req.json()
    const { clientId, invoiceNumber, invoiceDate, dueDate, items, taxRate, notes, subtotal, total, taxAmount } = body

    if (!clientId || !invoiceNumber || !dueDate || !items?.length) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const client = await prisma.client.findUnique({ where: { id: clientId } })
    if (!client) return NextResponse.json({ message: "Client not found" }, { status: 404 })

    // Generate invoice PDF
    const pdfBytes = await generateInvoicePDF({
      invoiceNo: invoiceNumber,
      clientName: client.name,
      invoiceDate,
      dueDate,
      items,
      subtotal,
      taxPercent: taxRate,
      taxAmount,
      total,
      notes,
    })

    // Upload to storage
    const uploadResult = await uploadPDFToUploadThing(pdfBytes, `${invoiceNumber}.pdf`)
    const pdfUrl = uploadResult?.url || null

    const invoice = await prisma.invoice.create({
      data: {
        userId: prismaUser.id,
        clientId,
        invoiceNo: invoiceNumber,
        items,
        subtotal,
        taxPercent: taxRate,
        taxAmount,
        total,
        notes,
        dueDate: new Date(body.dueDate),
        status: "draft",
        pdfUrl,
      }
    })

    return NextResponse.json({ message: "Invoice created successfully", invoice }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 })
  }
}
