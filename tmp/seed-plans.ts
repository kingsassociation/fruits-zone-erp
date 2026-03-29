import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const plans = [
    {
      name: "Starter",
      price: 0,
      interval: "month",
      maxMonthlyOrders: 50,
      analyticsEnabled: false,
      prioritySupport: false,
      description: "Perfect for new local vendors getting started.",
    },
    {
      name: "Pro",
      price: 1500,
      interval: "month",
      maxMonthlyOrders: 200,
      analyticsEnabled: true,
      prioritySupport: true,
      description: "Advanced tools for growing fruit businesses.",
    },
    {
      name: "Enterprise",
      price: 5000,
      interval: "month",
      maxMonthlyOrders: 1000,
      analyticsEnabled: true,
      prioritySupport: true,
      description: "Complete ERP access for large scale operations.",
    },
  ]

  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { id: plan.name.toLowerCase() }, // Using name as ID for simplicity in seed
      update: {},
      create: {
        id: plan.name.toLowerCase(),
        ...plan,
      },
    })
  }

  console.log("Subscription plans seeded successfully.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
