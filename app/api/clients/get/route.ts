import { prisma } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      )
    }

    // ✅ Find matching Prisma user via Clerk ID
    const prismaUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    })

    if (!prismaUser) {
      return NextResponse.json(
        { message: "User not found in database" },
        { status: 404 }
      )
    }

    // ✅ Fetch clients for that Prisma user
    const clients = await prisma.client.findMany({
      where: { userId: prismaUser.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ clients }, { status: 200 })
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    )
  }
}
