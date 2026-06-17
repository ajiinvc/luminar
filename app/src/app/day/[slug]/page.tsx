import { notFound } from "next/navigation"
import { getAllDays, getDayBySlug } from "@/lib/content"
import { DayView } from "./day-view"

export const dynamic = "force-static"

export async function generateStaticParams() {
  const days = await getAllDays()
  return days.map((day) => ({ slug: day.slug }))
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const day = await getDayBySlug(slug)
  if (!day) notFound()

  return <DayView day={day} />
}
