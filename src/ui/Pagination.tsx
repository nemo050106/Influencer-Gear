import Link from 'next/link'

type Props = {
  currentPage: number
  totalPages: number
  basePath: string
}

// Builds e.g. [1, '…', 4, 5, 6, '…', 17]
function getPageItems(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const items: (number | '…')[] = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  if (start > 2) items.push('…')
  for (let p = start; p <= end; p++) items.push(p)
  if (end < total - 1) items.push('…')

  items.push(total)
  return items
}

export default function Pagination({ currentPage, totalPages, basePath }: Props) {
  if (totalPages <= 1) return null

  const base =
    'inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2'
  const normal = `${base} bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-purple-50 hover:text-purple-700 hover:ring-purple-200`
  const active = `${base} bg-purple-600 text-white shadow-md ring-1 ring-purple-600`
  const disabled = `${base} cursor-not-allowed bg-white/70 text-slate-400 ring-1 ring-slate-200`

  const linkTo = (page: number) => `${basePath}?page=${page}`
  const items = getPageItems(currentPage, totalPages)

  return (
    <nav aria-label="Pagination" className="mx-auto w-fit max-w-full">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {/* Previous */}
        <li>
          {currentPage === 1 ? (
            <span aria-disabled="true" className={disabled}>
              ← Previous
            </span>
          ) : (
            <Link href={linkTo(currentPage - 1)} className={normal}>
              ← Previous
            </Link>
          )}
        </li>

        {/* Page numbers */}
        {items.map((item, i) =>
          item === '…' ? (
            <li key={`gap-${i}`} aria-hidden="true" className="px-1 text-slate-400">
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                href={linkTo(item)}
                aria-current={item === currentPage ? 'page' : undefined}
                aria-label={`Page ${item}`}
                className={item === currentPage ? active : normal}
              >
                {item}
              </Link>
            </li>
          )
        )}

        {/* Next */}
        <li>
          {currentPage === totalPages ? (
            <span aria-disabled="true" className={disabled}>
              Next →
            </span>
          ) : (
            <Link href={linkTo(currentPage + 1)} className={normal}>
              Next →
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}