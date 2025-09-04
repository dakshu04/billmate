import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "./db"

export async function syncUser() {
  const user = await currentUser()
  console.log("currentUser:", user)
  if (!user) return null

  let existingUser = await prisma.user.findFirst({
    where: { clerkId: user.id },
  })

  if (!existingUser) {
    existingUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses?.[0]?.emailAddress || `user-${user.id}@example.com`,
        name: user.firstName || "No Name",
      },
    })
  }

  console.log("existingUser:", existingUser)
  return existingUser
}
