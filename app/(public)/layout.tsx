import { auth } from "@/auth"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar session={session} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
