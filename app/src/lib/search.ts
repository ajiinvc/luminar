export interface SearchResult {
  slug: string
  title: string
  line: number
  content: string
}

export function buildSearchIndex(markdown: string, slug: string, title: string): SearchResult[] {
  const results: SearchResult[] = []
  const lines = markdown.split("\n")

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line && !line.startsWith("---") && !line.startsWith("```") && !line.startsWith("<img")) {
      results.push({
        slug,
        title,
        line: i + 1,
        content: line,
      })
    }
  }

  return results
}

export function searchInResults(
  query: string,
  index: SearchResult[],
): SearchResult[] {
  const lower = query.toLowerCase()
  return index.filter(
    (r) =>
      r.content.toLowerCase().includes(lower) ||
      r.title.toLowerCase().includes(lower),
  )
}
