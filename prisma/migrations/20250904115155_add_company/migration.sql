/*
  Warnings:

  - You are about to drop the column `Company` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Client" DROP COLUMN "Company",
ADD COLUMN     "company" TEXT;
