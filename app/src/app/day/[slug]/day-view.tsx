"use client"

import { ProgressCheckbox } from "@/components/progress-tracker"
import { MarkdownViewer } from "@/components/markdown-viewer"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import type { DayContent } from "@/lib/content"

interface DayViewProps {
  day: DayContent
}

export function DayView({ day }: DayViewProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {day.meta.month} {day.meta.dayNumber}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold">{day.meta.title}</h1>
        </div>
        <ProgressCheckbox slug={day.meta.slug} label="Mark as completed" />
      </div>

      <Separator className="my-6" />

      <MarkdownViewer content={day.markdown} slug={day.meta.slug} />
    </div>
  )
}
