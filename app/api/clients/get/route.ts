import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const user  = await currentUser()
        if(!user) {
            return NextResponse.json({
                message: "Unauthorized user"
            }, {status: 401}
        )
        }

        const clients = await prisma.client.findMany({
            where: {
                userId: user.id
            }, 
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(clients, {
            status: 200
        })
    } catch (error) {
        console.error("Error fetching clients:", error);
        return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
    }
}