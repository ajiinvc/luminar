import { notFound } from "next/navigation"
import { getDayBySlug } from "@/lib/content"
import { DayView } from "./day-view"

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
