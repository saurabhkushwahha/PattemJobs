"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { jobs } from "@/data/jobs"
import { useApplicationContext } from "@/context/application-context"
import { createBrowserClient } from "@supabase/ssr"
import { useEffect } from "react"

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = Number.parseInt(params.id as string)
  const job = jobs.find((j) => j.id === jobId)
  const { appliedJobs, applyForJob } = useApplicationContext()
  const [userEmail, setUserEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [isApplying, setIsApplying] = useState(false)

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
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar userEmail={userEmail} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Job not found</h1>
            <Link href="/dashboard" className="btn-primary">
              Back to Jobs
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const isApplied = appliedJobs.includes(jobId)

  const handleApply = async () => {
    setIsApplying(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    applyForJob(jobId)
    setIsApplying(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar userEmail={userEmail} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-8">
          ← Back to Jobs
        </Link>

        <div className="card mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{job.title}</h1>
              <p className="text-xl text-muted-foreground">{job.company}</p>
            </div>
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent-light">
              <span className="text-2xl font-bold text-accent">{job.ai_match_score}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-lg text-muted-foreground mb-8">
            <span>📍 {job.location}</span>
          </div>

          <div className="prose prose-sm max-w-none mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">About this job</h2>
            <p className="text-lg text-foreground leading-relaxed whitespace-pre-wrap">{job.description}</p>
          </div>

          <div className="border-t border-border pt-8 flex gap-4">
            {isApplied ? (
              <button disabled className="btn-secondary opacity-50 cursor-not-allowed flex-1">
                ✓ Already Applied
              </button>
            ) : (
              <button onClick={handleApply} disabled={isApplying} className="btn-secondary flex-1 disabled:opacity-50">
                {isApplying ? "Applying..." : "Apply Now"}
              </button>
            )}
            <button onClick={() => router.back()} className="btn-outline flex-1">
              Go Back
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
