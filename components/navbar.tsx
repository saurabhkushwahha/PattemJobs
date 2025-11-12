"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useApplicationContext } from "@/context/application-context"
import Link from "next/link"

export function Navbar({ userEmail }: { userEmail: string }) {
  const router = useRouter()
  const { appliedJobs } = useApplicationContext()
  const [isLoading, setIsLoading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const handleLogout = async () => {
    setIsLoading(true)
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <nav className="bg-backgroun border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="text-2xl font-bold text-primary hover:text-primary-dark">
            Pattem Jobs
          </Link>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary-light rounded-lg">
              <span className="text-sm font-medium">Applied:</span>
              <span className="text-lg font-bold text-secondary">{appliedJobs.length}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Logged in as</p>
                <p className="text-sm font-medium">{userEmail}</p>
              </div>
              <button onClick={handleLogout} disabled={isLoading} className="btn-outline disabled:opacity-50">
                {isLoading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
