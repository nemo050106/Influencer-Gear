import Link from 'next/link'
import { FaBoxOpen } from 'react-icons/fa'

export default function ProductNotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-5 rounded-3xl bg-white/90 p-8 text-center shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-3xl text-purple-300">
          <FaBoxOpen />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold text-gray-900">Product not found</h1>
          <p className="text-sm text-gray-500">
            This product may have been removed or the link is incorrect.
          </p>
        </div>

        <Link
          href="/"
          className="inline-block rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-purple-500 hover:shadow-md"
        >
          Browse products
        </Link>
      </div>
    </div>
  )
}