import { prisma } from "@/lib/db";
import { syncUser } from "@/lib/syncUser";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    
    await syncUser() // Ensure user is synced with your DB
    try {
        const { userId: clerkId } = await auth() // Clerk user id
        if (!clerkId) return new Response("Unauthorized", { status: 401 })

        // Find the user in your DB
        const user = await prisma.user.findUnique({ where: { clerkId } })
        if (!user) return new Response("User not found", { status: 404 })
        const body = await req.json()
        const { name, email, phone, gst, company } = body

        if (!name || !phone || !gst) {
            return NextResponse.json({
                message: "Name, Phone, and GST are required"
            }, {
                status: 400
            })
        }

        const client = await prisma.client.create({
            data: {
                name,
                email,
                phone,
                gst,
                company,
                userId: user.id
            }
        })
        return NextResponse.json(client, { status: 201 })
    } catch (error) {
        console.log("error is ", error)
        return NextResponse.json({
            message: "Something went wrong"
        }, {
            status: 500
        })
    }
}