/*
  Warnings:

  - The `status` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."InvoiceStatus" AS ENUM ('draft', 'sent', 'paid');

-- AlterTable
ALTER TABLE "public"."Invoice" DROP COLUMN "status",
ADD COLUMN     "status" "public"."InvoiceStatus" NOT NULL DEFAULT 'draft';
