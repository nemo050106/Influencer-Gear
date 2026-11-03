'use client'

import { useMemo, useState } from 'react'
import { FaBoxOpen } from 'react-icons/fa'
import InputField from '@/ui/InputField'
import Card from '@/ui/Card'
import { Product } from '@/lib/types'
import Button from '@/ui/Button'

const LIMIT = 12

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

export default function ProductsBrowser({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const term = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    if (!term) return products
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    )
  }, [products, term])

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / LIMIT))
  const currentPage = Math.min(page, totalPages)
  const visible = filtered.slice((currentPage - 1) * LIMIT, currentPage * LIMIT)

  const from = total === 0 ? 0 : (currentPage - 1) * LIMIT + 1
  const to = Math.min(currentPage * LIMIT, total)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setPage(1) // a new search starts at page 1
  }

  const goTo = (p: number) => {
    setPage(p)
    document.getElementById('products-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const btn =
    'inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2'
  const normal = `${btn} bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-purple-50 hover:text-purple-700 hover:ring-purple-200`
  const active = `${btn} bg-purple-600 text-white shadow-md ring-1 ring-purple-600`
  const disabled = `${btn} cursor-not-allowed bg-white/70 text-slate-400 ring-1 ring-slate-200`

  return (
    <section id="products-top" className="scroll-mt-24 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Featured{' '}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="mt-1 text-sm text-gray-500" aria-live="polite">
            {total > 0
              ? `Showing ${from}–${to} of ${total} products${term ? ` for “${query.trim()}”` : ''}`
              : term
                ? `No results for “${query.trim()}”`
                : 'No products to show yet'}
          </p>
        </div>

        {totalPages > 1 && (
          <span className="inline-flex w-fit items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-600 ring-1 ring-inset ring-purple-500/10 backdrop-blur-sm">
            Page {currentPage} of {totalPages}
          </span>
        )}
      </div>

      {/* Search */}
      <div className="max-w-md">
        <InputField
          label="Search products"
          type="search"
          name="q"
          placeholder="Search by name or category"
          value={query}
          onChange={handleSearch}
        />
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((product) => (
            <Card product={product} key={product._id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-white/80 py-20 text-center shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-3xl text-purple-300">
            <FaBoxOpen />
          </div>
          <p className="text-base font-semibold text-gray-900">
            {term ? `No products match “${query.trim()}”` : 'No products found'}
          </p>
          <p className="max-w-xs text-sm text-gray-500">
            {term
              ? 'Try a different word or check the spelling.'
              : 'Check back soon, new gear is added regularly.'}
          </p>
          {term && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setPage(1)
              }}
              className="mt-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Pagination" className="pt-2">
          <ul className="flex flex-wrap items-center justify-center gap-2">
            <li>
              <button
                type="button"
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                className={currentPage === 1 ? disabled : normal}
              >
                ← Previous
              </button>
            </li>

            {getPageItems(currentPage, totalPages).map((item, i) =>
              item === '…' ? (
                <li key={`gap-${i}`} aria-hidden="true" className="px-1 text-slate-400">
                  …
                </li>
              ) : (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => goTo(item)}
                    aria-current={item === currentPage ? 'page' : undefined}
                    aria-label={`Page ${item}`}
                    className={item === currentPage ? active : normal}
                  >
                    {item}
                  </button>
                </li>
              )
            )}

            <li>
              <Button
                type="button"
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={currentPage === totalPages ? disabled : normal}
              >
                Next →
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </section>
  )
}