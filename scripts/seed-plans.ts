import { PrismaClient, FruitCategory } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // 1. Seed Subscription Plans with Fixed IDs
  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 0,
      interval: "month",
      maxMonthlyOrders: 50,
      analyticsEnabled: false,
      prioritySupport: false,
      description: "Basic shop tools & 50 orders/mo. Perfect for new local vendors.",
      isActive: true,
    },
    {
      id: "pro",
      name: "Pro",
      price: 1500,
      interval: "month",
      maxMonthlyOrders: 200,
      analyticsEnabled: true,
      prioritySupport: true,
      description: "Advanced analytics & 200 orders/mo. For growing fruit businesses.",
      isActive: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 5000,
      interval: "month",
      maxMonthlyOrders: 1000,
      analyticsEnabled: true,
      prioritySupport: true,
      description: "Full ERP suite & unlimited scanning. For large scale operations.",
      isActive: true,
    },
  ]

  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { id: plan.id },
      update: plan,
      create: plan,
    })
  }
  console.log("✅ Subscription plans seeded.")

  // 2. Seed some Initial Fruits (Optional but helpful)
  const fruits = [
    { name: "Alphonso Mango", category: "MANGO" as FruitCategory, basePrice: 180, unit: "KG", description: "Premium quality mangoes from Rajshahi." },
    { name: "Thai Guava", category: "GUAVA" as FruitCategory, basePrice: 60, unit: "KG", description: "Crunchy and sweet, direct from orchard." },
    { name: "Green Apple", category: "APPLE" as FruitCategory, basePrice: 220, unit: "KG", description: "Crispy and sour, imported fresh." },
    { name: "Himsagar Mango", category: "MANGO" as FruitCategory, basePrice: 150, unit: "KG", description: "The king of mangoes, sweet and fiberless." },
  ]

  for (const fruit of fruits) {
    const slug = fruit.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
    
    await prisma.fruit.upsert({
      where: { slug }, // Use slug as unique identifier
      update: {
        ...fruit,
        category: fruit.category
      },
      create: {
        ...fruit,
        slug,
        category: fruit.category
      },
    })
  }
  console.log("✅ Initial fruit inventory seeded.")

  console.log("🏁 Database seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
