import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { FruitCategory, Role, VendorStatus, OrderStatus } from "@prisma/client"

export async function GET() {
  try {
    // 1. Clean Slate (Order is important to avoid FK violations)
    console.log("Cleaning up database...")
    await prisma.saleItem.deleteMany()
    await prisma.sale.deleteMany()
    await prisma.orderItem.deleteMany()
    await prisma.purchaseOrder.deleteMany()
    await prisma.vendorInventory.deleteMany()
    await prisma.inventory.deleteMany()
    await prisma.offer.deleteMany()
    await prisma.fruit.deleteMany()
    await prisma.vendorExpense.deleteMany()
    await prisma.vendorCustomer.deleteMany()
    await prisma.subscription.deleteMany()
    await prisma.subscriptionPlan.deleteMany()
    await prisma.vendor.deleteMany()
    await prisma.account.deleteMany()
    await prisma.session.deleteMany()
    await prisma.user.deleteMany()

    const hashedPassword = await bcrypt.hash("password123", 12)

    // 2. Create Subscription Plans
    console.log("Seeding subscription plans...")
    const starterPlan = await prisma.subscriptionPlan.create({
      data: {
        name: "Starter",
        price: 999,
        maxMonthlyOrders: 50,
        analyticsEnabled: false,
        description: "Perfect for small local vendors starting out.",
      },
    })

    const proPlan = await prisma.subscriptionPlan.create({
      data: {
        name: "Pro",
        price: 2499,
        maxMonthlyOrders: 200,
        analyticsEnabled: true,
        description: "Scale your business with advanced inventory tracking.",
      },
    })

    const enterprisePlan = await prisma.subscriptionPlan.create({
      data: {
        name: "Enterprise",
        price: 4999,
        maxMonthlyOrders: 1000,
        analyticsEnabled: true,
        prioritySupport: true,
        description: "Full supply chain management for large distributors.",
      },
    })

    // 3. Create Admin User
    console.log("Seeding users...")
    const admin = await prisma.user.create({
      data: {
        email: "admin@fruitszone.com",
        name: "Super Admin",
        password: hashedPassword,
        role: Role.ADMIN,
      },
    })

    // 4. Create Vendor Users
    const vendorUser1 = await prisma.user.create({
      data: {
        email: "vendor@fruitszone.com",
        name: "Rahman Rahim",
        password: hashedPassword,
        role: Role.VENDOR,
      },
    })

    const vendorUser2 = await prisma.user.create({
      data: {
        email: "fresh@fruitszone.com",
        name: "Akram Khan",
        password: hashedPassword,
        role: Role.VENDOR,
      },
    })

    // 5. Create Vendors
    console.log("Seeding vendors...")
    const vendor1 = await prisma.vendor.create({
      data: {
        userId: vendorUser1.id,
        businessName: "Rahman Fruits & Co.",
        phone: "01711223344",
        address: "Zindabazar, Sylhet",
        status: VendorStatus.ACTIVE,
        subscription: {
          create: {
            planId: proPlan.id,
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        },
      },
    })

    const vendor2 = await prisma.vendor.create({
      data: {
        userId: vendorUser2.id,
        businessName: "Fresh Market Hub",
        phone: "01811556677",
        address: "GEC, Chattogram",
        status: VendorStatus.ACTIVE,
        subscription: {
          create: {
            planId: starterPlan.id,
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        },
      },
    })

    // 6. Create Fruits
    console.log("Seeding fruits...")
    const fruitsData = [
      { name: "Green Apple", slug: "green-apple", category: FruitCategory.FRESH_FRUITS, price: 280, unit: "kg" },
      { name: "Red Apple (Gala)", slug: "red-apple-gala", category: FruitCategory.FRESH_FRUITS, price: 320, unit: "kg" },
      { name: "Cavendish Banana", slug: "cavendish-banana", category: FruitCategory.FRESH_FRUITS, price: 120, unit: "box" },
      { name: "Alphonso Mango", slug: "alphonso-mango", category: FruitCategory.FRESH_FRUITS, price: 450, unit: "kg" },
      { name: "California Almonds", slug: "california-almonds", category: FruitCategory.NUTS, price: 850, unit: "kg" },
      { name: "Walnuts (Chile)", slug: "walnuts-chile", category: FruitCategory.NUTS, price: 1200, unit: "kg" },
      { name: "Dried Figs (Anjeer)", slug: "dried-figs", category: FruitCategory.DRY_FRUITS, price: 1400, unit: "kg" },
      { name: "Medjool Dates", slug: "medjool-dates", category: FruitCategory.DRY_FRUITS, price: 2200, unit: "kg" },
      { name: "Mix Nuts Party Pack", slug: "mix-nuts-pack", category: FruitCategory.COMBO, price: 950, unit: "box" },
      { name: "Ramadan Gift Basket", slug: "ramadan-gift", category: FruitCategory.GIFT_PACK, price: 3500, unit: "piece" },
      { name: "Cashew Nuts (W320)", slug: "cashews-w320", category: FruitCategory.NUTS, price: 1100, unit: "kg" },
      { name: "Thai Guava", slug: "thai-guava", category: FruitCategory.FRESH_FRUITS, price: 180, unit: "kg" },
    ]

    const seededFruits = []
    for (const f of fruitsData) {
      const fruit = await prisma.fruit.create({
        data: {
          name: f.name,
          slug: f.slug,
          category: f.category,
          basePrice: f.price,
          unit: f.unit,
          description: `Premium quality ${f.name} sourced directly from the best producers.`,
          isActive: true,
          inventory: {
            create: {
              quantity: Math.floor(Math.random() * 500) + 100,
              lowStockAlert: 20,
            },
          },
        },
      })
      seededFruits.push(fruit)
    }

    // 7. Seed Vendor Customers
    console.log("Seeding vendor customers...")
    const customer1 = await prisma.vendorCustomer.create({
      data: {
        vendorId: vendor1.id,
        name: "Abir Hasan",
        phone: "01999888777",
        totalDue: 450.00,
      },
    })

    const customer2 = await prisma.vendorCustomer.create({
      data: {
        vendorId: vendor1.id,
        name: "Sumi Akter",
        phone: "01666444222",
        totalDue: 0,
      },
    })

    // 8. Seed Vendor Inventory (subset of global fruits)
    console.log("Seeding vendor inventory...")
    for (let i = 0; i < 5; i++) {
      await prisma.vendorInventory.create({
        data: {
          vendorId: vendor1.id,
          fruitId: seededFruits[i].id,
          quantity: Math.floor(Math.random() * 50) + 10,
        },
      })
    }

    // 9. Seed Sales
    console.log("Seeding sales...")
    await prisma.sale.create({
      data: {
        vendorId: vendor1.id,
        customerId: customer1.id,
        totalAmount: 1250.00,
        amountPaid: 800.00,
        paymentStatus: "PARTIAL",
        items: {
          create: [
            { fruitId: seededFruits[0].id, quantity: 2, price: 280 },
            { fruitId: seededFruits[1].id, quantity: 1, price: 320 },
          ],
        },
      },
    })

    // 10. Seed Purchase Orders
    console.log("Seeding purchase orders...")
    await prisma.purchaseOrder.create({
      data: {
        vendorId: vendor1.id,
        totalAmount: 5000.00,
        status: OrderStatus.SHIPPED,
        items: {
          create: [
            { fruitId: seededFruits[4].id, quantity: 5, priceAtTime: 850 },
          ],
        },
      },
    })

    return NextResponse.json({ 
      success: true, 
      message: "Database seeded successfully",
      stats: {
        plans: 3,
        users: 3,
        vendors: 2,
        fruits: seededFruits.length
      }
    })
  } catch (error: any) {
    console.error("Seeding error:", error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}
