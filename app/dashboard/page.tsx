"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { jobs } from "@/data/jobs"
import { useApplicationContext } from "@/context/application-context"

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const { appliedJobs } = useApplicationContext()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user?.email) {
        setUserEmail(user.email)
      }
      setLoading(false)
    }
    getUser()
  }, [supabase.auth])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading jobs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar userEmail={userEmail} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Discover Your Perfect Job</h1>
          <p className="text-xl text-muted-foreground">AI-matched opportunities based on your profile</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => {
            const isApplied = appliedJobs.includes(job.id)
            return (
              <Link key={job.id} href={`/dashboard/jobs/${job.id}`}>
                <div className="card h-full cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-foreground mb-1">{job.title}</h2>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent-light">
                      <span className="text-lg font-bold text-accent">{job.ai_match_score}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span>📍 {job.location}</span>
                  </div>

                  <p className="text-sm text-foreground line-clamp-3 mb-4">{job.description}</p>

                  {isApplied && (
                    <div className="inline-block px-3 py-1 bg-secondary-light text-secondary text-xs font-medium rounded-full">
                      ✓ Applied
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
