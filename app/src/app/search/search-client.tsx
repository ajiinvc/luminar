"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search, ArrowRight } from "lucide-react"
import type { DayMeta } from "@/lib/content"

interface SearchPageClientProps {
  days: DayMeta[]
}

interface FlatEntry {
  slug: string
  title: string
  content: string
}

export function SearchPageClient({ days }: SearchPageClientProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<FlatEntry[]>([])

  const allContent = useMemo(() => {
    return days.map((day) => ({
      slug: day.slug,
      title: day.title,
      content: `${day.title} Day ${day.dayNumber}`,
    }))
  }, [days])

  function handleSearch() {
    if (!query.trim()) return
    const lower = query.toLowerCase()
    const filtered = allContent.filter(
      (entry) =>
        entry.title.toLowerCase().includes(lower) ||
        entry.content.toLowerCase().includes(lower),
    )
    setResults(filtered)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Search</h1>
      <div className="flex gap-2 mb-8">
        <Input
          placeholder="Search days, topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      <div className="space-y-2">
        {results.map((entry) => (
          <Link
            key={entry.slug}
            href={`/day/${entry.slug}`}
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
          >
            <div>
              <div className="font-medium">{entry.title}</div>
              <div className="text-sm text-muted-foreground">{entry.content}</div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </Link>
        ))}
        {query && results.length === 0 && (
          <p className="text-muted-foreground text-sm">No results found.</p>
        )}
      </div>
    </div>
  )
}
