import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"

function fixImageSrc(src: string | Blob | undefined, slug: string): string | undefined {
  if (typeof src !== "string" || !src) return undefined
  if (src.startsWith("http") || src.startsWith("/")) return src
  return `/api/images/${slug}/${src}`
}

interface MarkdownViewerProps {
  content: string
  slug: string
}

export function MarkdownViewer({ content, slug }: MarkdownViewerProps) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          img: ({ src, alt }) => (
            <img
              src={fixImageSrc(src, slug)}
              alt={alt ?? ""}
              className="rounded-lg border max-w-full h-auto"
              loading="lazy"
            />
          ),
          a: ({ href, children }) => {
            const fixed = href?.startsWith("./") ? href.slice(1) : href
            return (
              <a
                href={fixed}
                target={fixed?.startsWith("http") ? "_blank" : undefined}
                rel={fixed?.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            )
          },
        }}
      />
    </div>
  )
}
