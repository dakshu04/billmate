/*
  Warnings:

  - A unique constraint covering the columns `[email,userId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoiceNo,userId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Client_email_key";

-- DropIndex
DROP INDEX "public"."Invoice_invoiceNo_key";

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_userId_key" ON "public"."Client"("email", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNo_userId_key" ON "public"."Invoice"("invoiceNo", "userId");
