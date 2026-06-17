import { getAllDays } from "@/lib/content"
import { HomePageClient } from "./home-client"

export default async function HomePage() {
  const days = await getAllDays()
  return <HomePageClient days={days} />
}
