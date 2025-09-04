import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./db";

export async function syncUser() {
    const user = await currentUser()
    if(!user) {
        return null;
    }

    // check if already exists
    let existingUser = await prisma.user.findFirst({
        where:{
            clerkId: user.id
        }
    })

    if(!existingUser) {
        existingUser = await prisma.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress
            }
        })
    }
    return existingUser
}