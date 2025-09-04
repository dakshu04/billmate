import { prisma } from "@/lib/db"
import { syncUser } from "@/lib/syncUser"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET() {
    await syncUser()
    try {
        const user = await currentUser()
        if(!user) {
            return NextResponse.json({
                message: "Unauthorized user"
            })
        }
        const prismaUser = await prisma.user.findUnique({
            where: { clerkId: user.id }
        })

        if(!prismaUser) {
            return NextResponse.json({
                message: "User not found in database"
            }, { status: 404 })
        }

        //Total clients
        const totalClients = await prisma.client.count({
            where: {
                userId: prismaUser.id
            }
        })

        //Total invoices
        const totalInvoices = await prisma.invoice.count({
            where: {
                userId: prismaUser.id
            }
        })


        // Status breakdown
         const draftCount = await prisma.invoice.count({
            where: { 
                userId: prismaUser.id,
                status: "draft"
            },
        })

        const sentCount = await prisma.invoice.count({
            where: {
                userId: prismaUser.id,
                status: "sent"
            }
        })

        const paidCount = await prisma.invoice.count({
            where: {
                userId: prismaUser.id,
                status: "paid"
            }
        })

         // ✅ Revenue collected (paid invoices)
        const revenueCollected = await prisma.invoice.aggregate({
            where: { userId: prismaUser.id, status: "paid" },
            _sum: { total: true },
        })

        // ✅ Pending amount (sent but not paid)
        const pendingAmount = await prisma.invoice.aggregate({
            where: { userId: prismaUser.id, status: "sent" },
            _sum: { total: true },
        })

        return NextResponse.json({
            totalClients,
            totalInvoices,
            draftCount,
            sentCount,
            paidCount,
            revenueCollected: revenueCollected._sum.total || 0,
            pendingAmount: pendingAmount._sum.total || 0,
        })
    } catch (error) {
        console.error("Error fetching dashboard summary:", error)
        return NextResponse.json(
        { error: "Failed to fetch dashboard summary" },
        { status: 500 }
        )
    }
}