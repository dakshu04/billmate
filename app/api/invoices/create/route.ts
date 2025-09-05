import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { generateInvoicePDF } from "@/lib/pdf";
import { uploadPDFToUploadThing } from "@/lib/upload";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    console.log("Current User:", user);
    if (!user) return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });

    const body = await req.json();
    const { clientId, invoiceNumber, invoiceDate, dueDate, items, taxRate, notes } = body;

    if (!clientId || !invoiceNumber || !dueDate || !items?.length) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const subtotal = items.reduce((sum: number, item: any) => sum + item.amount, 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    // Fetch client info for PDF
    const client = await prisma.client.findUnique({ where: { id: clientId } });
    if (!client) return NextResponse.json({ message: "Client not found" }, { status: 404 });

    // Generate PDF
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
    });

    // Upload PDF to UploadThing
    const uploadResult = await uploadPDFToUploadThing(pdfBytes, `${invoiceNumber}.pdf`);
    const pdfUrl = uploadResult?.url || null;

    // Save invoice in DB
    const invoice = await prisma.invoice.create({
      data: {
        userId: user.id,
        clientId,
        invoiceNo: invoiceNumber,
        items,
        subtotal,
        taxPercent: taxRate,
        taxAmount,
        total,
        notes,
        dueDate: new Date(dueDate),
        status: "draft",
        pdfUrl,
      },
    });

    return NextResponse.json({ message: "Invoice created successfully", invoice }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }
}
