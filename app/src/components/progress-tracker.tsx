"use client"

import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

const STORAGE_KEY = "luminar-progress"

export function useProgress(slug: string) {
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setProgress(JSON.parse(stored))
    } catch {}
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    }
  }, [progress, mounted])

  const toggle = (key: string) => {
    setProgress((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const isCompleted = slug ? !!progress[slug] : false

  return { progress, toggle, isCompleted, setProgress }
}

export function ProgressCheckbox({
  slug,
  label,
}: {
  slug: string
  label: string
}) {
  const { isCompleted, toggle } = useProgress(slug)

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={`progress-${slug}`}
        checked={isCompleted}
        onCheckedChange={() => toggle(slug)}
      />
      <label
        htmlFor={`progress-${slug}`}
        className="text-sm cursor-pointer select-none"
      >
        {label}
      </label>
    </div>
  )
}
