"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface ApplicationContextType {
  appliedJobs: number[]
  applyForJob: (jobId: number) => void
  hasApplied: (jobId: number) => boolean
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined)

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
  const [appliedJobs, setAppliedJobs] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("appliedJobs")
    if (stored) {
      setAppliedJobs(JSON.parse(stored))
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs))
    }
  }, [appliedJobs, mounted])

  const applyForJob = (jobId: number) => {
    setAppliedJobs((prev) => {
      if (!prev.includes(jobId)) {
        return [...prev, jobId]
      }
      return prev
    })
  }

  const hasApplied = (jobId: number) => {
    return appliedJobs.includes(jobId)
  }

  return (
    <ApplicationContext.Provider value={{ appliedJobs, applyForJob, hasApplied }}>
      {children}
    </ApplicationContext.Provider>
  )
}

export function useApplicationContext() {
  const context = useContext(ApplicationContext)
  if (!context) {
    throw new Error("useApplicationContext must be used within ApplicationProvider")
  }
  return context
}
