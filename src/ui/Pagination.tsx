

import Link from 'next/link'

type Props = {
  currentPage: number
  totalPages: number
  basePath: string 
}

export default function Pagination({ currentPage, totalPages, basePath }: Props) {
  // nothing to paginate
  if (totalPages <= 1) return null

  // [1, 2, 3, ... totalPages]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // one style written once, reused by every button
  const base = 'rounded-lg border px-3 py-1.5 text-sm'
  const normal = `${base} border-gray-200 text-gray-600 hover:bg-gray-50`
  const active = `${base} border-indigo-600 bg-indigo-600 text-white`
  const disabled = `${base} pointer-events-none border-gray-100 text-gray-300`

  const linkTo = (page: number) => `${basePath}?page=${page}`

  return (
    <nav className="mt-6 flex flex-wrap items-center gap-2  mx-auto w-fit">
      <Link
        href={linkTo(currentPage - 1)}
        className={currentPage === 1 ? disabled : normal}
      >
        Previous
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={linkTo(page)}
          className={page === currentPage ? active : normal}
        >
          {page}
        </Link>
      ))}

      <Link
        href={linkTo(currentPage + 1)}
        className={currentPage === totalPages ? disabled : normal}
      >
        Next
      </Link>
    </nav>
  )
}