"use client"

import { Sidebar } from "@/components/sidebar"
import { useProgress } from "@/components/progress-tracker"
import type { DayMeta } from "@/lib/content"
import type { ReactNode } from "react"

interface LayoutClientProps {
  children: ReactNode
  days: DayMeta[]
}

export function LayoutClient({ children, days }: LayoutClientProps) {
  const { progress } = useProgress("")

  return (
    <>
      <Sidebar days={days} progress={progress} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </>
  )
}
