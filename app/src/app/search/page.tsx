import { getAllDays } from "@/lib/content"
import { SearchPageClient } from "./search-client"

export const dynamic = "force-static"

export default async function SearchPage() {
  const days = await getAllDays()
  return <SearchPageClient days={days} />
}
