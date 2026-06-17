"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Search, CheckSquare } from "lucide-react"
import type { DayMeta } from "@/lib/content"

interface SidebarProps {
  days: DayMeta[]
  progress: Record<string, boolean>
}

export function Sidebar({ days, progress }: SidebarProps) {
  const pathname = usePathname()

  const completedCount = Object.values(progress).filter(Boolean).length

  return (
    <aside className="w-64 border-r bg-sidebar flex flex-col h-screen sticky top-0">
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <BookOpen className="h-5 w-5" />
          Luminar
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        <Link
          href="/search"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
            pathname === "/search"
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent/50",
          )}
        >
          <Search className="h-4 w-4" />
          Search
        </Link>

        <div className="pt-2 pb-1 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Days
        </div>

        {days.map((day) => {
          const isActive = pathname === `/day/${day.slug}`
          return (
            <Link
              key={day.slug}
              href={`/day/${day.slug}`}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50",
              )}
            >
              <span className="text-xs text-muted-foreground w-6 shrink-0">
                D{day.dayNumber}
              </span>
              <span className="truncate flex-1">{day.title}</span>
              {progress[day.slug] && (
                <CheckSquare className="h-3.5 w-3.5 text-green-500 shrink-0" />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t text-xs text-muted-foreground">
        {completedCount} / {days.length} completed
      </div>
    </aside>
  )
}
