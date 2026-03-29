import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminOverview from "./(admin)/AdminOverview"
import VendorOverview from "./(vendor)/VendorOverview"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const role = (session.user as any).role

  if (role === "ADMIN") {
    return <AdminOverview />
  }

  return <VendorOverview />
}
