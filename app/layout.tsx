import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ApplicationProvider } from "@/context/application-context"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pattem Jobs - AI Job Marketplace",
  description: "Discover your perfect job with AI-powered matching",

}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // TO DO :: proper understading of this part due to hydration error we use suppress the error.
    // suppressHydrationWarning prevents React from reporting attribute mismatches
    // on the root element during hydration (useful when a client-only provider
    // mutates <html> attributes such as theme classes before hydration).
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} bg-background text-foreground`}>
        <ThemeProvider attribute="class">
          <ApplicationProvider>{children}</ApplicationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
