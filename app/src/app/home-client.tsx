"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, TrendingUp, Calendar, ArrowRight } from "lucide-react"
import { useProgress } from "@/components/progress-tracker"
import type { DayMeta } from "@/lib/content"

interface HomePageClientProps {
  days: DayMeta[]
}

export function HomePageClient({ days }: HomePageClientProps) {
  const { progress } = useProgress("")
  const completed = Object.values(progress).filter(Boolean).length
  const pct = days.length > 0 ? Math.round((completed / days.length) * 100) : 0

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">MERN(A) Full Stack Development</h1>
        <p className="text-muted-foreground">
          Daily learnings from Luminar Technolab
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{days.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pct}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold capitalize">{days[0]?.month ?? "—"}</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">All Days</h2>
        <div className="space-y-2">
          {days.map((day) => (
            <Link key={day.slug} href={`/day/${day.slug}`}>
              <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="w-10 justify-center">
                      D{day.dayNumber}
                    </Badge>
                    <div>
                      <div className="font-medium">{day.title}</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {day.month}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
