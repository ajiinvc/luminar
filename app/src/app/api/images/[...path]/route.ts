import { NextRequest } from "next/server"
import path from "path"
import fs from "fs/promises"
import { getContentRoot, getAllDays } from "@/lib/content"

let slugToDir: Record<string, string> | null = null

async function getSlugMap(): Promise<Record<string, string>> {
  if (slugToDir) return slugToDir
  const days = await getAllDays()
  slugToDir = Object.fromEntries(days.map((d) => [d.slug, d.path]))
  return slugToDir
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params
  if (segments.length < 2) {
    return new Response("Not found", { status: 404 })
  }

  const [slug, ...imageSegments] = segments
  const imageRelPath = imageSegments.join("/")

  const map = await getSlugMap()
  const dirName = map[slug]
  if (!dirName) {
    return new Response("Not found", { status: 404 })
  }

  const fullPath = path.join(getContentRoot(), dirName, imageRelPath)
  try {
    const buffer = await fs.readFile(fullPath)
    const ext = path.extname(fullPath).toLowerCase()
    const contentType: Record<string, string> = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".svg": "image/svg+xml",
    }
    return new Response(buffer, {
      headers: {
        "Content-Type": contentType[ext] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch {
    return new Response("Not found", { status: 404 })
  }
}
