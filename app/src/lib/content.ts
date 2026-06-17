import path from "path"
import fs from "fs/promises"

const CONTENT_ROOT = path.resolve(process.cwd(), "..", "JUNE")

export interface DayMeta {
  slug: string
  title: string
  month: string
  dayNumber: number
  path: string
}

export interface DayContent {
  meta: DayMeta
  markdown: string
}

function slugFromDir(dirName: string): { month: string; dayNumber: number; slug: string } {
  const parts = dirName.split(" ")
  const month = parts[0].toLowerCase()
  const dayNumber = parseInt(parts[1], 10)
  const slug = `${month}-day-${dayNumber}`
  return { month, dayNumber, slug }
}

function extractTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)/m)
  return match ? match[1].trim() : "Untitled"
}

export async function getAllDays(): Promise<DayMeta[]> {
  const entries = await fs.readdir(CONTENT_ROOT, { withFileTypes: true })
  const days: DayMeta[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const readmePath = path.join(CONTENT_ROOT, entry.name, "README.md")
    let content: string
    try {
      content = await fs.readFile(readmePath, "utf-8")
    } catch {
      continue
    }
    const title = extractTitle(content)

    const { month, dayNumber, slug } = slugFromDir(entry.name)
    days.push({ slug, title, month, dayNumber, path: entry.name })
  }

  days.sort((a, b) => a.dayNumber - b.dayNumber)
  return days
}

export async function getDayBySlug(slug: string): Promise<DayContent | null> {
  const days = await getAllDays()
  const day = days.find((d) => d.slug === slug)
  if (!day) return null

  const readmePath = path.join(CONTENT_ROOT, day.path, "README.md")
  const markdown = await fs.readFile(readmePath, "utf-8")

  return { meta: day, markdown }
}

export async function getImage(slug: string, imagePath: string): Promise<Buffer | null> {
  const day = (await getAllDays()).find((d) => d.slug === slug)
  if (!day) return null

  const fullPath = path.join(CONTENT_ROOT, day.path, imagePath)
  try {
    const buffer = await fs.readFile(fullPath)
    return buffer
  } catch {
    return null
  }
}

export function getContentRoot(): string {
  return CONTENT_ROOT
}
